"use client";

import {useRouter} from "next/navigation";
import {RouterProvider as AriaRouterProvider} from "react-aria-components";

export function RouterProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();
  return (
    <AriaRouterProvider navigate={router.push}>{children}</AriaRouterProvider>
  );
}

declare module "react-aria-components" {
  type AppRouterInstance = ReturnType<typeof useRouter>;
  type RouterOptions = AppRouterInstance["push"] extends (
    href: string,
    options?: infer NavigateOptions,
  ) => void
    ? NavigateOptions
    : never;
  interface RouterConfig {
    routerOptions: RouterOptions;
  }
}
