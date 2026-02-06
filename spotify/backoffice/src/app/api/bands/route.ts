import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma'
import * as z from "zod";
//import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
//import path from "path";
//import { mkdir, writeFile } from "fs/promises";

 const bandSchemma = z.object({ 
   name: z.string().min(1),
   slug: z.string().min(1),
   description: z.string().optional(),
   status: z.enum(["active", "inactive"])
  });

// GET
export async function GET() {
  const dados = await prisma.band.findMany();  
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const bodyText = await request.text();
  const params = new URLSearchParams(bodyText)
  const name = params.get("name");
  const slug = params.get("slug");
  const description = params.get("description");
  const status = params.get("status"); 

  const validate = bandSchemma.parse({
    
  });

  return NextResponse.json(
    {
      name: name,
      slug: slug,
      description: description,
      status: status
    })
}


// POST formdata
/*
export async function POST(request: Request) {
  const data = await request.formData();  

  const file = data.get("cover");

   if (!(file instanceof File)) {
     return NextResponse.json(
       { erro: "não é uma imagem" },
       { status: 400 }
     );
   }
  
   const arbufer = await file.arrayBuffer()
   const bufer = Buffer.from(arbufer);

   const upload_dir = path.join(process.cwd(), "public", "upload");
   await mkdir(upload_dir, { recursive:true });

   const filePath = path.join(upload_dir, file.name);
   await writeFile(filePath, bufer);


  return NextResponse.json({
    received: `upload/${file.name}` ,
  });
}
*/
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