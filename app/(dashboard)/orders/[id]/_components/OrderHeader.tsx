import {Button} from "@/shared/components/Button";
import {Heading} from "@/shared/components/Heading";
import {IconLink} from "@/shared/components/IconButton";
import {Text} from "@/shared/components/Text";
import {Routes} from "@/shared/consts/routes";
import {ArrowLeft} from "@/shared/icons/ArrowLeft";
import {cn} from "@/shared/utils/cn";

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
    <hgroup
      className={cn(
        "my-large-300 gap-x-small-300 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
        "[grid-template-areas:'back_heading'_'empty_date']",
      )}>
      <nav className={cn("[grid-area:back]")}>
        <IconLink
          aria-label="Go back to orders"
          href={Routes.orders}
          className={cn("size-6 rounded-full")}>
          <ArrowLeft aria-hidden />
        </IconLink>
      </nav>
      <Heading className={cn("[grid-area:heading]")}>Order #1013</Heading>
      <Text appearance="subdued" className={cn("[grid-area:date]")}>
        <time dateTime="2024-10-14">Oct 14</time>
      </Text>
    </hgroup>
  );
}

function OrderActions() {
  return (
    <section
      aria-label="Order actions"
      className={cn("gap-base flex flex-col md:flex-row md:items-center")}>
      <Button kind="secondary" type="button">
        Buy again
      </Button>
      <Button kind="secondary" type="button">
        Manage
      </Button>
    </section>
  );
}
