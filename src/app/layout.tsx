import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { yekanBakh, openSans } from "../components/style/fonts";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from "@/contexts/userContext";

export const metadata: Metadata = {
  title: "استودیو عکاسی | گالری تصاویر حرفه‌ای",
  description: "استودیو عکاسی حرفه‌ای با ارائه خدمات عکاسی پرتره، منظره، عروسی، تبلیغاتی و صنعتی با بالاترین کیفیت. مشاهده نمونه کارها و رزرو جلسه عکاسی.",
  keywords: "عکاسی، استودیو عکاسی، گالری عکس، عکاسی حرفه‌ای، عکاسی پرتره، عکاسی عروسی، عکاسی تبلیغاتی",
  authors: [{ name: "استودیو عکاسی" }],
  creator: "استودیو عکاسی",
  publisher: "استودیو عکاسی",
  icons: [
    { rel: 'icon', url: '/camera.ico' },
    { rel: 'shortcut icon', url: '/camera.ico' },
    { rel: 'apple-touch-icon', url: '/camera.ico' }
  ],
  openGraph: {
    title: "استودیو عکاسی | گالری تصاویر حرفه‌ای",
    description: "استودیو عکاسی حرفه‌ای با ارائه خدمات متنوع و با کیفیت",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/camera.ico" />
        <link rel="shortcut icon" href="/camera.ico" />
        <link rel="apple-touch-icon" href="/camera.ico" />
      </head>
      <body
        className={`${yekanBakh.variable} ${openSans.variable} antialiased bg-white`}
      >
        <UserProvider>
          <Header />
          {children}
          <Toaster position="top-left" />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}