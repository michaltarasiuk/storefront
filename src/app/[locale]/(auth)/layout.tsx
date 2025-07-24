import {LogoLink} from "@/components/LogoLink";
import {cn} from "@/utils/cn";

export default function AuthLayout({children}: {children: React.ReactNode}) {
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
          <LogoLink />
        </div>
        {children}
      </main>
    </div>
  );
}
