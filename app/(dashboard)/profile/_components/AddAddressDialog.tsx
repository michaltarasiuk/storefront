"use client";

import {Button} from "react-aria-components";

import {Checkbox} from "@/components/Checkbox";
import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Form} from "@/components/Form";
import {PlusIcon} from "@/icons/PlusIcon";
import {cn} from "@/utils/cn";

import {CancelButton} from "./CancelButton";
import {DialogHeader} from "./DialogHeader";
import {AddressFieldset} from "./Fieldset";
import {SaveButton} from "./SaveButton";

export function AddAddressDialog() {
  return (
    <DialogTrigger>
      <AddButton />
      <Modal size="large" isDismissable>
        <Dialog className={cn("space-y-base")}>
          {({close}) => (
            <>
              <DialogHeader title="Add address" onClose={close} />
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
        "gap-small-500 p-small-500 flex cursor-pointer items-center",
        "font-primary text-base-accent rounded-base text-base",
        "focus-visible:ring-base-accent outline-none focus-visible:ring-2",
      )}>
      <PlusIcon aria-hidden className={cn("stroke-base-accent size-4")} />
      Add
    </Button>
  );
}

function AddAddressForm({cancelButton}: {cancelButton: React.ReactNode}) {
  return (
    <Form className={cn("space-y-base")}>
      <Checkbox>This is my default address</Checkbox>
      <AddressFieldset />
      <div className={cn("gap-base flex justify-end")}>
        {cancelButton}
        <SaveButton />
      </div>
    </Form>
  );
}
