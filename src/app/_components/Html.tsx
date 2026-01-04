"use client";

import {useLocale} from "react-aria";

import {fontInter} from "#app/styles/fonts";

export function Html({children}: {children: React.ReactNode}) {
  const {locale, direction} = useLocale();
  return (
    <html
      lang={locale}
      dir={direction}
      data-theme="plant"
      className={`${fontInter.className} ${fontInter.variable}`}>
      {children}
    </html>
  );
}
