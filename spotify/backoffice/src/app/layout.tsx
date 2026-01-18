import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="text-blue-900" suppressHydrationWarning>        
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
