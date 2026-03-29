import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yamaya Trade - Япон хүнсний төв",
  description:
    "Yamaya Trade - Japanese Food Center in Mongolia. Authentic Japanese food products, quality guaranteed. Таны хэрэглээг чанаржуулна.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${notoSansJP.className} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
