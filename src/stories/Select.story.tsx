import type {Meta, StoryObj} from "@storybook/nextjs-vite";

import {Select, SelectItem} from "#app/components/Select";
import {CountryCode} from "#app/graphql/codegen/graphql";

const Countries = [
  CountryCode.Us,
  CountryCode.Ca,
  CountryCode.Gb,
  CountryCode.De,
  CountryCode.Fr,
].map((code) => ({
  code,
  country: new Intl.DisplayNames(["en"], {type: "region"}).of(code),
}));

function SelectStory(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      {Countries.map(({code, country}) => (
        <SelectItem key={code} id={code} textValue={country}>
          {country}
        </SelectItem>
      ))}
    </Select>
  );
}

const meta = {
  component: SelectStory,
  argTypes: {
    description: {
      control: "text",
    },
    defaultOpen: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    autoFocus: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof SelectStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Select",
  args: {
    label: "Label",
  },
};
