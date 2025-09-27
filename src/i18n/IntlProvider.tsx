import {DefaultLocale} from "./consts";
import {I18nProvider as AriaI18nProvider} from "./react-aria-components";
import {IntlProvider as ReactIntlProvider} from "./react-intl";
import {getIntl} from "./utils/get-intl";
import {isLocaleSupported} from "./utils/is-locale-supported";

export async function IntlProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const intl = await getIntl(
    isLocaleSupported(locale) ? locale : DefaultLocale,
  );
  return (
    <ReactIntlProvider
      locale={intl.locale}
      defaultLocale={intl.defaultLocale}
      messages={intl.messages}>
      <AriaI18nProvider locale={intl.locale}>{children}</AriaI18nProvider>
    </ReactIntlProvider>
  );
}
