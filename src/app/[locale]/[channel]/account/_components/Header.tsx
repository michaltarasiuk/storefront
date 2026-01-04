import {IconButton} from "#app/components/IconButton";
import {LinkedLogo} from "#app/components/LinkedLogo";
import {SheetTrigger} from "#app/components/Sheet";
import {ROUTES} from "#app/consts/routes";
import {FormattedMessage} from "#app/i18n/react-intl";
import {HamburgerIcon} from "#app/icons/HamburgerIcon";
import {cn} from "#app/utils/cn";

import {MenuItemLink} from "./MenuItem";
import {MobileNavigationSheet} from "./MobileNavigationSheet";
import {ProfileSwitcher} from "./ProfileSwitcher";

export async function Header() {
  return (
    <header className={cn("bg-base-background px-large-200")}>
      <div
        className={cn(
          "mx-auto hidden max-w-6xl items-center justify-between py-6",
          "md:flex",
        )}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LinkedLogo />
          <div className={cn("gap-small-300 flex items-center")}>
            <MenuItemLink href={ROUTES.home}>
              <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
            </MenuItemLink>
            <MenuItemLink href={ROUTES.account.orders}>
              <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
            </MenuItemLink>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      <div
        className={cn(
          "relative flex items-center justify-center py-5",
          "md:hidden",
        )}>
        <SheetTrigger>
          <IconButton
            className={cn("absolute start-0 size-10 -translate-x-1/4")}>
            <HamburgerIcon aria-hidden />
          </IconButton>
          <MobileNavigationSheet />
        </SheetTrigger>
        <LinkedLogo />
      </div>
    </header>
  );
}
