"use client";

import {DialogTrigger} from "@/shared/components/Dialog";
import {List, ListItem} from "@/shared/components/List";
import {Sheet} from "@/shared/components/Sheet";
import {Routes} from "@/shared/consts/routes";
import {cn} from "@/shared/utils/cn";

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
                Shop
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <MenuItemLink href={Routes.orders} onClick={close}>
                Orders
              </MenuItemLink>
            </ListItem>
          </List>
          <List className={cn("pt-base")}>
            <ListItem>
              <MenuItemLink href={Routes.profile} onClick={close}>
                Profile
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <MenuItemLink href={Routes.settings} onClick={close}>
                Settings
              </MenuItemLink>
            </ListItem>
            <ListItem>
              <DialogTrigger>
                <MenuItemButton>Log out</MenuItemButton>
                <LogoutDialog />
              </DialogTrigger>
            </ListItem>
          </List>
        </>
      )}
    </Sheet>
  );
}
