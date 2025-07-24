import type {Locale} from "./consts";
import {I18nProvider as AriaI18nProvider} from "./react-aria-components";
import {IntlProvider as ReactIntlProvider} from "./react-intl";
import {getIntl} from "./utils/get-intl";

export async function IntlProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const intl = await getIntl(locale);
  return (
    <ReactIntlProvider
      locale={intl.locale}
      defaultLocale={intl.defaultLocale}
      messages={intl.messages}>
      <AriaI18nProvider locale={intl.locale}>{children}</AriaI18nProvider>
    </ReactIntlProvider>
  );
}
