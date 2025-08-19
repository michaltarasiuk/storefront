import {Footer} from "@/components/Footer";
import {HeadingGroup} from "@/components/Heading";
import {LinkedLogo} from "@/components/LinkedLogo";
import {OrderSummaryDisclosure} from "@/components/OrderSummaryDisclosure";
import {ProductList} from "@/components/ProductList";
import type {Locale} from "@/i18n/consts";
import {cn} from "@/utils/cn";

import {CheckoutAddPromoCodeForm} from "./_components/CheckoutAddPromoCodeForm";
import {CheckoutBreadcrumbs} from "./_components/CheckoutBreadcrumbs";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function CheckoutLayout({
  children,
  params,
}: CheckoutLayoutProps) {
  const {locale} = await params;
  return (
    <div
      className={cn(
        "grid min-h-dvh md:grid-cols-[calc(50%+var(--spacing-shell-section-columns-offset))_1fr]",
      )}>
      <div className={cn("bg-base-background")}>
        <div
          className={cn(
            "md:max-w-shell-main-inline-size md:px-large-500 md:pt-large-500 ms-auto",
          )}>
          <header className={cn("p-large-200 md:mb-large-200 flex md:p-0")}>
            <LinkedLogo locale={locale} />
          </header>
          <OrderSummaryDisclosure className={cn("md:hidden")} />
          <main
            className={cn("p-large-200 space-y-large-300 mb-large-200 md:p-0")}>
            <CheckoutBreadcrumbs />
            <HeadingGroup>{children}</HeadingGroup>
          </main>
          <Footer />
        </div>
      </div>
      <div className={cn("bg-base-background-subdued hidden md:block")}>
        <aside
          className={cn(
            "max-w-shell-order-summary-inline-size p-large-500 space-y-large-200",
          )}>
          <ProductList />
          <CheckoutAddPromoCodeForm />
        </aside>
      </div>
    </div>
  );
}
