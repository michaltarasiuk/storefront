import {IconButton} from "@/shared/components/IconButton";
import {LogoLink} from "@/shared/components/LogoLink";
import {SheetTrigger} from "@/shared/components/Sheet";
import {Routes} from "@/shared/consts/routes";
import {HamburgerIcon} from "@/shared/icons/HamburgerIcon";
import {cn} from "@/shared/utils/cn";

import {MenuItemLink} from "./MenuItem";
import {MobileNavigationSheet} from "./MobileNavigationSheet";
import {ProfileSwitcher} from "./ProfileSwitcher";

export function Header() {
  return (
    <header className={cn("mx-auto max-w-6xl")}>
      {/* Desktop navigation */}
      <div className={cn("hidden items-center justify-between py-6 md:flex")}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LogoLink priority />
          <div>
            <MenuItemLink href={Routes.home}>Shop</MenuItemLink>
            <MenuItemLink href={Routes.orders}>Orders</MenuItemLink>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      {/* Mobile navigation */}
      <div className={cn("relative flex justify-center py-5 md:hidden")}>
        <SheetTrigger>
          <IconButton
            aria-label="Open main navigation"
            className={cn("absolute start-0 size-10 -translate-x-1/4")}>
            <HamburgerIcon aria-hidden />
          </IconButton>
          <MobileNavigationSheet />
        </SheetTrigger>
        <LogoLink priority />
      </div>
    </header>
  );
}
