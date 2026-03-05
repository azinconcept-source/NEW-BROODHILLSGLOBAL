import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import StickyNotifications from "@/components/ui/sticky-notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Broodhills Global Services - Global Energy Company",
  description: "Broodhills Global Services is a global energy company with presence in West Africa and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]`}
      >
        <Header />
        {children}
        <Footer />
        <StickyNotifications />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
