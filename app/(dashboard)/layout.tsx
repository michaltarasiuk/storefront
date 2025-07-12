import {cn} from "@/shared/utils/cn";

import {Footer} from "./_components/Footer";
import {Header} from "./_components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col")}>
      <div className={cn("bg-base-background px-large-200")}>
        <Header />
      </div>
      <div className={cn("bg-base-background-subdued px-large-200 grow")}>
        <main className={cn("mx-auto max-w-6xl")}>{children}</main>
      </div>
      <div className={cn("bg-base-background-subdued px-large-200")}>
        <Footer />
      </div>
    </div>
  );
}
