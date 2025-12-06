import {IntlLink} from "#app/i18n/components/IntlLink";
import {ChevronLeftIcon} from "#app/icons/ChevronLeftIcon";
import {cn} from "#app/utils/cn";

type ReturnLinkProps = React.ComponentProps<typeof IntlLink>;

export function ReturnLink({children, ...props}: ReturnLinkProps) {
  return (
    <IntlLink
      {...props}
      className={cn(
        props.className,
        "gap-small-200 flex items-center justify-center",
      )}>
      {(renderProps) => (
        <>
          <ChevronLeftIcon aria-hidden className={cn("stroke-base-accent")} />
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </IntlLink>
  );
}
