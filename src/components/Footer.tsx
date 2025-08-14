import {Suspense} from "react";

import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {LanguageSelector, LanguageSelectorButton} from "./LanguageSelector";

export function Footer() {
  return (
    <footer className={cn("bg-base-background-subdued")}>
      <ul
        className={cn(
          "border-base-border py-large-200 mx-auto max-w-6xl border-t",
          "gap-x-base gap-y-small-400 flex flex-wrap",
        )}>
        <li>
          <Suspense fallback={<LanguageSelectorButton />}>
            <LanguageSelector />
          </Suspense>
        </li>
        <li>
          <IntlLink>
            <FormattedMessage id="T4gmxU" defaultMessage="Refund Policy" />
          </IntlLink>
        </li>
        <li>
          <IntlLink>
            <FormattedMessage id="fiC9xB" defaultMessage="Shipping Policy" />
          </IntlLink>
        </li>
        <li>
          <IntlLink>
            <FormattedMessage id="vx0nkZ" defaultMessage="Privacy Policy" />
          </IntlLink>
        </li>
        <li>
          <IntlLink>
            <FormattedMessage id="32rBNK" defaultMessage="Terms of Service" />
          </IntlLink>
        </li>
      </ul>
    </footer>
  );
}
