import {Text} from "@/components/Text";
import {cn} from "@/utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "p-large-200 rounded-large bg-base-background gap-base flex flex-col",
        className,
      )}>
      {children}
    </section>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "gap-small-200 flex items-center justify-between md:justify-start",
        className,
      )}>
      {children}
    </header>
  );
}

export function CardTitle({children}: {children: React.ReactNode}) {
  return <Text emphasis="semibold">{children}</Text>;
}
