import {Button} from "@/components/Button";

export function CancelButton({onClick}: {onClick: () => void}) {
  return (
    <Button kind="plain" onClick={onClick}>
      Cancel
    </Button>
  );
}
