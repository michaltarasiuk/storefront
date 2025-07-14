import {Button} from "@/components/Button";
import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Text} from "@/components/Text";
import {cn} from "@/utils/cn";

import {DialogHeader} from "./DialogHeader";

export function DeleteAddressDialog() {
  return (
    <DialogTrigger>
      <Button kind="plain" appearance="critical">
        Delete
      </Button>
      <Modal isDismissable>
        <Dialog>
          {({close}) => (
            <>
              <DialogHeader title="Delete address?" onClose={close} />
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
  return <Text>Existing orders are not affected.</Text>;
}

function DeleteAddressDialogActions({onClose}: {onClose: () => void}) {
  return (
    <div className={cn("gap-small-200 mt-base flex justify-end")}>
      <Button kind="plain" onClick={onClose}>
        Back
      </Button>
      <Button appearance="critical">Delete address</Button>
    </div>
  );
}
