import {Button} from "@/shared/components/Button";
import {Text} from "@/shared/components/Text";
import {SuccessIcon} from "@/shared/icons/SuccessIcon";
import {cn} from "@/shared/utils/cn";

export function OrderCard() {
  return (
    <article
      className={cn(
        "bg-base-background p-large-200 rounded-large",
        "gap-large-200 flex flex-col",
      )}>
      <header className={cn("bg-base-background-subdued rounded-base p-5")}>
        <div
          className={cn(
            "grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-1.5",
            "[grid-template-areas:'icon_status'_'empty_updated']",
          )}>
          <SuccessIcon
            aria-hidden
            className={cn("stroke-base-text [grid-area:icon]")}
          />
          <Text
            emphasis="semibold"
            className={cn("[grid-area:status]")}
            role="status"
            aria-live="polite">
            Confirmedo2
          </Text>
          <Text className={cn("[grid-area:updated]")}>
            <time dateTime="2024-10-17">Updated Oct 17</time>
          </Text>
        </div>
      </header>
      <div className={cn("flex flex-col")}>
        <Text emphasis="semibold">3 items</Text>
        <Text appearance="subdued">Order #1014</Text>
      </div>
      <Text emphasis="semibold">$75.55</Text>
      <footer className={cn("grid grid-cols-2 gap-3.5")}>
        <Button>Pay now</Button>
        <Button kind="secondary">Manage</Button>
      </footer>
    </article>
  );
}
