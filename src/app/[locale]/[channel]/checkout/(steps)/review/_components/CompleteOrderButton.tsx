"use client";

import {useTransition} from "react";

import {Button} from "@/components/Button";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

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
      onClick={() => startTransition(() => completeCheckout(locale, channel))}>
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
