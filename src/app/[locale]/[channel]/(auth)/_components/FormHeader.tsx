import {Heading} from "#app/components/Heading";
import {TextBlock} from "#app/components/TextBlock";

export function FormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <Heading>{title}</Heading>
      <TextBlock appearance="subdued">{description}</TextBlock>
    </header>
  );
}
