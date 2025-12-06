"use client";

import {Button} from "#app/components/Button";
import {Dialog, DialogTrigger, Modal} from "#app/components/Dialog";
import {Text} from "#app/components/Text";
import {FormattedMessage, useIntl} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

export function DeleteAddressDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <Button kind="plain" appearance="critical">
        <FormattedMessage id="K3r6DQ" defaultMessage="Delete" />
      </Button>
      <Modal isDismissable>
        <Dialog
          heading={intl.formatMessage({
            id: "I9ur7M",
            defaultMessage: "Delete address?",
          })}>
          {({close}) => (
            <>
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
      <Button kind="plain" onPress={onClose}>
        <FormattedMessage id="cyR7Kh" defaultMessage="Back" />
      </Button>
      <Button appearance="critical">
        <FormattedMessage id="74xz0X" defaultMessage="Delete address" />
      </Button>
    </div>
  );
}
