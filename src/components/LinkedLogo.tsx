"use client";

import Image from "next/image";

import {IntlLink} from "@/i18n/components/IntlLink";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {Routes} from "../consts/routes";

export function LinkedLogo() {
  const intl = useIntl();
  return (
    <IntlLink href={Routes.home} className={cn("flex")}>
      <Image
        src="/logo/saleor.svg"
        alt={intl.formatMessage({
          id: "k81S1y",
          defaultMessage: "Logo",
        })}
        width={93}
        height={32}
        priority
      />
    </IntlLink>
  );
}
