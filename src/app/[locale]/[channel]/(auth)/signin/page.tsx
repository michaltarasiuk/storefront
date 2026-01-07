import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {IntlLink} from "#app/i18n/components/IntlLink";
import {FormattedMessage} from "#app/i18n/react-intl";

import {SignInForm} from "../_components/SignInForm";

export default async function SignInPage({
  searchParams,
}: PageProps<"/[locale]/[channel]/signin">) {
  const {email} = SearchParamsSchema.parse(await searchParams);
  return (
    <>
      <SignInForm defaultEmail={email} />
      <IntlLink href={ROUTES.auth.signup}>
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
