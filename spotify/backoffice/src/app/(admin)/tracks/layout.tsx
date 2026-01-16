import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function layout({ children }: props) {
  return <div className="border-4 border-blue-500 mt-2">{children}</div>;
}
