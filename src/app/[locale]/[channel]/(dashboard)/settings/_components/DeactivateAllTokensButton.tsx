"use client";

import {Button} from "#app/components/Button";
import {DialogTrigger} from "#app/components/Dialog";
import {useBasePathname} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";

import {deactivateAllTokens} from "../../_actions/deactivate-all-tokens";
import {LogoutDialog} from "../../_components/LogoutDialog";

export function DeactivateAllTokensButton() {
  const basePathname = useBasePathname();
  return (
    <DialogTrigger>
      <Button
        kind="secondary"
        onPress={() => deactivateAllTokens(...basePathname)}>
        <FormattedMessage id="s3O2Si" defaultMessage="Log out everywhere" />
      </Button>
      <LogoutDialog />
    </DialogTrigger>
  );
}
