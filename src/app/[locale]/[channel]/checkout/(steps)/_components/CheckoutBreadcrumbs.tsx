"use client";

import {usePathname} from "next/navigation";

import {BreadcrumbLink, Breadcrumbs} from "#app/components/Breadcrumbs";
import {routes} from "#app/consts/routes";
import {useBasePathname} from "#app/hooks/use-base-pathname";
import {FormattedMessage} from "#app/i18n/react-intl";
import {joinPathSegments} from "#app/utils/pathname";

type BreadcrumbLinkProps = React.ComponentProps<typeof BreadcrumbLink>;

export function CheckoutBreadcrumbs() {
  const pathname = usePathname();
  const [locale, channel] = useBasePathname();
  const pathWithoutLocaleAndChannel = pathname
    .replace(joinPathSegments(locale), "")
    .replace(joinPathSegments(channel), "");
  const isReviewPage = routes.checkout.review === pathWithoutLocaleAndChannel;
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
      <BreadcrumbLink {...getBreadcrumbLinkProps(routes.cart)}>
        <FormattedMessage id="2tqQFl" defaultMessage="Cart" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(routes.checkout.information)}>
        <FormattedMessage id="E80WrK" defaultMessage="Information" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(routes.checkout.delivery)}>
        <FormattedMessage id="drqP2L" defaultMessage="Delivery" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(routes.checkout.billing)}>
        <FormattedMessage id="Tbo377" defaultMessage="Billing" />
      </BreadcrumbLink>
      {isReviewPage && (
        <BreadcrumbLink href={routes.checkout.review}>
          <FormattedMessage id="R+J5ox" defaultMessage="Review" />
        </BreadcrumbLink>
      )}
    </Breadcrumbs>
  );
}

function getBreadcrumbIndex(href: string): number {
  switch (href) {
    case routes.cart:
      return 0;
    case routes.checkout.information:
      return 1;
    case routes.checkout.delivery:
      return 2;
    case routes.checkout.billing:
      return 3;
    case routes.checkout.review:
      return 4;
    default:
      return -1;
  }
}
