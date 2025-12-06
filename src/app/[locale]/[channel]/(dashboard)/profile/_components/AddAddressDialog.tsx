"use client";

import {Suspense} from "react";
import {Button} from "react-aria-components";

import {
  AddressFields,
  SkeletonAddressFields,
} from "#app/components/AddressFields";
import {Checkbox} from "#app/components/Checkbox";
import {Dialog, DialogTrigger, Modal} from "#app/components/Dialog";
import {Form} from "#app/components/Form";
import {FormattedMessage, useIntl} from "#app/i18n/react-intl";
import {PlusIcon} from "#app/icons/PlusIcon";
import {cn} from "#app/utils/cn";

import {CancelButton} from "./CancelButton";
import {SaveButton} from "./SaveButton";

export function AddAddressDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <AddButton />
      <Modal size="large" isDismissable>
        <Dialog
          heading={intl.formatMessage({
            id: "v0xaYB",
            defaultMessage: "Add address",
          })}>
          {({close}) => (
            <AddAddressForm cancelButton={<CancelButton onPress={close} />} />
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
      <Suspense fallback={<SkeletonAddressFields />}>
        <AddressFields />
      </Suspense>
      <div className={cn("gap-base flex justify-end")}>
        {cancelButton}
        <SaveButton />
      </div>
    </Form>
  );
}
