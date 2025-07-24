"use client";

import {Inter} from "next/font/google";
import {useLocale} from "react-aria";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function Html({children}: {children: React.ReactNode}) {
  const {locale, direction} = useLocale();
  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.className} ${inter.variable}`}>
      {children}
    </html>
  );
}
