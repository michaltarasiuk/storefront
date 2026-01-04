import {ROUTES} from "#app/consts/routes";
import {IntlLink} from "#app/i18n/components/IntlLink";
import {FormattedMessage} from "#app/i18n/react-intl";

import {SignUpForm} from "../_components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
      <IntlLink href={ROUTES.auth.signin}>
        <FormattedMessage
          id="JapGs4"
          defaultMessage="Already have an account? Sign in"
        />
      </IntlLink>
    </>
  );
}
