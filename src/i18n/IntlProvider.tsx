import {I18nProvider as AriaI18nProvider} from "./react-aria-components";
import {IntlProvider as ReactIntlProvider} from "./react-intl";
import {getIntl} from "./utils/get-intl";

interface IntlProviderProps {
  locale: string;
  children: React.ReactNode;
}

export async function IntlProvider({children, ...props}: IntlProviderProps) {
  const {locale, defaultLocale, messages} = await getIntl(props.locale);
  return (
    <ReactIntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}>
      <AriaI18nProvider locale={locale}>{children}</AriaI18nProvider>
    </ReactIntlProvider>
  );
}
