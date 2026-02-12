import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import * as z from "zod";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

//import { da } from "zod/v4/locales";
//import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { bandSchemma } from "@/app/schemas/band.schema";

GET;

export async function GET() {
  const dados = await prisma.band.findMany();
  return NextResponse.json(dados);
}

// export async function POST(request: Request) {
//   try {
//     // ===== PARSE JSON =====
//     let data: unknown;

//     try {
//       data = await request.json();
//     } catch {
//       return NextResponse.json(
//         { erro: "JSON inválido ou mal formatado" },
//         { status: 400 },
//       );
//     }

//     // ===== BLOQUEAR VAZIO =====
//     if (
//       data === null ||
//       data === undefined ||
//       (typeof data === "object" &&
//         !Array.isArray(data) &&
//         Object.keys(data).length === 0)
//     ) {
//       return NextResponse.json({ erro: "Dados em branco" }, { status: 400 });
//     }

//     // ===== ARRAY =====
//     if (Array.isArray(data)) {
//       const parsed = bandArray.safeParse(data);

//       if (!parsed.success) {
//         return NextResponse.json(
//           {
//             erro: "Erro de validação",
//             detalhes: parsed.error.format(),
//           },
//           { status: 400 },
//         );
//       }

//       return NextResponse.json({
//         msg: "array válido",
//         data: parsed.data,
//       });
//     }

//     // ===== OBJETO =====
//     if (typeof data === "object") {
//       const parsed = bandSchemma.safeParse(data);

//       if (!parsed.success) {
//         return NextResponse.json(
//           {
//             erro: "Erro de validação",
//             detalhes: parsed.error.format(),
//           },
//           { status: 400 },
//         );
//       }

//       return NextResponse.json({
//         msg: "objeto válido",
//         data: parsed.data,
//       });
//     }

//     // ===== FORMATO INVÁLIDO =====
//     return NextResponse.json({ erro: "Formato inválido" }, { status: 400 });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { erro: "Erro interno do servidor" },
//       { status: 500 },
//     );
//   }
// }

//x-www-form-urlencoded
// export async function POST(request: Request) {
//   try {
//     // body → urlencoded
//     const params = new URLSearchParams(await request.text());

//     const data = {
//       name: params.get("name"),
//       slug: params.get("slug"),
//       description: params.get("description"),
//       status: params.get("status"),
//     };

//     // validação sem throw
//     const parsed = bandSchemma.safeParse(data);

//     if (!parsed.success) {
//       return NextResponse.json(
//         {
//           msg: "Erro de validação",
//           errors: parsed.error.format(),
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       data: parsed.data,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { msg: "Erro interno" },
//       { status: 500 }
//     );
//   }
// }

// POST formdata

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    if (!data || data.entries().next().done) {
      return NextResponse.json(
        { erro: "FormData vazio" },
        { status: 400 }
      );
    }

    // ===== arquivo =====
    const file = data.get("cover");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { erro: "Arquivo inválido ou não enviado" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { erro: "Somente imagens permitidas" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { erro: "Máx 5MB" },
        { status: 400 }
      );
    }

    // ===== texto =====
    const body = {
      name: String(data.get("name") ?? ""),
      slug: String(data.get("slug") ?? ""),
      description: data.get("description")
        ? String(data.get("description"))
        : undefined,
      status: String(data.get("status") ?? ""),
    };

    const validated = bandSchemma.parse(body);

    // ===== salvar arquivo =====
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(
      process.cwd(),
      "public/upload"
    );

    await mkdir(uploadDir, { recursive: true });

    // nome único
    const fileName = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, "_")}`;

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const coverPath = `upload/${fileName}`;

    // ===== salvar no banco =====
    const band = await prisma.band.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        status: validated.status as any,
        cover: coverPath,
      },
    });

    return NextResponse.json({
      msg: "Banda criada",
      band,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          erro: "Erro de validação",
          detalhes: error.flatten(),
        },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { erro: "Erro interno" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    method: "PUT",
    msg: "Atualização completa",
    data: body,
  });
}

// PATCH
export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    method: "PATCH",
    msg: "Atualização parcial",
    data: body,
  });
}

// DELETE
export function DELETE() {
  return NextResponse.json({
    method: "DELETE",
    msg: "Removido com sucesso",
  });
}

// OPTIONS (útil para CORS)
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
  });
}
