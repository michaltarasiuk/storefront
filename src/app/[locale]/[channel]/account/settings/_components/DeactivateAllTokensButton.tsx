"use client";

import {Button} from "#app/components/Button";
import {DialogTrigger} from "#app/components/Dialog";
import {usePathnameParams} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";

import {deactivateAllTokensAction} from "../../_actions/deactivate-all-tokens";
import {LogoutDialog} from "../../_components/LogoutDialog";

export function DeactivateAllTokensButton() {
  const pathnameParams = usePathnameParams();
  return (
    <DialogTrigger>
      <Button
        kind="secondary"
        onPress={() => deactivateAllTokensAction(...pathnameParams)}>
        <FormattedMessage id="s3O2Si" defaultMessage="Log out everywhere" />
      </Button>
      <LogoutDialog />
    </DialogTrigger>
  );
}
