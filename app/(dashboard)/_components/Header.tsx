import {IconButton} from "@/shared/components/IconButton";
import {LogoLink} from "@/shared/components/LogoLink";
import {Routes} from "@/shared/consts/routes";
import {HamburgerIcon} from "@/shared/icons/HamburgerIcon";
import {cn} from "@/shared/utils/cn";

import {MenuItem} from "./MenuItem";
import {ProfileSwitcher} from "./ProfileSwitcher";

export function Header() {
  return (
    <header className={cn("mx-auto max-w-6xl")}>
      {/* Desktop navigation */}
      <div className={cn("hidden items-center justify-between py-6 md:flex")}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LogoLink priority />
          <div>
            <MenuItem href={Routes.home}>Shop</MenuItem>
            <MenuItem href={Routes.orders}>Orders</MenuItem>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      {/* Mobile navigation */}
      <div className={cn("relative flex justify-center py-5 md:hidden")}>
        <IconButton
          aria-label="Open main navigation"
          className={cn("absolute start-0 size-10 -translate-x-1/4")}>
          <HamburgerIcon aria-hidden />
        </IconButton>
        <LogoLink priority />
      </div>
    </header>
  );
}
