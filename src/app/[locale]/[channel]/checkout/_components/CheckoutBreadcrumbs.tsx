"use client";

import {usePathname} from "next/navigation";
import type {BreadcrumbsProps} from "react-aria-components";

import {Breadcrumbs} from "@/components/Breadcrumbs";
import {Routes} from "@/consts/routes";
import {useBasePath} from "@/hooks/use-base-path";
import {useIntl} from "@/i18n/react-intl";
import {joinPathSegments} from "@/utils/pathname";

type BreadcrumbItem =
  React.ComponentProps<typeof Breadcrumbs> extends BreadcrumbsProps<infer T>
    ? T
    : never;

export function CheckoutBreadcrumbs() {
  const pathname = usePathname();
  const basePath = useBasePath();
  const intl = useIntl();
  const items = getBreadcrumbItems();
  const currentItemIndex = items.findIndex(
    (item) => joinPathSegments(...basePath, item.href) === pathname,
  );
  return (
    <Breadcrumbs
      key={pathname}
      items={items.map((item, i) => ({
        ...item,
        isDisabled: i > currentItemIndex,
      }))}
    />
  );
  function getBreadcrumbItems() {
    return [
      {
        id: Routes.cart,
        href: Routes.cart,
        label: intl.formatMessage({
          id: "2tqQFl",
          defaultMessage: "Cart",
        }),
      },
      {
        id: Routes.checkout.information,
        href: Routes.checkout.information,
        label: intl.formatMessage({
          id: "E80WrK",
          defaultMessage: "Information",
        }),
      },
      {
        id: Routes.checkout.delivery,
        href: Routes.checkout.delivery,
        label: intl.formatMessage({
          id: "drqP2L",
          defaultMessage: "Delivery",
        }),
      },
      {
        id: Routes.checkout.billing,
        href: Routes.checkout.billing,
        label: intl.formatMessage({
          id: "Tbo377",
          defaultMessage: "Billing",
        }),
      },
    ] satisfies BreadcrumbItem[];
  }
}
