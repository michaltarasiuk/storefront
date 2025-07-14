import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {cn} from "@/utils/cn";

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
