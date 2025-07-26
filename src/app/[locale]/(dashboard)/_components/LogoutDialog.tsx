import {Dialog, Modal} from "@/components/Dialog";
import {Spinner} from "@/components/Spinner";
import {Text} from "@/components/Text";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

export function LogoutDialog({isOpen}: {isOpen?: boolean}) {
  return (
    <Modal isOpen={isOpen} size="auto">
      <Dialog
        className={cn("gap-base flex flex-col items-center justify-center")}>
        <Spinner size="large" />
        <Text>
          <FormattedMessage id="A82IFk" defaultMessage="Logging you out..." />
        </Text>
      </Dialog>
    </Modal>
  );
}
