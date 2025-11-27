import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversor de Números - Análisis Léxico y Sintáctico",
  description: "Aplicación para convertir números entre diferentes bases con análisis léxico y sintáctico completo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {children}
      </body>
    </html>
  );
}