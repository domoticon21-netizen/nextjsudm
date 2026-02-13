import React from "react";
import List from "./components/list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  /* ---------------------------------------
     🔥 precisa dar await
  --------------------------------------- */
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  return (
    <section className="p-6">
      <div className="text-2xl font-bold text-gray-800 mb-4">Todas bandas</div>

      <List page={page} />
    </section>
  );
}

// import React from "react";
// import List from "./components/list";

// export default function page() {
//   return (
//     <>
//     <div className="text-2xl font-bold text-gray-800">todas bandas</div>
//     <List></List>
//     </>

//   )
// }
