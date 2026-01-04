"use client";

import {useId, useState} from "react";
import {Button} from "react-aria-components";

import {Avatar} from "#app/components/Avatar";
import {Menu, MenuItem, MenuTrigger} from "#app/components/Menu";
import {ROUTES} from "#app/consts/routes";
import {usePathnameParams} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";
import {ChevronDownIcon} from "#app/icons/ChevronDownIcon";
import {ChevronUpIcon} from "#app/icons/ChevronUpIcon";
import {cn} from "#app/utils/cn";

import {signOutAction} from "../_actions/sign-out";
import {LogoutDialog} from "./LogoutDialog";

export function ProfileSwitcher() {
  const pathnameParams = usePathnameParams();
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
          onAction={async (action) => {
            if (action === logoutDialogId) {
              setIsLogoutDialogOpen(true);
              await signOutAction(...pathnameParams);
            }
          }}>
          <MenuItem href={ROUTES.account.profile}>
            <FormattedMessage id="itPgxd" defaultMessage="Profile" />
          </MenuItem>
          <MenuItem href={ROUTES.account.settings}>
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
