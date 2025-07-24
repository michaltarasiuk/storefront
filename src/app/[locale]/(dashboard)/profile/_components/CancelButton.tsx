import {Button} from "@/components/Button";
import {FormattedMessage} from "@/i18n/react-intl";

export function CancelButton({onClick}: {onClick: () => void}) {
  return (
    <Button kind="plain" onClick={onClick}>
      <FormattedMessage id="47FYwb" defaultMessage="Cancel" />
    </Button>
  );
}
