import {Dialog, Modal} from "@/components/Dialog";
import {Text} from "@/components/Text";
import {cn} from "@/utils/cn";

export function LogoutDialog({isOpen}: {isOpen?: boolean}) {
  return (
    <Modal isOpen={isOpen} size="auto">
      <Dialog className={cn("flex items-center justify-center")}>
        <Text>Logging you out...</Text>
      </Dialog>
    </Modal>
  );
}
