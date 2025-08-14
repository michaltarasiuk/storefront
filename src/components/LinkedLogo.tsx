import Image from "next/image";

import {IntlLink} from "@/i18n/components/IntlLink";
import type {Locale} from "@/i18n/consts";
import {getIntl} from "@/i18n/utils/get-intl";

import {Routes} from "../consts/routes";

export async function LinkedLogo({locale}: {locale: Locale}) {
  const intl = await getIntl(locale);
  return (
    <IntlLink href={Routes.home}>
      <Image
        src="/logo.png"
        alt={intl.formatMessage({
          id: "gvXtEw",
          defaultMessage: "Company logo",
        })}
        width={112}
        height={36}
        priority
      />
    </IntlLink>
  );
}
