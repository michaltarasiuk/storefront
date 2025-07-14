import {Button} from "@/components/Button";
import {Heading} from "@/components/Heading";
import {IconLink} from "@/components/IconButton";
import {Text} from "@/components/Text";
import {Routes} from "@/consts/routes";
import {ArrowLeft} from "@/icons/ArrowLeft";
import {cn} from "@/utils/cn";

export function OrderHeader() {
  return (
    <header className={cn("flex flex-col justify-between md:flex-row")}>
      <PageTitle />
      <OrderActions />
    </header>
  );
}

function PageTitle() {
  return (
    <div
      className={cn(
        "my-large-300 gap-x-small-300 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
        "[grid-template-areas:'back_heading'_'empty_date']",
      )}>
      <IconLink
        aria-label="Go back to orders"
        href={Routes.orders}
        className={cn("size-6 rounded-full [grid-area:back]")}>
        <ArrowLeft aria-hidden />
      </IconLink>
      <Heading className={cn("[grid-area:heading]")}>Order #1013</Heading>
      <Text appearance="subdued" className={cn("[grid-area:date]")}>
        <time dateTime="2024-10-14">Oct 14</time>
      </Text>
    </div>
  );
}

function OrderActions() {
  return (
    <div
      aria-label="Order actions"
      className={cn("gap-base flex flex-col md:flex-row md:items-center")}>
      <Button kind="secondary">Buy again</Button>
      <Button kind="secondary">Manage</Button>
    </div>
  );
}
