import {Link} from "@/components/Link";
import {Routes} from "@/consts/routes";

import {SigninForm} from "../_components/SigninForm";

export default function SigninPage() {
  return (
    <>
      <SigninForm />
      <Link href={Routes.signup}>Don’t have an account? Sign up</Link>
    </>
  );
}
