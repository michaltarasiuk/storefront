import {Footer} from "#app/components/Footer";
import {cn} from "#app/utils/cn";

import {Header} from "./_components/Header";

export default async function AccountLayout({
  children,
}: LayoutProps<"/[locale]/[channel]">) {
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
