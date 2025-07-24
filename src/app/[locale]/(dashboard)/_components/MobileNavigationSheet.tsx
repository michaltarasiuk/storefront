"use client";

import {DialogTrigger} from "@/components/Dialog";
import {List, ListItem} from "@/components/List";
import {Sheet} from "@/components/Sheet";
import {Routes} from "@/consts/routes";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {LogoutDialog} from "./LogoutDialog";
import {MenuItemButton, MenuItemLink} from "./MenuItem";
import {ProfileCard} from "./ProfileCard";

export function MobileNavigationSheet() {
  return (
    <Sheet className={cn("p-base flex flex-col")}>
      {({close}) => (
        <>
          <List className={cn("border-base-border grow border-b")}>
            <ListItem className={cn("border-base-border pb-base border-b")}>
              <ProfileCard />
            </ListItem>
            <ListItem>
              <MenuItemLink href={Routes.home} onClick={close}>
                <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <MenuItemLink href={Routes.orders} onClick={close}>
                <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
              </MenuItemLink>
            </ListItem>
          </List>
          <List className={cn("pt-base")}>
            <ListItem>
              <MenuItemLink href={Routes.profile} onClick={close}>
                <FormattedMessage id="itPgxd" defaultMessage="Profile" />
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <MenuItemLink href={Routes.settings} onClick={close}>
                <FormattedMessage id="D3idYv" defaultMessage="Settings" />
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <DialogTrigger>
                <MenuItemButton>
                  <FormattedMessage id="PlBReU" defaultMessage="Log out" />
                </MenuItemButton>
                <LogoutDialog />
              </DialogTrigger>
            </ListItem>
          </List>
        </>
      )}
    </Sheet>
  );
}
