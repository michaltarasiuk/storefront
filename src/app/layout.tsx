import {DEFAULT_LOCALE} from '@/i18n/consts';
import {fontSans} from '@/styles/fonts';
import '@/styles/globals.css';

import type {ReactNode} from 'react';

type Props = {readonly children: ReactNode};

export default function RootLayout({children}: Props) {
  return (
    <html lang={DEFAULT_LOCALE} className={fontSans.className}>
      <body>{children}</body>
    </html>
  );
}
