import {Text} from "#app/components/Text";
import {cn} from "#app/utils/cn";

export function Section({children}: {children: React.ReactNode}) {
  return (
    <section
      className={cn(
        "p-large-200 rounded-large bg-base-background gap-base flex flex-col",
      )}>
      {children}
    </section>
  );
}

export function SectionHeader({children}: {children: React.ReactNode}) {
  return (
    <header
      className={cn(
        "gap-small-200 flex items-center justify-between",
        "md:justify-start",
      )}>
      {children}
    </header>
  );
}

export function SectionTitle({children}: {children: React.ReactNode}) {
  return <Text emphasis="semibold">{children}</Text>;
}
