import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";

import {SigninForm} from "../_components/SigninForm";

interface SigninPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function SigninPage({searchParams}: SigninPageProps) {
  const {email} = await searchParams;
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
