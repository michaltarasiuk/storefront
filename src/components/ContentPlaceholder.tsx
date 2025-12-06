import {cn} from "#app/utils/cn";

import {Text} from "./Text";

export function ContentPlaceholder({className}: {className?: string}) {
  return (
    <div
      className={cn(
        "rounded-base border-base-accent p-base flex h-full items-center justify-center border-2 border-dashed",
        className,
      )}>
      <Text appearance="accent">Content</Text>
    </div>
  );
}
