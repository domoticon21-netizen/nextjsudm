import React from "react";

// interface params {
//   params: {
//     id: string;
//   };
// }

// export default async function page({ params }: params) {
//   let p = await params;
//   return <div>id faixa {p.id}</div>;
// }

interface props {
  params: {
    id: string;
  };
  searchParams: {
    mode: string;
    showTitle: string;
  };
}

export default async function page({ searchParams, params }: props) {
  let p = await searchParams;
  let p2 = await params;
  return (
    <div>
      id faixa mode: {p.mode} - mostraTitulo: {p.showTitle} - id: {p2.id}
    </div>
  );
}
