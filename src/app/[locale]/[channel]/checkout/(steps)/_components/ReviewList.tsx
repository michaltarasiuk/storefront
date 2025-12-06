import {SkeletonText, Text} from "#app/components/Text";
import {IntlLink} from "#app/i18n/components/IntlLink";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

export function ReviewList({children}: {children: React.ReactNode}) {
  return (
    <div className={cn("rounded-base border-base-border px-large-100 border")}>
      {children}
    </div>
  );
}

interface ReviewItemProps {
  label: string;
  children: React.ReactNode;
  href: string;
}

export function ReviewItem({label, children, href}: ReviewItemProps) {
  return (
    <div
      className={cn(
        "py-small-100 gap-base flex items-start",
        "not-last:border-base-border not-last:border-b",
      )}>
      <div className={cn("flex flex-1 flex-col")}>
        <Text appearance="subdued">{label}</Text>
        {children}
      </div>
      <IntlLink href={href} className={cn("underline underline-offset-2")}>
        <FormattedMessage id="BY343C" defaultMessage="Change" />
      </IntlLink>
    </div>
  );
}

export function SkeletonReviewList({children}: {children: React.ReactNode}) {
  return (
    <div className={cn("rounded-base border-base-border px-large-100 border")}>
      {children}
    </div>
  );
}

export function SkeletonReviewItem() {
  return (
    <div
      className={cn(
        "py-small-100 gap-base flex items-start",
        "not-last:border-base-border not-last:border-b",
      )}>
      <div className={cn("flex-1")}>
        <SkeletonText inlineSize="small" />
        <SkeletonText />
      </div>
      <SkeletonText inlineSize="small" />
    </div>
  );
}
