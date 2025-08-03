"use client";

import {useSearchParams} from "next/navigation";
import {Suspense} from "react";

import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {isDefined} from "@/utils/is-defined";

import {SigninForm} from "../_components/SigninForm";

export default function SigninPage() {
  return (
    <>
      <Suspense fallback={<SigninForm />}>
        <SigninFormWithParams />
      </Suspense>
      <IntlLink href={Routes.signup}>
        <FormattedMessage
          id="jq3zbE"
          defaultMessage="Don't have an account? Sign up"
        />
      </IntlLink>
    </>
  );
}

function SigninFormWithParams() {
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email");
  return <SigninForm {...(isDefined(defaultEmail) && {defaultEmail})} />;
}
