import {Avatar} from "@/shared/components/Avatar";
import {Button} from "@/shared/components/Button";
import {IconButton} from "@/shared/components/IconButton";
import {LogoLink} from "@/shared/components/LogoLink";
import {Routes} from "@/shared/consts/routes";
import {HamburgerIcon} from "@/shared/icons/HamburgerIcon";
import {cn} from "@/shared/utils/cn";

import {MenuItem} from "./MenuItem";
import {ProfileSwitcher} from "./ProfileSwitcher";

export function Header() {
  return (
    <header className={cn("container mx-auto")}>
      {/* Desktop Header */}
      <div className={cn("hidden items-center justify-between py-6 sm:flex")}>
        <nav className={cn("flex items-center gap-12")}>
          <LogoLink />
          <MenuItem href={Routes.orders}>Orders</MenuItem>
        </nav>
        <div className={cn("flex items-center gap-5")}>
          <ProfileSwitcher />
          <Button>Go to store</Button>
        </div>
      </div>
      {/* Mobile Header */}
      <div
        className={cn(
          "flex items-center justify-between px-5 py-5 sm:hidden sm:px-0",
        )}>
        <IconButton aria-label="Open menu">
          <HamburgerIcon aria-hidden />
        </IconButton>
        <LogoLink />
        <Avatar />
      </div>
    </header>
  );
}
