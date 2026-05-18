import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Seminar",
  description: "A dark, modern landing page for the Project Seminar experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} h-full antialiased bg-[#0f0f0f]`}>
      <body className="min-h-full flex flex-col bg-[#0f0f0f] text-[#f5f5f5]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

