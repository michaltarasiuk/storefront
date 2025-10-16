import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";

import {SignupForm} from "../_components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <IntlLink href={Routes.account.signin}>
        <FormattedMessage
          id="JapGs4"
          defaultMessage="Already have an account? Sign in"
        />
      </IntlLink>
    </>
  );
}
