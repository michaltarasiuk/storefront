"use client";

import {useTransition} from "react";

import {Button} from "#app/components/Button";
import {useBasePathname} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

import {completeCheckout} from "../../_actions/complete-checkout";

export function CompleteOrderButton() {
  const [locale, channel] = useBasePathname();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="large"
      className={cn("w-full")}
      isDisabled={isPending}
      isPending={isPending}
      onPress={() => startTransition(() => completeCheckout(locale, channel))}>
      <FormattedMessage id="w8g8zN" defaultMessage="Complete order" />
    </Button>
  );
}

export function SkeletonCompleteOrderButton() {
  return (
    <Button size="large" className={cn("w-full")} isDisabled>
      <FormattedMessage id="w8g8zN" defaultMessage="Complete order" />
    </Button>
  );
}
