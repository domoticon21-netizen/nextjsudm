import React from "react";
import Button from "../../components/Button";
import { Band } from "../../../../../generated/prisma/client";

interface TableRowProps {
  name: string;
  status: string;
}

const TableRow = ({ name, status }: TableRowProps) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{name}</td>

      <td>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800">
          {status}
        </span>
      </td>

      <td className="inline-flex w-3 p-2 space-x-4 font-sm whitespace-nowrap">
        <Button>excluir</Button>
        <Button>editar</Button>
      </td>
    </tr>
  );
};

export default async function List() {
  const res = await fetch("http://localhost:3000/api/bands", {
    cache: "no-store", // evita cache no Next 16
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar bandas");
  }

  const bandas: Band[] = await res.json();

  return (
    <section className="overflow-x-auto p-4">
      <header className="flex justify-end mb-4">
        <Button>Adicionar</Button>
      </header>

      <table className="min-w-full border border-gray-200 text-left rounded-sm overflow-hidden">
        {/* HEADER */}
        <thead className="bg-gray-800 text-gray-50 uppercase text-sm">
          <tr>
            <th scope="col" className="px-3 py-2">
              Banda
            </th>
            <th scope="col">Status</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-800">
          {Array.isArray(bandas) && bandas.length > 0 ? (
            bandas.map((b) => (
              <TableRow key={b.id} name={b.name} status={b.status} />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                Nenhuma banda encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
