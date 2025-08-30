"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Heading, SkeletonHeading} from "@/components/Heading";
import {SkeletonInput} from "@/components/Input";
import {TextField} from "@/components/TextField";
import {graphql} from "@/graphql/codegen";
import type {CheckoutContactSection_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

const CheckoutContactSection_CheckoutFragment = graphql(`
  fragment CheckoutContactSection_Checkout on Checkout {
    id
    email
  }
`);

interface CheckoutContactSectionProps {
  checkout: FragmentType<CheckoutContactSection_CheckoutFragment>;
}

export function CheckoutContactSection({
  checkout,
}: CheckoutContactSectionProps) {
  const {data} = useFragment({
    fragment: CheckoutContactSection_CheckoutFragment,
    from: checkout,
  });
  const intl = useIntl();
  return (
    <section className={cn("space-y-base")}>
      <Heading>
        <FormattedMessage id="zFegDD" defaultMessage="Contact" />
      </Heading>
      <TextField
        name="email"
        type="email"
        defaultValue={data?.email ?? undefined}
        label={intl.formatMessage({
          id: "KinTIy",
          defaultMessage: "Enter email",
        })}
        isRequired
      />
    </section>
  );
}

export function SkeletonContactSection() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonInput />
    </div>
  );
}
