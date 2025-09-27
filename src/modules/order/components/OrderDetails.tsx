import {Heading, SkeletonHeading} from "@/components/Heading";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

export function OrderDetails() {
  return (
    <section className={cn("p-base space-y-large-200")}>
      <Heading level={2}>
        <FormattedMessage id="NfwDx2" defaultMessage="Order details" />
      </Heading>
    </section>
  );
}

export function SkeletonOrderDetails() {
  return (
    <div className={cn("p-base space-y-large-200")}>
      <SkeletonHeading level={2} />
    </div>
  );
}
