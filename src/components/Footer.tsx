import {cva, type VariantProps} from "class-variance-authority";
import {Suspense} from "react";

import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {LanguageSelector, LanguageSelectorButton} from "./LanguageSelector";

const footer = cva("px-large-200 md:px-0", {
  variants: {
    variant: {
      base: "bg-base-background",
      subdued: "bg-base-background-subdued",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export function Footer({variant}: VariantProps<typeof footer>) {
  return (
    <footer
      className={cn(
        footer({
          variant,
        }),
      )}>
      <ul
        className={cn(
          "border-base-border py-large-200 gap-x-base gap-y-small-400 mx-auto flex max-w-6xl flex-wrap border-t",
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
