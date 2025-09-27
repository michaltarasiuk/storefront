"use client";

import {Button} from "@/components/Button";
import {DialogTrigger} from "@/components/Dialog";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {FormattedMessage} from "@/i18n/react-intl";

import {deactivateAllTokens} from "../../_actions/deactivate-all-tokens";
import {LogoutDialog} from "../../_components/LogoutDialog";

export function DeactivateAllTokensButton() {
  const basePathname = useBasePathname();
  return (
    <DialogTrigger>
      <Button
        kind="secondary"
        onClick={() => deactivateAllTokens(...basePathname)}>
        <FormattedMessage id="s3O2Si" defaultMessage="Log out everywhere" />
      </Button>
      <LogoutDialog />
    </DialogTrigger>
  );
}
