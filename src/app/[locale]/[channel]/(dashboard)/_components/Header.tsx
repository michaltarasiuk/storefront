import {IconButton} from "@/components/IconButton";
import {LinkedLogo} from "@/components/LinkedLogo";
import {SheetTrigger} from "@/components/Sheet";
import {Routes} from "@/consts/routes";
import type {Locale} from "@/i18n/consts";
import {FormattedMessage} from "@/i18n/react-intl";
import {HamburgerIcon} from "@/icons/HamburgerIcon";
import {cn} from "@/utils/cn";

import {MenuItemLink} from "./MenuItem";
import {MobileNavigationSheet} from "./MobileNavigationSheet";
import {ProfileSwitcher} from "./ProfileSwitcher";

export async function Header({locale}: {locale: Locale}) {
  return (
    <header className={cn("bg-base-background")}>
      <div
        className={cn(
          "mx-auto hidden max-w-6xl py-6",
          "items-center justify-between md:flex",
        )}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LinkedLogo locale={locale} />
          <div className={cn("gap-small-300 flex items-center")}>
            <MenuItemLink href={Routes.home}>
              <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
            </MenuItemLink>
            <MenuItemLink href={Routes.account.orders}>
              <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
            </MenuItemLink>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      <div
        className={cn(
          "relative py-5 md:hidden",
          "flex items-center justify-center",
        )}>
        <SheetTrigger>
          <IconButton
            className={cn("absolute start-0 size-10 -translate-x-1/4")}>
            <HamburgerIcon aria-hidden />
          </IconButton>
          <MobileNavigationSheet />
        </SheetTrigger>
        <LinkedLogo locale={locale} />
      </div>
    </header>
  );
}
