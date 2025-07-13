import {Dialog, Modal} from "@/shared/components/Dialog";
import {Text} from "@/shared/components/Text";
import {cn} from "@/shared/utils/cn";

export function LogoutDialog({isOpen}: {isOpen?: boolean}) {
  return (
    <Modal isOpen={isOpen} size="auto">
      <Dialog className={cn("flex items-center justify-center")}>
        <Text>Logging you out...</Text>
      </Dialog>
    </Modal>
  );
}
