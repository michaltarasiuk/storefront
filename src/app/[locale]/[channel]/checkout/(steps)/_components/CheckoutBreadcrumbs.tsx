"use client";

import {usePathname} from "next/navigation";

import {BreadcrumbLink, Breadcrumbs} from "#app/components/Breadcrumbs";
import {ROUTES} from "#app/consts/routes";
import {usePathnameParams} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";
import {joinPathname} from "#app/utils/pathname";

type BreadcrumbLinkProps = React.ComponentProps<typeof BreadcrumbLink>;

export function CheckoutBreadcrumbs() {
  const pathname = usePathname();
  const [locale, channel] = usePathnameParams();
  const pathWithoutLocaleAndChannel = pathname
    .replace(joinPathname(locale), "")
    .replace(joinPathname(channel), "");
  const isReviewPage = ROUTES.checkout.review === pathWithoutLocaleAndChannel;
  function getBreadcrumbLinkProps(href: string): BreadcrumbLinkProps {
    return {
      href,
      isDisabled:
        getBreadcrumbIndex(href) >
        getBreadcrumbIndex(pathWithoutLocaleAndChannel),
    };
  }
  return (
    <Breadcrumbs>
      <BreadcrumbLink {...getBreadcrumbLinkProps(ROUTES.cart)}>
        <FormattedMessage id="2tqQFl" defaultMessage="Cart" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(ROUTES.checkout.information)}>
        <FormattedMessage id="E80WrK" defaultMessage="Information" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(ROUTES.checkout.delivery)}>
        <FormattedMessage id="drqP2L" defaultMessage="Delivery" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(ROUTES.checkout.billing)}>
        <FormattedMessage id="Tbo377" defaultMessage="Billing" />
      </BreadcrumbLink>
      {isReviewPage && (
        <BreadcrumbLink href={ROUTES.checkout.review}>
          <FormattedMessage id="R+J5ox" defaultMessage="Review" />
        </BreadcrumbLink>
      )}
    </Breadcrumbs>
  );
}

function getBreadcrumbIndex(href: string): number {
  switch (href) {
    case ROUTES.cart:
      return 0;
    case ROUTES.checkout.information:
      return 1;
    case ROUTES.checkout.delivery:
      return 2;
    case ROUTES.checkout.billing:
      return 3;
    case ROUTES.checkout.review:
      return 4;
    default:
      return -1;
  }
}
