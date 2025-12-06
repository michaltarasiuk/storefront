import {Footer} from "#app/components/Footer";
import {LinkedLogo} from "#app/components/LinkedLogo";
import {cn} from "#app/utils/cn";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  summary: React.ReactNode;
}

export function CheckoutLayout({children, summary}: CheckoutLayoutProps) {
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
          <div className={cn("md:hidden")}>{summary}</div>
          <main
            className={cn(
              "p-large-200 space-y-large-300 mb-0 grow",
              "md:mb-large-200 md:p-0",
            )}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <div className={cn("bg-base-background-subdued hidden", "md:block")}>
        <aside
          className={cn(
            "max-w-shell-order-summary-inline-size p-large-500 space-y-large-200 sticky top-0",
          )}>
          {summary}
        </aside>
      </div>
    </div>
  );
}
