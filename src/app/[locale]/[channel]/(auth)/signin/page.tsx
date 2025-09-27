import * as z from "zod";

import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";

import {SigninForm} from "../_components/SigninForm";

export default async function SigninPage({
  searchParams,
}: PageProps<"/[locale]/[channel]/signin">) {
  const {email} = SearchParamsSchema.parse(await searchParams);
  return (
    <>
      <SigninForm defaultEmail={email} />
      <IntlLink href={Routes.account.signup}>
        <FormattedMessage
          id="jq3zbE"
          defaultMessage="Don't have an account? Sign up"
        />
      </IntlLink>
    </>
  );
}

const SearchParamsSchema = z.object({
  email: z.preprocess(
    (value) => (typeof value === "string" ? value : undefined),
    z.union([z.string(), z.undefined()]),
  ),
});
