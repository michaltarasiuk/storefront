import {LogoLink} from "@/components/LogoLink";
import {cn} from "@/utils/cn";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "bg-base-background-subdued h-dvh",
      )}>
      <main
        className={cn(
          "gap-large-200 flex flex-col justify-center",
          "h-full w-full sm:h-auto sm:w-auto sm:basis-md",
          "p-large-500 px-large-200 sm:p-large-500",
          "bg-base-background sm:rounded-large",
        )}>
        <div className={cn("mx-auto")}>
          <LogoLink />
        </div>
        {children}
      </main>
    </div>
  );
}
