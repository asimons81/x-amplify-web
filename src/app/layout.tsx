import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/ui/Background";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OZZY OS | Command Center",
  description: "Unified Digital Intelligence Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${inter.variable} ${mono.variable} font-sans antialiased bg-zinc-950 text-zinc-100 overflow-x-hidden`}>
        <Background />
        
        <Sidebar />
        
        <div className="flex flex-col min-h-screen transition-all duration-300 ease-in-out pl-[80px]">
          <Header />
          <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
