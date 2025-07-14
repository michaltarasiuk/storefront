import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {cn} from "@/utils/cn";

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
