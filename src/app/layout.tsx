import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./Components/ConditionalLayout";
import { AppProvider } from "@/contexts/AppProvider";
import { CollegesProvider } from "@/contexts/CollegesContext";
import { SITE_IDENTITY } from "../site-identity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_IDENTITY.meta.title,
  description: SITE_IDENTITY.meta.description,
  keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  icons: {
    icon: SITE_IDENTITY.assets.logo.favicon,
    apple: SITE_IDENTITY.assets.logo.appleTouchIcon,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <CollegesProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </CollegesProvider>
        </AppProvider>
      </body>
    </html>
  );
}
