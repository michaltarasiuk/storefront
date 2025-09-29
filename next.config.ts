import type {NextConfig} from "next";
import invariant from "tiny-invariant";

const saleorOrigin = process.env.NEXT_PUBLIC_SALEOR_ORIGIN;
invariant(
  saleorOrigin,
  "Environment variable NEXT_PUBLIC_SALEOR_ORIGIN must be defined.",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: new URL(saleorOrigin).hostname,
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
export default nextConfig;
