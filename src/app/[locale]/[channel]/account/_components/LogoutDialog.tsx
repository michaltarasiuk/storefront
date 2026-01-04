import {Dialog, Modal} from "#app/components/Dialog";
import {Spinner} from "#app/components/Spinner";
import {Text} from "#app/components/Text";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

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
