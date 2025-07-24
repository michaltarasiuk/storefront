"use client";

import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
import {Form} from "@/components/Form";
import {IconButton} from "@/components/IconButton";
import {TextField} from "@/components/TextField";
import {useIntl} from "@/i18n/react-intl";
import {PenIcon} from "@/icons/PenIcon";
import {cn} from "@/utils/cn";

import {CancelButton} from "./CancelButton";
import {DialogHeader} from "./DialogHeader";
import {FullNameFieldset} from "./Fieldset";
import {SaveButton} from "./SaveButton";

export function EditProfileDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <IconButton
        aria-label={intl.formatMessage({
          id: "nYrKWp",
          defaultMessage: "Edit profile",
        })}
        className={cn("rounded-fully size-5.5")}>
        <PenIcon aria-hidden className={cn("stroke-base-accent")} />
      </IconButton>
      <Modal size="large" isDismissable>
        <Dialog className={cn("space-y-base")}>
          {({close}) => (
            <>
              <DialogHeader
                title={intl.formatMessage({
                  id: "nYrKWp",
                  defaultMessage: "Edit profile",
                })}
                onClose={close}
              />
              <ProfileForm cancelButton={<CancelButton onClick={close} />} />
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

function ProfileForm({cancelButton}: {cancelButton: React.ReactNode}) {
  const intl = useIntl();
  return (
    <Form className={cn("space-y-base")}>
      <FullNameFieldset />
      <TextField
        name="email"
        value="john.doe@example.com"
        type="email"
        placeholder={intl.formatMessage({
          id: "sy+pv5",
          defaultMessage: "Email",
        })}
        description={intl.formatMessage({
          id: "N1cjj/",
          defaultMessage: "Email used for login can't be changed",
        })}
        isDisabled
        isReadOnly
      />
      <div className={cn("gap-base flex justify-end")}>
        {cancelButton}
        <SaveButton />
      </div>
    </Form>
  );
}
