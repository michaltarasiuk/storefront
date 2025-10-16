"use client";

import {useLocale} from "react-aria";

import {fontInter} from "@/styles/fonts";

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
