import {Button} from "@/shared/components/Button";
import {Form} from "@/shared/components/Form";
import {TextField} from "@/shared/components/TextField";
import {cn} from "@/shared/utils/cn";

import {FormHeader} from "./FormHeader";

export function SignupForm() {
  return (
    <Form className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title="Sign up"
        description="Create your account by entering your email and a password"
      />
      <TextField type="email" name="email" label="Email" />
      <TextField
        type="password"
        name="password"
        label="Password"
        autoComplete="new-password"
      />
      <Button>Sign up</Button>
    </Form>
  );
}
