"use client";

import {Button} from "react-aria-components";

import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Form} from "@/components/Form";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {CancelButton} from "./CancelButton";
import {DeleteAddressDialog} from "./DeleteAddressDialog";
import {DialogHeader} from "./DialogHeader";
import {AddressFieldset} from "./Fieldset";
import {SaveButton} from "./SaveButton";

export function EditAddressDialog({children}: {children: React.ReactNode}) {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <Button
        className={cn(
          "group relative size-full cursor-pointer outline-none",
          "hover:before:bg-base-background-subdued",
          "before:-top-small-200 before:-start-small-200 before:rounded-base before:absolute before:inset-0 before:size-[calc(100%+(var(--spacing-small-200))*2)]",
        )}>
        <div
          className={cn(
            "relative z-10",
            "group-focus-visible:ring-base-accent group-focus-visible:ring-offset-base-background outline-none group-focus-visible:ring-2 group-focus-visible:ring-offset-2",
          )}>
          {children}
        </div>
      </Button>
      <Modal size="large" isDismissable>
        <Dialog className={cn("space-y-base")}>
          {({close}) => (
            <>
              <DialogHeader
                title={intl.formatMessage({
                  id: "ex+q9+",
                  defaultMessage: "Edit address",
                })}
                onClose={close}
              />
              <EditAddressForm
                cancelButton={<CancelButton onClick={close} />}
              />
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

function EditAddressForm({cancelButton}: {cancelButton: React.ReactNode}) {
  return (
    <Form className={cn("space-y-base")}>
      <AddressFieldset />
      <div className={cn("gap-base flex justify-between")}>
        <DeleteAddressDialog />
        <div className={cn("space-x-base")}>
          {cancelButton}
          <SaveButton />
        </div>
      </div>
    </Form>
  );
}
