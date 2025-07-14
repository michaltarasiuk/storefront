import {Link} from "@/components/Link";
import {Routes} from "@/consts/routes";

import {SignupForm} from "../_components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <span>
        <Link href={Routes.signin}>Already have an account? Sign in</Link>
      </span>
    </>
  );
}
