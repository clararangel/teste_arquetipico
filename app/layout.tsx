import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teste dos Arquétipos | Clara Rangel",
  description:
    "Descubra seu arquétipo dominante, secundário e terciário em um diagnóstico estratégico de marca desenvolvido por Clara Rangel."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
