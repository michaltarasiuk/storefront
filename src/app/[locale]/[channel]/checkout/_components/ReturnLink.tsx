import {IntlLink} from "@/i18n/components/IntlLink";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";

interface ReturnLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ReturnLink({href, children}: ReturnLinkProps) {
  return (
    <IntlLink href={href}>
      <ChevronLeftIcon aria-hidden className={cn("stroke-base-accent")} />
      {children}
    </IntlLink>
  );
}
