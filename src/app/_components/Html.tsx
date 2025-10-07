"use client";

import {useLocale} from "react-aria";

import {fontInter} from "@/config/fonts";

export function Html({children}: {children: React.ReactNode}) {
  const {locale, direction} = useLocale();
  return (
    <html
      lang={locale}
      dir={direction}
      className={`${fontInter.className} ${fontInter.variable}`}>
      {children}
    </html>
  );
}
