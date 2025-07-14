import {IconButton} from "@/components/IconButton";
import {LogoLink} from "@/components/LogoLink";
import {SheetTrigger} from "@/components/Sheet";
import {Routes} from "@/consts/routes";
import {HamburgerIcon} from "@/icons/HamburgerIcon";
import {cn} from "@/utils/cn";

import {MenuItemLink} from "./MenuItem";
import {MobileNavigationSheet} from "./MobileNavigationSheet";
import {ProfileSwitcher} from "./ProfileSwitcher";

export function Header() {
  return (
    <header className={cn("mx-auto max-w-6xl")}>
      {/* Desktop navigation */}
      <div className={cn("hidden items-center justify-between py-6 md:flex")}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LogoLink />
          <div>
            <MenuItemLink href={Routes.home}>Shop</MenuItemLink>
            <MenuItemLink href={Routes.orders}>Orders</MenuItemLink>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      {/* Mobile navigation */}
      <div
        className={cn(
          "relative flex items-center justify-center py-5 md:hidden",
        )}>
        <SheetTrigger>
          <IconButton
            aria-label="Open main navigation"
            className={cn("absolute start-0 size-10 -translate-x-1/4")}>
            <HamburgerIcon aria-hidden />
          </IconButton>
          <MobileNavigationSheet />
        </SheetTrigger>
        <LogoLink />
      </div>
    </header>
  );
}
