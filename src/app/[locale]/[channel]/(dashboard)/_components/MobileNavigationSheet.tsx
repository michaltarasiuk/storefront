"use client";

import {DialogTrigger} from "#app/components/Dialog";
import {Sheet} from "#app/components/Sheet";
import {Routes} from "#app/consts/routes";
import {useBasePathname} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

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
              <MenuItemLink href={Routes.home} onPress={close}>
                <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
              </MenuItemLink>
            </li>
            <li>
              <MenuItemLink href={Routes.account.orders} onPress={close}>
                <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
              </MenuItemLink>
            </li>
          </ul>
          <ul className={cn("pt-base gap-base flex flex-col")}>
            <li>
              <MenuItemLink href={Routes.account.profile} onPress={close}>
                <FormattedMessage id="itPgxd" defaultMessage="Profile" />
              </MenuItemLink>
            </li>
            <li>
              <MenuItemLink href={Routes.account.settings} onPress={close}>
                <FormattedMessage id="D3idYv" defaultMessage="Settings" />
              </MenuItemLink>
            </li>
            <li>
              <DialogTrigger>
                <MenuItemButton onPress={() => logOut(...basePathname)}>
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
