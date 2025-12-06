"use client";

import Image from "next/image";

import {Routes} from "#app/consts/routes";
import {IntlLink} from "#app/i18n/components/IntlLink";
import {useIntl} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

export function LinkedLogo() {
  const intl = useIntl();
  return (
    <IntlLink href={Routes.home} className={cn("flex")}>
      <Image
        src="/logo.png"
        alt={intl.formatMessage({
          id: "k81S1y",
          defaultMessage: "Logo",
        })}
        width={112}
        height={36}
        priority
      />
    </IntlLink>
  );
}
