import {SkeletonText} from "@/components/Text";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

interface ReviewListProps {
  children: React.ReactNode;
}

export function ReviewList({children}: ReviewListProps) {
  return (
    <dl
      className={cn("rounded-base border-control-border px-large-100 border")}>
      {children}
    </dl>
  );
}

interface ReviewTermProps {
  label: string;
  children: React.ReactNode;
  href: string;
}

export function ReviewTerm({label, children, href}: ReviewTermProps) {
  return (
    <div
      className={cn(
        "py-small-100 gap-base flex items-start",
        "not-last:border-control-border not-last:border-b",
      )}>
      <div className={cn("flex-1")}>
        <dt
          className={cn(
            text({
              appearance: "subdued",
            }),
          )}>
          {label}
        </dt>
        <dd className={cn("gap-small-300 flex")}>{children}</dd>
      </div>
      <IntlLink href={href} className={cn("underline underline-offset-2")}>
        <FormattedMessage id="BY343C" defaultMessage="Change" />
      </IntlLink>
    </div>
  );
}

export function SkeletonReviewList({children}: ReviewListProps) {
  return (
    <dl className={cn("rounded-base border-base-border px-large-100 border")}>
      {children}
    </dl>
  );
}

export function SkeletonReviewTerm() {
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
