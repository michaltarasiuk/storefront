import {Button} from "@/shared/components/Button";
import {Form} from "@/shared/components/Form";
import {TextField} from "@/shared/components/TextField";
import {cn} from "@/shared/utils/cn";

import {FormHeader} from "./FormHeader";

export function SigninForm() {
  return (
    <Form className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title="Sign in"
        description="Please enter your email and password to access your account"
      />
      <TextField type="email" name="email" label="Email" />
      <TextField
        type="password"
        name="password"
        label="Password"
        autoComplete="current-password"
      />
      <Button>Sign in</Button>
    </Form>
  );
}
