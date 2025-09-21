import {Footer} from "@/components/Footer";
import {HeadingGroup} from "@/components/Heading";
import {LinkedLogo} from "@/components/LinkedLogo";
import {cn} from "@/utils/cn";

import {CheckoutBreadcrumbs} from "./_components/CheckoutBreadcrumbs";
import {
  CheckoutSummary,
  CheckoutSummaryDisclosure,
} from "./_components/CheckoutSummary";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default async function CheckoutLayout({children}: CheckoutLayoutProps) {
  return (
    <div
      className={cn(
        "grid min-h-dvh",
        "md:grid-cols-[calc(50%+var(--spacing-shell-section-columns-offset))_1fr]",
      )}>
      <div className={cn("bg-base-background")}>
        <div
          className={cn(
            "ms-auto flex h-full flex-col",
            "md:max-w-shell-main-inline-size md:px-large-500 md:pt-large-500",
          )}>
          <header className={cn("p-large-200 flex", "md:mb-large-200 md:p-0")}>
            <LinkedLogo />
          </header>
          <CheckoutSummaryDisclosure />
          <main
            className={cn(
              "p-large-200 space-y-large-300 mb-large-200 grow",
              "md:p-0",
            )}>
            <CheckoutBreadcrumbs />
            <HeadingGroup>{children}</HeadingGroup>
          </main>
          <Footer />
        </div>
      </div>
      <div className={cn("bg-base-background-subdued hidden", "md:block")}>
        <aside
          className={cn(
            "max-w-shell-order-summary-inline-size p-large-500 space-y-large-200",
          )}>
          <CheckoutSummary />
        </aside>
      </div>
    </div>
  );
}
