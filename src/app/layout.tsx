import "#app/styles/globals.css";
import "#app/styles/themes/plant-theme.css";

import type {Viewport} from "next";

import {ApolloProvider} from "#app/graphql/ApolloProvider";

import {Html} from "./_components/Html";
import {RouterProvider} from "./_components/RouterProvider";

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({children}: LayoutProps<"/">) {
  return (
    <Html>
      <body>
        <RouterProvider>
          <ApolloProvider>{children}</ApolloProvider>
        </RouterProvider>
      </body>
    </Html>
  );
}
