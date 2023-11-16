import type { Metadata } from 'next'
import { Aleo } from 'next/font/google'
import './globals.css'

const aleo = Aleo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ChattyAppy | Stay Connected with Friends",
  description: "Utilizing typescript, next.js, and socket.io",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='chat-logo.png' type='image/icon'/>
      </head>
      
      <body className={aleo.className}>{children}</body>
    </html>
  )
}
