"use client";

import {Dialog, DialogTrigger, Modal} from "#app/components/Dialog";
import {Form} from "#app/components/Form";
import {IconButton} from "#app/components/IconButton";
import {TextField} from "#app/components/TextField";
import {useIntl} from "#app/i18n/react-intl";
import {PenIcon} from "#app/icons/PenIcon";
import {cn} from "#app/utils/cn";

import {CancelButton} from "./CancelButton";
import {SaveButton} from "./SaveButton";

export function EditProfileDialog() {
  const intl = useIntl();
  return (
    <DialogTrigger>
      <IconButton className={cn("rounded-fully size-5.5")}>
        <PenIcon aria-hidden className={cn("stroke-base-accent")} />
      </IconButton>
      <Modal size="large" isDismissable>
        <Dialog
          heading={intl.formatMessage({
            id: "nYrKWp",
            defaultMessage: "Edit profile",
          })}>
          {({close}) => (
            <ProfileForm cancelButton={<CancelButton onPress={close} />} />
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
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="firstName"
          label={intl.formatMessage({
            id: "pONqz8",
            defaultMessage: "First name",
          })}
        />
        <TextField
          name="lastName"
          label={intl.formatMessage({
            id: "txUL0F",
            defaultMessage: "Last name",
          })}
        />
      </div>
      <TextField
        name="email"
        value="john.doe@example.com"
        type="email"
        label={intl.formatMessage({
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
