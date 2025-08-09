import {Button} from "@/components/Button";
import {Heading} from "@/components/Heading";
import {IconLink} from "@/components/IconButton";
import {Text} from "@/components/Text";
import {Routes} from "@/consts/routes";
import type {Locale} from "@/i18n/consts";
import {FormattedDate, FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {ArrowLeft} from "@/icons/ArrowLeftIcon";
import {cn} from "@/utils/cn";

export async function OrderHeader({locale}: {locale: Locale}) {
  const intl = await getIntl(locale);
  return (
    <header className={cn("flex flex-col justify-between md:flex-row")}>
      <div
        className={cn(
          "my-large-300 gap-x-small-300 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
          "[grid-template-areas:'back_heading'_'empty_date']",
        )}>
        <IconLink
          href={Routes.orders}
          aria-label={intl.formatMessage({
            id: "4uRlnn",
            defaultMessage: "Go back to orders",
          })}
          className={cn("size-6 rounded-full [grid-area:back]")}>
          <ArrowLeft aria-hidden />
        </IconLink>
        <Heading className={cn("[grid-area:heading]")}>
          <FormattedMessage
            id="I4Qr0O"
            defaultMessage="Order #{number}"
            values={{number: "1013"}}
          />
        </Heading>
        <Text appearance="subdued" className={cn("[grid-area:date]")}>
          <FormattedDate value={new Date()} month="short" day="numeric" />
        </Text>
      </div>
      <div className={cn("gap-base flex flex-col md:flex-row md:items-center")}>
        <Button kind="secondary">
          <FormattedMessage id="427Jxb" defaultMessage="Buy again" />
        </Button>
        <Button kind="secondary">
          <FormattedMessage id="0Azlrb" defaultMessage="Manage" />
        </Button>
      </div>
    </header>
  );
}
