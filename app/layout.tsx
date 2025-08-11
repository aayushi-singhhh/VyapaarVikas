import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../VyapaarVikas/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VyapaarVikas MSME Dashboard',
  description: 'A comprehensive dashboard for MSME business management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
