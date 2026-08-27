import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Providers from "@/components/providers";
import { AbilityProvider } from "@/components/providers/ability-provider";
import dynamic from "next/dynamic";
const QuotationPopup = dynamic(() => import("@/components/quotation-popup"), { ssr: false });
import baseConfig from "@/configs/base";
import { getQueryClient } from "@/lib/get-query-client";
import { prefetchLayoutData } from "@/lib/prefetch-helpers";
import { Toaster } from "@components/ui/toaster";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Serif, Inter } from "next/font/google";
import Script from "next/script";

// import AnalyticsTracker from "@/components/analytics-tracker";

import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseConfig.frontendDomain),
  applicationName: "Kepler Group",
  manifest: "/favicon-for-app/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-for-app/favicon.ico", sizes: "any" },
      { url: "/favicon-for-app/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon-for-app/icon1.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon-for-app/favicon.ico",
    apple: [
      { url: "/favicon-for-app/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  title: {
    default: "Kepler Group | Hệ sinh thái dịch vụ bất động sản toàn diện",
    template: "%s | Kepler Group",
  },

  description:
    "Kepler Group cung cấp hệ sinh thái dịch vụ bất động sản toàn diện: tư vấn đầu tư, thẩm định giá, phát triển dự án, quản lý tài sản, M&A, thiết kế xây dựng và giải pháp số.",

  keywords: [
    "Kepler Group",
    "Kepler Property",
    "dịch vụ bất động sản",
    "tư vấn đầu tư bất động sản",
    "thẩm định giá",
    "môi giới bất động sản",
    "quản lý bất động sản",
    "phát triển dự án bất động sản",
    "tư vấn M&A",
    "thiết kế xây dựng",
    "giải pháp số bất động sản",
    "bất động sản",
  ],

  alternates: {
    canonical: "/",
  },

  category: "business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Kepler Group | Hệ sinh thái dịch vụ bất động sản toàn diện",
    description:
      "Kepler Group cung cấp hệ sinh thái dịch vụ bất động sản toàn diện: tư vấn đầu tư, thẩm định giá, phát triển dự án, quản lý tài sản, M&A, thiết kế xây dựng và giải pháp số.",
    url: baseConfig.frontendDomain,
    siteName: "Kepler Group",
    images: [
      {
        url: "/seo.png",
        width: 1731,
        height: 909,
        alt: "Kepler Group | Hệ sinh thái dịch vụ bất động sản toàn diện",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kepler Group | Hệ sinh thái dịch vụ bất động sản toàn diện",
    description:
      "Kepler Group cung cấp hệ sinh thái dịch vụ bất động sản toàn diện: tư vấn đầu tư, thẩm định giá, phát triển dự án, quản lý tài sản, M&A, thiết kế xây dựng và giải pháp số.",
    images: ["/seo.png"],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  await prefetchLayoutData(queryClient);

  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${inter.variable} font-serif antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S1WZBLT72V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S1WZBLT72V');
          `}
        </Script>
        {/* <AnalyticsTracker /> */}

        <Providers>
          <AbilityProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Header className="fixed top-0 left-0 w-full overflow-visible" />
            </HydrationBoundary>
            <main className="min-h-screen">{children}</main>
            <Footer />
            <QuotationPopup />
          </AbilityProvider>
          <Toaster
            richColors
            closeButton
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: "p-3 gap-2",
              classNames: {
                closeButton:
                  "left-auto right-0 top-0 -translate-y-2.5 translate-x-0",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
