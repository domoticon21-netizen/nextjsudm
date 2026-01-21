// components/Header.tsx
import { headers } from "next/headers";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Bandas", href: "/bands" },
    { name: "Faixas", href: "/tracks" },
  ].map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  return <HeaderClient navigation={navigation} />;
}