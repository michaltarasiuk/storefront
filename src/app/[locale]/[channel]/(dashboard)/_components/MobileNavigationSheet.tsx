"use client";

import {DialogTrigger} from "@/components/Dialog";
import {Sheet} from "@/components/Sheet";
import {Routes} from "@/config/routes";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {logOut} from "../_actions/log-out";
import {LogoutDialog} from "./LogoutDialog";
import {MenuItemButton, MenuItemLink} from "./MenuItem";
import {ProfileCard} from "./ProfileCard";

export function MobileNavigationSheet() {
  const basePathname = useBasePathname();
  return (
    <Sheet className={cn("p-base flex flex-col")}>
      {({close}) => (
        <>
          <ul
            className={cn(
              "border-base-border gap-base flex grow flex-col border-b",
            )}>
            <li className={cn("border-base-border pb-base border-b")}>
              <ProfileCard />
            </li>
            <li>
              <MenuItemLink href={Routes.home} onClick={close}>
                <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
              </MenuItemLink>
            </li>
            <li>
              <MenuItemLink href={Routes.account.orders} onClick={close}>
                <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
              </MenuItemLink>
            </li>
          </ul>
          <ul className={cn("pt-base gap-base flex flex-col")}>
            <li>
              <MenuItemLink href={Routes.account.profile} onClick={close}>
                <FormattedMessage id="itPgxd" defaultMessage="Profile" />
              </MenuItemLink>
            </li>
            <li>
              <MenuItemLink href={Routes.account.settings} onClick={close}>
                <FormattedMessage id="D3idYv" defaultMessage="Settings" />
              </MenuItemLink>
            </li>
            <li>
              <DialogTrigger>
                <MenuItemButton onClick={() => logOut(...basePathname)}>
                  <FormattedMessage id="PlBReU" defaultMessage="Log out" />
                </MenuItemButton>
                <LogoutDialog />
              </DialogTrigger>
            </li>
          </ul>
        </>
      )}
    </Sheet>
  );
}
