"use client";

import {useId, useState} from "react";
import {Button} from "react-aria-components";

import {Avatar} from "@/components/Avatar";
import {Menu, MenuItem, MenuTrigger} from "@/components/Menu";
import {Routes} from "@/consts/routes";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronDownIcon} from "@/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/icons/ChevronUpIcon";
import {cn} from "@/utils/cn";

import {LogoutDialog} from "./LogoutDialog";

export function ProfileSwitcher() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const logoutDialogId = useId();
  return (
    <>
      <MenuTrigger isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Button
          className={cn(
            "rounded-base gap-small-200 flex cursor-pointer items-center px-2 py-1",
            "hover:bg-base-background-subdued",
            "focus-visible:bg-base-background-subdued/50 focus-visible:ring-base-accent outline-none focus-visible:ring-2",
          )}>
          <Avatar />
          {isMenuOpen ? (
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
        <Menu
          onAction={(action) => {
            if (action === logoutDialogId) {
              setIsLogoutDialogOpen(true);
            }
          }}>
          <MenuItem href={Routes.profile}>
            <FormattedMessage id="itPgxd" defaultMessage="Profile" />
          </MenuItem>
          <MenuItem href={Routes.settings}>
            <FormattedMessage id="D3idYv" defaultMessage="Settings" />
          </MenuItem>
          <MenuItem id={logoutDialogId}>
            <FormattedMessage id="PlBReU" defaultMessage="Log out" />
          </MenuItem>
        </Menu>
      </MenuTrigger>
      <LogoutDialog isOpen={isLogoutDialogOpen} />
    </>
  );
}
