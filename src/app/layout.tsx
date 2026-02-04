import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "X-Amplify | The Stijn Method",
  description: "Transform any idea into 10 viral X posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <Background />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
