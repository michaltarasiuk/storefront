"use client";

import {useFormStatus} from "react-dom";

import {Button} from "#app/components/Button";
import {FormattedMessage} from "#app/i18n/react-intl";

export function SaveButton() {
  const {pending} = useFormStatus();
  return (
    <Button isPending={pending}>
      <FormattedMessage id="jvo0vs" defaultMessage="Save" />
    </Button>
  );
}
