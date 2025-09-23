"use client";

import {Button} from "@/components/Button";
import {DialogTrigger} from "@/components/Dialog";
import {usePathnameContext} from "@/hooks/use-pathname-context";
import {FormattedMessage} from "@/i18n/react-intl";

import {tokensDeactivateAll} from "../../_actions/tokens-deactivate-all";
import {LogoutDialog} from "../../_components/LogoutDialog";

export function DeactivateAllTokensButton() {
  const pathnameContext = usePathnameContext();
  return (
    <DialogTrigger>
      <Button
        kind="secondary"
        onClick={() => tokensDeactivateAll(...pathnameContext)}>
        <FormattedMessage id="s3O2Si" defaultMessage="Log out everywhere" />
      </Button>
      <LogoutDialog />
    </DialogTrigger>
  );
}
