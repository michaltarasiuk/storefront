import {Footer} from "@/components/Footer";
import type {Locale} from "@/i18n/consts";
import {cn} from "@/utils/cn";

import {Header} from "./_components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const {locale} = await params;
  return (
    <div className={cn("flex min-h-dvh flex-col")}>
      <Header locale={locale} />
      <main className={cn("bg-base-background-subdued px-large-200 grow")}>
        <div className={cn("mx-auto max-w-6xl")}>{children}</div>
      </main>
      <Footer variant="subdued" />
    </div>
  );
}
