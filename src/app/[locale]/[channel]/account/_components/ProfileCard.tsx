"use client";

import {Avatar} from "#app/components/Avatar";
import {Text} from "#app/components/Text";
import {cn} from "#app/utils/cn";

export function ProfileCard() {
  return (
    <article
      className={cn(
        "px-base py-small-200 w-full",
        "gap-x-small-200 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
      )}>
      <Avatar className={cn("row-span-2")} />
      <Text>Kristin Watson</Text>
      <Text appearance="subdued">a.stuart@leafygardens.com</Text>
    </article>
  );
}
