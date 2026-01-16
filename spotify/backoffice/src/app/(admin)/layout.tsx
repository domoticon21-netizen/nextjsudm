import React, { ReactNode } from "react";
import Header from "./components/Header";

interface props {
  children: ReactNode;
}

export default function layout({ children }: props) {
  return(
  <div className="border-4 border-blue-500 mt-2">
    <Header />
    {children}
  </div>
  )
}
