import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "AutoHunt — AI Job Agent",
  description: "Autonomous AI-powered job hunting agent",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-[#080810] text-white antialiased font-mono">
        {children}
      </body>
    </html>
  )
}