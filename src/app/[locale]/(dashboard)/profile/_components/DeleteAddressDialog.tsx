"use client";

import {Button} from "@/components/Button";
import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Text} from "@/components/Text";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {DialogHeader} from "./DialogHeader";

export function DeleteAddressDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <Button kind="plain" appearance="critical">
        <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
      </Button>
      <Modal isDismissable>
        <Dialog>
          {({close}) => (
            <>
              <DialogHeader
                title={intl.formatMessage({
                  id: "I9ur7M",
                  defaultMessage: "Delete address?",
                })}
                onClose={close}
              />
              <DeleteAddressDialogContent />
              <DeleteAddressDialogActions onClose={close} />
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

function DeleteAddressDialogContent() {
  return (
    <Text>
      <FormattedMessage
        id="sWflS2"
        defaultMessage="Existing orders are not affected."
      />
    </Text>
  );
}

function DeleteAddressDialogActions({onClose}: {onClose: () => void}) {
  return (
    <div className={cn("gap-small-200 mt-base flex justify-end")}>
      <Button kind="plain" onClick={onClose}>
        <FormattedMessage id="cyR7Kh" defaultMessage="Back" />
      </Button>
      <Button appearance="critical">
        <FormattedMessage id="74xz0X" defaultMessage="Delete address" />
      </Button>
    </div>
  );
}
