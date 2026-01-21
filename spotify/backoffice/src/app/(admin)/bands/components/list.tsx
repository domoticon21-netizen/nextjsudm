import React from "react";
import Button from "../../components/Button";

interface props {
  name: string;
  status: string;
}

const TableRow = ({ name, status }: props) => {
  return (
    <>
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
    </>
  );
};

export default function list() {
  return (
    <section className="overflow-x-auto p-4">
      <header className="flex justify-end mb-4">
        <Button>Adicionar</Button>
      </header>
      <table className="min-w-full border border-gray-200 text-left rounded-sm overflow-hidden">
        <thead className="bg-gray-800 text-gray-50 uppercase text-sm">
          <tr>
            <th scope="col" className="px-3 py-2">
              Banda
            </th>
            <th scope="col">status</th>
            <th scope="col">ação</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          <TableRow name="teste" status="ativo"></TableRow>
        </tbody>
      </table>
    </section>
  );
}
