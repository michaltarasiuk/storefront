import {Button} from "#app/components/Button";
import {FormattedMessage} from "#app/i18n/react-intl";

export function CancelButton({onPress}: {onPress: () => void}) {
  return (
    <Button kind="plain" onPress={onPress}>
      <FormattedMessage id="47FYwb" defaultMessage="Cancel" />
    </Button>
  );
}
