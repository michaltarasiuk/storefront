import {Heading} from "#app/components/Heading";
import {cn} from "#app/utils/cn";

export function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("flex min-h-24 items-center justify-between py-6")}>
      <Heading>{title}</Heading>
      {children}
    </header>
  );
}
