import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Providers from "@/components/providers";
import { AbilityProvider } from "@/components/providers/ability-provider";
import QuotationPopup from "@/components/quotation-popup";
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
  icons: {
    icon: [
      { url: "/images/favicon.ico", type: "image/x-icon" },
      // { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      // { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      // { url: "/images/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/images/favicon.ico",
  },


  title: {
    default:
      "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    template: "%s | Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
  },

  description:
    "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",

  keywords: [
    "tiêu chuẩn đo lường chất lượng",
    "kiểm định",
    "hiệu chuẩn",
    "thử nghiệm",
    "chuẩn đo lường",
    "kiểm định thiết bị y tế",
    "đo lường",
    "chất lượng sản phẩm",
    "quy chuẩn kỹ thuật",
    "dịch vụ khoa học công nghệ",
    "Sở Khoa học và Công nghệ TP.HCM",
    "kiểm định an toàn thiết bị y tế",
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    description:
      "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    url: baseConfig.frontendDomain,
    siteName: "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    images: [
      {
        url: `${baseConfig.frontendDomain}/images/case-smeg-thumb.png`,
        width: 1200,
        height: 630,
        alt: "Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng TP. Hồ Chí Minh",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    description:
      "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất",
    images: [`${baseConfig.frontendDomain}/images/case-smeg-thumb.png`],
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
