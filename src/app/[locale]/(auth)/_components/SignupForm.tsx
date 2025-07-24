import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {FormattedMessage} from "@/i18n/react-intl";
import {getIntl} from "@/i18n/utils/get-intl";
import {cn} from "@/utils/cn";

import {FormHeader} from "./FormHeader";

export async function SignupForm() {
  const intl = await getIntl();
  return (
    <Form className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title={intl.formatMessage({
          id: "8HJxXG",
          defaultMessage: "Sign up",
        })}
        description={intl.formatMessage({
          id: "p99EyA",
          defaultMessage:
            "Create your account by entering your email and a password",
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
        autoComplete="new-password"
      />
      <Button>
        <FormattedMessage id="8HJxXG" defaultMessage="Sign up" />
      </Button>
    </Form>
  );
}
