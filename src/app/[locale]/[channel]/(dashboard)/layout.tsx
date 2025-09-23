import {Footer} from "@/components/Footer";
import {cn} from "@/utils/cn";

import {Header} from "./_components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col")}>
      <Header />
      <main className={cn("bg-base-background-subdued px-large-200 grow")}>
        <div className={cn("mb-large-500 mx-auto max-w-6xl")}>{children}</div>
      </main>
      <Footer variant="subdued" />
    </div>
  );
}
