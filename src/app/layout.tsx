import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import baseConfig from "@/configs/base";
import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

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
      { url: "/images/icon.png", type: "image/png" },
    ],
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },

  title: {
    default:
      "Kepler Property - Nền tảng BĐS chuyên nghiệp hàng đầu Việt Nam",
    template: "%s | Kepler Property",
  },

  description:
    "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",

  keywords: [
    "Kepler Property",
    "bất động sản",
    "mua bán nhà đất",
    "cho thuê nhà đất",
    "căn hộ",
    "biệt thự",
    "đất nền",
    "nhà phố",
    "dự án BĐS",
    "Vinhomes",
    "bất động sản TP.HCM",
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
    title: "Kepler Property - Nền tảng BĐS chuyên nghiệp hàng đầu Việt Nam",
    description:
      "Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",
    url: baseConfig.frontendDomain,
    siteName: "Kepler Property",
    images: [
      {
        url: `${baseConfig.frontendDomain}/images/seo.png`,
        width: 1200,
        height: 630,
        alt: "Kepler Property",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kepler Property - Nền tảng BĐS chuyên nghiệp hàng đầu Việt Nam",
    description:
      "Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",
    images: [`${baseConfig.frontendDomain}/images/seo.png`],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${notoSerif.variable} ${inter.variable} font-sans antialiased`}
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

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Kepler Property',
              url: 'https://kepler-vietprodev.vercel.app',
              logo: 'https://kepler-vietprodev.vercel.app/images/logo.png',
              sameAs: ['https://www.facebook.com/keplerland'],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+84901234567',
                contactType: 'customer service',
                availableLanguage: ['Vietnamese'],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
