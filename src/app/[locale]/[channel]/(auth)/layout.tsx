import {LinkedLogo} from "@/components/LinkedLogo";
import type {Locale} from "@/i18n/consts";
import {cn} from "@/utils/cn";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function AuthLayout({children, params}: AuthLayoutProps) {
  const {locale} = await params;
  return (
    <div
      className={cn(
        "bg-base-background-subdued flex h-dvh items-center justify-center",
      )}>
      <main
        className={cn(
          "gap-large-200 p-large-500 px-large-200 bg-base-background flex h-full w-full flex-col justify-center",
          "sm:p-large-500 sm:rounded-large sm:h-auto sm:w-auto sm:basis-md",
        )}>
        <div className="mx-auto">
          <LinkedLogo locale={locale} />
        </div>
        {children}
      </main>
    </div>
  );
}
