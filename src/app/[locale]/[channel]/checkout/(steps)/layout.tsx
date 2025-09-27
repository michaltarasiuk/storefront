import {HeadingGroup} from "@/components/Heading";

import {CheckoutBreadcrumbs} from "./_components/CheckoutBreadcrumbs";

export default function CheckoutStepsLayout({
  children,
}: LayoutProps<"/[locale]/[channel]/checkout">) {
  return (
    <>
      <CheckoutBreadcrumbs />
      <HeadingGroup>{children}</HeadingGroup>
    </>
  );
}
