import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { FB_PIXEL_ID } from "./lib/facebook";

// Definição das fontes
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "DECOL DESIGN - Loja dos Famosos | Design de Interiores Exclusivo",
  description:
    "Transforme seu espaço com o requinte e sofisticação que só a DECOL DESIGN pode oferecer. A escolha dos famosos agora ao seu alcance.",
  keywords:
    "design de interiores, móveis de luxo, decoração, Londrina, DECOL DESIGN",
  openGraph: {
    title: "DECOL DESIGN - Loja dos Famosos",
    description:
      "Transforme seu espaço com o requinte e sofisticação que só a DECOL DESIGN pode oferecer.",
    url: "https://decol.design",
    type: "website",
    images: [
      {
        url: "https://decol.design/imagem-og.jpg",
        width: 1200,
        height: 630,
        alt: "DECOL DESIGN - Loja dos Famosos",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <head>
        <meta
          name="facebook-domain-verification"
          content="kr57qqlp0v28xgf4rc846x5out528w"
        />
      </head>
      <body className="min-h-screen bg-black font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
