import {Heading} from "@/components/Heading";
import {TextBlock} from "@/components/Text";

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
