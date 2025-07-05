"use client";

import {useState} from "react";
import {Button} from "react-aria-components";

import {Avatar} from "@/shared/components/Avatar";
import {Menu, MenuItem, MenuTrigger} from "@/shared/components/Menu";
import {Routes} from "@/shared/consts/routes";
import {ChevronDownIcon} from "@/shared/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/shared/icons/ChevronUpIcon";
import {cn} from "@/shared/utils/cn";

export function ProfileSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={cn(
          "rounded-base flex cursor-pointer items-center gap-2 px-2 py-1",
          "hover:bg-base-background-subdued",
          "focus-visible:bg-base-background-subdued/50 focus-visible:ring-base-accent outline-none focus-visible:ring-2",
        )}>
        <Avatar />
        {isOpen ? (
          <ChevronUpIcon
            aria-hidden
            className={cn("stroke-base-text size-3.5")}
          />
        ) : (
          <ChevronDownIcon
            aria-hidden
            className={cn("stroke-base-text size-3.5")}
          />
        )}
      </Button>
      <Menu>
        <MenuItem href={Routes.profile}>Profile</MenuItem>
        <MenuItem href={Routes.settings}>Settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
