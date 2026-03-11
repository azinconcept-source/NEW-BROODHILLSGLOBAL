import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script id="google-consent-mode-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]`}
      >
        <ClerkProvider>
          <Header />
          {children}
          <Footer />
          <StickyNotifications />
          <VisualEditsMessenger />
          <Script src="/js/cookie-consent.js" strategy="lazyOnload" />
        </ClerkProvider>
      </body>
    </html>
  );
}
