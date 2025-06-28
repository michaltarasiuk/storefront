import {Button} from "@/shared/components/Button";
import {Form} from "@/shared/components/Form";
import {TextField} from "@/shared/components/TextField";
import {cn} from "@/shared/utils/cn";

export function SigninForm({header}: {header: React.ReactNode}) {
  return (
    <Form className={cn("gap-small-100 flex flex-col")}>
      {header}
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
