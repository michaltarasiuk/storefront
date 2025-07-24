import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";

import {SigninForm} from "../_components/SigninForm";

export default function SigninPage() {
  return (
    <>
      <SigninForm />
      <IntlLink href={Routes.signup}>
        <FormattedMessage
          id="jq3zbE"
          defaultMessage="Don't have an account? Sign up"
        />
      </IntlLink>
    </>
  );
}
