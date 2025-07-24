import {IconButton} from "@/components/IconButton";
import {LogoLink} from "@/components/LogoLink";
import {SheetTrigger} from "@/components/Sheet";
import {Routes} from "@/consts/routes";
import {FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {HamburgerIcon} from "@/icons/HamburgerIcon";
import {cn} from "@/utils/cn";

import {MenuItemLink} from "./MenuItem";
import {MobileNavigationSheet} from "./MobileNavigationSheet";
import {ProfileSwitcher} from "./ProfileSwitcher";

export async function Header() {
  const intl = await getIntl();
  return (
    <header className={cn("mx-auto max-w-6xl")}>
      <div className={cn("hidden items-center justify-between py-6 md:flex")}>
        <nav className={cn("gap-large-500 flex items-center")}>
          <LogoLink />
          <div className={cn("gap-small-300 flex items-center")}>
            <MenuItemLink href={Routes.home}>
              <FormattedMessage id="Dxd1uB" defaultMessage="Shop" />
            </MenuItemLink>
            <MenuItemLink href={Routes.orders}>
              <FormattedMessage id="X7jl6w" defaultMessage="Orders" />
            </MenuItemLink>
          </div>
        </nav>
        <ProfileSwitcher />
      </div>
      <div
        className={cn(
          "relative flex items-center justify-center py-5 md:hidden",
        )}>
        <SheetTrigger>
          <IconButton
            aria-label={intl.formatMessage({
              id: "e7yFQY",
              defaultMessage: "Open main navigation",
            })}
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
