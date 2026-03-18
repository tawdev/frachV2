import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";

export const metadata: Metadata = {
  title: "FrachDark | Mobilier de Luxe & Sur Mesure",
  description: "Découvrez notre collection exclusive de meubles modernes et sur mesure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
