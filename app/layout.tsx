import "./globals.css";

import {ClientProviders} from "./_components/ClientProviders";
import {Html} from "./_components/Html";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <Html>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </Html>
  );
}
