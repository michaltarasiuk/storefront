"use client";

import {useId} from "react";

import {Avatar} from "@/components/Avatar";
import {Text} from "@/components/Text";
import {cn} from "@/utils/cn";

export function ProfileCard() {
  const profileNameId = useId();
  return (
    <article
      aria-labelledby={profileNameId}
      className={cn(
        "px-base py-small-200 w-full",
        "gap-x-small-200 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
      )}>
      <Avatar
        aria-label="Kristin Watson's profile picture"
        className={cn("row-span-2")}
      />
      <Text id={profileNameId}>Kristin Watson</Text>
      <Text aria-label="Email address" appearance="subdued">
        a.stuart@leafygardens.com
      </Text>
    </article>
  );
}
