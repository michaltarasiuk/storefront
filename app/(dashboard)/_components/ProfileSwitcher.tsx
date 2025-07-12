"use client";

import {useId, useState} from "react";
import {Button} from "react-aria-components";

import {Avatar} from "@/shared/components/Avatar";
import {Dialog, Modal} from "@/shared/components/Dialog";
import {Menu, MenuItem, MenuTrigger} from "@/shared/components/Menu";
import {Text} from "@/shared/components/Text";
import {Routes} from "@/shared/consts/routes";
import {ChevronDownIcon} from "@/shared/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/shared/icons/ChevronUpIcon";
import {cn} from "@/shared/utils/cn";

export function ProfileSwitcher() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const logoutDialogId = useId();
  return (
    <>
      <MenuTrigger isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Button
          className={cn(
            "rounded-base flex cursor-pointer items-center gap-2 px-2 py-1",
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
          <MenuItem href={Routes.profile}>Profile</MenuItem>
          <MenuItem href={Routes.settings}>Settings</MenuItem>
          <MenuItem id={logoutDialogId}>Log out</MenuItem>
        </Menu>
      </MenuTrigger>
      <Modal isOpen={isLogoutDialogOpen} size="auto">
        <Dialog className={cn("flex items-center justify-center")}>
          <Text>Logging you out...</Text>
        </Dialog>
      </Modal>
    </>
  );
}
