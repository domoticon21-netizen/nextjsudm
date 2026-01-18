import React, { ReactNode } from "react";
import Header from "./components/Header";

interface props {
  children: ReactNode;
}

export default function layout({ children }: props) {
  return(
  <div>
    <Header />    
    {children}
  </div>
  )
}
