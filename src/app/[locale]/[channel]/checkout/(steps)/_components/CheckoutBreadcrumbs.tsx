"use client";

import {usePathname} from "next/navigation";

import {BreadcrumbLink, Breadcrumbs} from "#app/components/Breadcrumbs";
import {Routes} from "#app/consts/routes";
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
  const isReviewPage = Routes.checkout.review === pathWithoutLocaleAndChannel;
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
      <BreadcrumbLink {...getBreadcrumbLinkProps(Routes.cart)}>
        <FormattedMessage id="2tqQFl" defaultMessage="Cart" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(Routes.checkout.information)}>
        <FormattedMessage id="E80WrK" defaultMessage="Information" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(Routes.checkout.delivery)}>
        <FormattedMessage id="drqP2L" defaultMessage="Delivery" />
      </BreadcrumbLink>
      <BreadcrumbLink {...getBreadcrumbLinkProps(Routes.checkout.billing)}>
        <FormattedMessage id="Tbo377" defaultMessage="Billing" />
      </BreadcrumbLink>
      {isReviewPage && (
        <BreadcrumbLink href={Routes.checkout.review}>
          <FormattedMessage id="R+J5ox" defaultMessage="Review" />
        </BreadcrumbLink>
      )}
    </Breadcrumbs>
  );
}

function getBreadcrumbIndex(href: string): number {
  switch (href) {
    case Routes.cart:
      return 0;
    case Routes.checkout.information:
      return 1;
    case Routes.checkout.delivery:
      return 2;
    case Routes.checkout.billing:
      return 3;
    case Routes.checkout.review:
      return 4;
    default:
      return -1;
  }
}
