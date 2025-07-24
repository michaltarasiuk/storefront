"use client";

import {useFormStatus} from "react-dom";

import {Button} from "@/components/Button";
import {FormattedMessage} from "@/i18n/react-intl";

export function SaveButton() {
  const {pending} = useFormStatus();
  return (
    <Button isPending={pending}>
      <FormattedMessage id="jvo0vs" defaultMessage="Save" />
    </Button>
  );
}
