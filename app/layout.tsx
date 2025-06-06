import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Hola, Tecnología News - Tecnología Explicada de Forma Simple",
  description:
    "Noticias de tecnología, IA, smartphones y gadgets explicadas sin tecnicismos. Para personas que quieren entender la tecnología de forma fácil y clara.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
