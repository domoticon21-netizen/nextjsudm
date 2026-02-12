import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { bandSchemma } from "@/app/schemas/band.schema";

export async function POST(request: Request) {
  try {
    // ===== PARSE JSON =====
    let data: unknown;

    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { erro: "JSON inválido ou mal formatado" },
        { status: 400 },
      );
    }

    // ===== BLOQUEAR VAZIO =====
    if (
      data === null ||
      data === undefined ||
      (typeof data === "object" &&
        !Array.isArray(data) &&
        Object.keys(data).length === 0)
    ) {
      return NextResponse.json({ erro: "Dados em branco" }, { status: 400 });
    }

    // ===== OBJETO =====
    if (typeof data === "object") {
      const parsed = bandSchemma.safeParse(data);

      if (!parsed.success) {
        return NextResponse.json(
          {
            erro: "Erro de validação",
            detalhes: parsed.error.format(),
          },
          { status: 400 },
        );
      }

      return NextResponse.json({
        msg: "objeto válido",
        data: parsed.data,
      });
    }

    // ===== FORMATO INVÁLIDO =====
    return NextResponse.json({ erro: "Formato inválido" }, { status: 400 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
