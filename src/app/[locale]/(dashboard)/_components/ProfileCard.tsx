"use client";

import {Avatar} from "@/components/Avatar";
import {Text} from "@/components/Text";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

export function ProfileCard() {
  const intl = useIntl();
  return (
    <article
      className={cn(
        "px-base py-small-200 w-full",
        "gap-x-small-200 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
      )}>
      <Avatar className={cn("row-span-2")} />
      <Text>Kristin Watson</Text>
      <Text
        aria-label={intl.formatMessage({
          id: "hJZwTS",
          defaultMessage: "Email address",
        })}
        appearance="subdued">
        a.stuart@leafygardens.com
      </Text>
    </article>
  );
}
