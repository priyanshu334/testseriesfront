import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A clean and modern Next.js app with beautiful fonts and layout.",
  authors: [{ name: "Priyanshu", url: "https://your-portfolio.com" }],
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1.0",
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="">
    
      {children}
      
      </body>
    </html>
  );
}
