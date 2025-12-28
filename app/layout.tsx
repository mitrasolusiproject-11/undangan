import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Changing font for a more premium look
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Daftar Undangan Wedding TASYA",
  description: "Sistem manajemen daftar tamu undangan pernikahan TASYA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900`}
      >
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-30"></div>
        {children}
      </body>
    </html>
  );
}
