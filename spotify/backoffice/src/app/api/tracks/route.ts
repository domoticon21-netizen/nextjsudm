import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma'

// GET
export async function GET() {
  const dados = await prisma.track.findMany();  
  return NextResponse.json(dados);
}

// POST
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    method: "POST",
    msg: "Criado com sucesso",
    data: body,
  });
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