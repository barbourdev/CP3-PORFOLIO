import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Portfólio - GitHub",
  description: "Site para servir como portfólio, mostrando todos projetos existentes no GitHub"
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-br">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
    </html>
  );
}
