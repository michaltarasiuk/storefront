import "@/styles/globals.css";

import {Locale, Locales} from "@/i18n/consts";
import {IntlProvider} from "@/i18n/IntlProvider";

import {Html} from "./_components/Html";
import {RouterProvider} from "./_components/RouterProvider";

interface Params {
  locale: Locale;
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<Params>;
}

export default async function RootLayout({children, params}: RootLayoutProps) {
  const {locale} = await params;
  return (
    <Html>
      <body>
        <IntlProvider locale={locale}>
          <RouterProvider>{children}</RouterProvider>
        </IntlProvider>
      </body>
    </Html>
  );
}

export function generateStaticParams() {
  return Locales.map((locale) => ({locale}) satisfies Params);
}
