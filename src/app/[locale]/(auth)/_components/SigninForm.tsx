import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {cn} from "@/utils/cn";

import {FormHeader} from "./FormHeader";

export async function SigninForm() {
  const intl = await getIntl();
  return (
    <Form className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title={intl.formatMessage({
          id: "SQJto2",
          defaultMessage: "Sign in",
        })}
        description={intl.formatMessage({
          id: "rFxf+e",
          defaultMessage:
            "Please enter your email and password to access your account",
        })}
      />
      <TextField
        type="email"
        name="email"
        placeholder={intl.formatMessage({
          id: "sy+pv5",
          defaultMessage: "Email",
        })}
      />
      <TextField
        type="password"
        name="password"
        placeholder={intl.formatMessage({
          id: "5sg7KC",
          defaultMessage: "Password",
        })}
        autoComplete="current-password"
      />
      <Button>
        <FormattedMessage id="SQJto2" defaultMessage="Sign in" />
      </Button>
    </Form>
  );
}
