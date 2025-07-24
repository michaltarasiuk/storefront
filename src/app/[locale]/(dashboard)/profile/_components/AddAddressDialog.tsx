"use client";

import {Button} from "react-aria-components";

import {Checkbox} from "@/components/Checkbox";
import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Form} from "@/components/Form";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {PlusIcon} from "@/icons/PlusIcon";
import {cn} from "@/utils/cn";

import {CancelButton} from "./CancelButton";
import {DialogHeader} from "./DialogHeader";
import {AddressFieldset} from "./Fieldset";
import {SaveButton} from "./SaveButton";

export function AddAddressDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <AddButton />
      <Modal size="large" isDismissable>
        <Dialog className={cn("space-y-base")}>
          {({close}) => (
            <>
              <DialogHeader
                title={intl.formatMessage({
                  id: "v0xaYB",
                  defaultMessage: "Add address",
                })}
                onClose={close}
              />
              <AddAddressForm cancelButton={<CancelButton onClick={close} />} />
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

function AddButton() {
  return (
    <Button
      className={cn(
        "gap-small-500 p-small-500 font-primary text-base-accent rounded-base flex cursor-pointer items-center text-base",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
      )}>
      <PlusIcon aria-hidden className={cn("stroke-base-accent size-4")} />
      <FormattedMessage id="2/2yg+" defaultMessage="Add" />
    </Button>
  );
}

function AddAddressForm({cancelButton}: {cancelButton: React.ReactNode}) {
  return (
    <Form className={cn("space-y-base")}>
      <Checkbox>
        <FormattedMessage
          id="BIxs9X"
          defaultMessage="This is my default address"
        />
      </Checkbox>
      <AddressFieldset />
      <div className={cn("gap-base flex justify-end")}>
        {cancelButton}
        <SaveButton />
      </div>
    </Form>
  );
}
