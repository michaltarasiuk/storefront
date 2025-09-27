import {Locales} from "@/i18n/consts";
import {IntlProvider} from "@/i18n/IntlProvider";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const {locale} = await params;
  return <IntlProvider locale={locale}>{children}</IntlProvider>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Locales.map((locale) => ({
    locale,
  }));
}
