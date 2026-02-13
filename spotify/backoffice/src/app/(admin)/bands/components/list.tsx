import React from "react";
import Link from "next/link";
import Button from "../../components/Button";
import { Band } from "../../../../../generated/prisma/client";

interface TableRowProps {
  name: string;
  status: string;
}

interface bandList {
  data: Band[];
  pagination: {
    currentPage: number;
    bandTotal: number;
    pageTotal: number;
    take: number;
  };
}

const TableRow = ({ name, status }: TableRowProps) => {
  return (
    <tr>
      {/* NOME */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{name}</td>

      {/* STATUS */}
      <td>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800">
          {status}
        </span>
      </td>

      {/* AÇÕES */}
      <td className="px-3 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          <Button>excluir</Button>
          <Button>editar</Button>
        </div>
      </td>
    </tr>
  );
};

export default async function List({ page }: { page: number }) {
  /* --------------------------------------------------
     URL absoluta necessária no Server Component
  -------------------------------------------------- */
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/bands?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar bandas");
  }

  const bandas: bandList = await res.json();

  const { currentPage, pageTotal } = bandas.pagination;

  /* --------------------------------------------------
     Proteções de página
  -------------------------------------------------- */
  const prevPage = currentPage <= 1 ? 1 : currentPage - 1;

  const nextPage = currentPage >= pageTotal ? pageTotal : currentPage + 1;

  return (
    <section className="overflow-x-auto p-4">
      {/* HEADER */}
      <header className="flex justify-end mb-4">
        <Button>Adicionar</Button>
      </header>

      {/* TABELA */}
      <table className="min-w-full border border-gray-200 text-left rounded-sm overflow-hidden">
        <thead className="bg-gray-800 text-gray-50 uppercase text-sm">
          <tr>
            <th className="px-3 py-2">Banda</th>
            <th>Status</th>
            <th className="px-3 py-2 text-end"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {bandas.data.length > 0 ? (
            bandas.data.map((b) => (
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

      {/* PAGINAÇÃO */}
      <div className="flex justify-center mt-4 gap-2">
        {/* VOLTAR */}
        <Link
          href={`?page=${prevPage}`}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
        >
          <Button>{"<"}</Button>
        </Link>

        {/* NÚMEROS */}
        {Array.from({ length: pageTotal }).map((_, i) => {
          const p = i + 1;

          return (
            <Link key={p} href={`?page=${p}`}>
              <Button
                className={p === currentPage ? "bg-blue-600 text-white" : ""}
              >
                {p}
              </Button>
            </Link>
          );
        })}

        {/* AVANÇAR */}
        <Link
          href={`?page=${nextPage}`}
          className={
            currentPage >= pageTotal ? "pointer-events-none opacity-50" : ""
          }
        >
          <Button>{">"}</Button>
        </Link>
      </div>
    </section>
  );
}

// import React from "react";
// import Link from "next/link";
// import Button from "../../components/Button";
// import { Band } from "../../../../../generated/prisma/client";

// interface TableRowProps {
//   name: string;
//   status: string;
// }

// interface bandList {
//   data: Band[];
//   pagination: {
//     currentPage: number;
//     bandTotal: number;
//     pageTotal: number;
//     take: number;
//   };
// }

// const TableRow = ({ name, status }: TableRowProps) => {
//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap text-gray-800">{name}</td>

//       <td>
//         <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800">
//           {status}
//         </span>
//       </td>

//       <td className="px-3 py-4 whitespace-nowrap text-right">
//         <div className="flex items-center justify-end gap-2">
//           <Button>excluir</Button>
//           <Button>editar</Button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default async function List({searchParams} : {searchParams: { page?: string }}) {
//   const page = Number(searchParams.page ?? 1);
//   const res = await fetch("http://localhost:3000/api/bands", {
//     cache: "no-store", // evita cache no Next 16
//   });

//   if (!res.ok) {
//     throw new Error("Erro ao buscar bandas");
//   }

//   const bandas: bandList = await res.json();

//   return (
//     <section className="overflow-x-auto p-4">
//       <header className="flex justify-end mb-4">
//         <Button>Adicionar</Button>
//       </header>

//       <table className="min-w-full border border-gray-200 text-left rounded-sm overflow-hidden">
//         {/* HEADER */}
//         <thead className="bg-gray-800 text-gray-50 uppercase text-sm">
//           <tr>
//             <th scope="col" className="px-3 py-2">
//               Banda
//             </th>
//             <th scope="col">Status</th>
//             <th scope="col" className="px-3 py-2 text-end"></th>
//           </tr>
//         </thead>

//         {/* BODY */}
//         <tbody className="divide-y divide-gray-800">
//           {Array.isArray(bandas.data) && bandas.data.length > 0 ? (
//             bandas.data.map((b) => (
//               <TableRow key={b.id} name={b.name} status={b.status} />
//             ))
//           ) : (
//             <tr>
//               <td colSpan={3} className="p-4 text-center">
//                 Nenhuma banda encontrada
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="flex justify-center mt-4 gap-2">
//         {/* VOLTAR */}
//         <Link
//           href={`?page=${bandas.pagination.currentPage - 1}`}
//           className={
//             bandas.pagination.currentPage === 1
//               ? "pointer-events-none opacity-50"
//               : ""
//           }
//         >
//           <Button>Voltar</Button>
//         </Link>

//         {/* NÚMEROS */}
//         {Array.from(
//           { length: bandas.pagination.pageTotal },
//           (_, i) => i + 1,
//         ).map((p) => (
//           <Link key={p} href={`?page=${p}`}>
//             <Button
//               className={
//                 p === bandas.pagination.currentPage
//                   ? "bg-blue-600 text-white"
//                   : ""
//               }
//             >
//               {p}
//             </Button>
//           </Link>
//         ))}

//         {/* AVANÇAR */}
//         <Link
//           href={`?page=${bandas.pagination.currentPage + 1}`}
//           className={
//             bandas.pagination.currentPage === bandas.pagination.pageTotal
//               ? "pointer-events-none opacity-50"
//               : ""
//           }
//         >
//           <Button>Avançar</Button>
//         </Link>
//       </div>
//     </section>
//   );
// }
