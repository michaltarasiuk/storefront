import {Link} from "@/shared/components/Link";
import {Routes} from "@/shared/consts/routes";

import {SigninForm} from "../_components/SigninForm";

export default function SigninPage() {
  return (
    <>
      <SigninForm />
      <span>
        <Link href={Routes.signup}>Don&#39;t have an account? Sign up</Link>
      </span>
    </>
  );
}
