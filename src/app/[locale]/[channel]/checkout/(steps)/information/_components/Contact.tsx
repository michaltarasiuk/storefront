"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Heading, SkeletonHeading} from "@/components/Heading";
import {SkeletonInput} from "@/components/Input";
import {TextField} from "@/components/TextField";
import {graphql} from "@/graphql/codegen";
import type {Contact_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

const Contact_CheckoutFragment = graphql(`
  fragment Contact_Checkout on Checkout {
    id
    email
  }
`);

interface ContactProps {
  checkout: FragmentType<Contact_CheckoutFragment>;
}

export function Contact({checkout}: ContactProps) {
  const {data, complete} = useFragment({
    fragment: Contact_CheckoutFragment,
    from: checkout,
  });
  const intl = useIntl();
  if (!complete) {
    return <SkeletonContact />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading>
        <FormattedMessage id="zFegDD" defaultMessage="Contact" />
      </Heading>
      <TextField
        name="email"
        type="email"
        defaultValue={data.email ?? undefined}
        label={intl.formatMessage({
          id: "N/nrM1",
          defaultMessage: "Email or phone number",
        })}
        isRequired
      />
    </section>
  );
}

export function SkeletonContact() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonInput />
    </div>
  );
}
