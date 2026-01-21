import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function layout({ children }: props) {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">{children}</div>
  );
}
