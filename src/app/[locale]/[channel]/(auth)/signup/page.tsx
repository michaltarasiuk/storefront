import {routes} from "#app/consts/routes";
import {IntlLink} from "#app/i18n/components/IntlLink";
import {FormattedMessage} from "#app/i18n/react-intl";

import {SignupForm} from "../_components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <IntlLink href={routes.account.signin}>
        <FormattedMessage
          id="JapGs4"
          defaultMessage="Already have an account? Sign in"
        />
      </IntlLink>
    </>
  );
}
