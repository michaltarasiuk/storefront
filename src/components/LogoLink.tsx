import Image from "next/image";

import {IntlLink} from "@/i18n/components/IntlLink";
import {getIntl} from "@/i18n/utils/get-intl";

import {Routes} from "../consts/routes";

export async function LogoLink() {
  const intl = await getIntl();
  return (
    <IntlLink
      href={Routes.home}
      aria-label={intl.formatMessage({
        id: "kk1RMl",
        defaultMessage: "Go to homepage",
      })}>
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
