import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Santa Call',
  description: 'Configura una llamada de Santa Claus para tus hijos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

