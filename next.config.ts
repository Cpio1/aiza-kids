import type { NextConfig } from "next";

// GitHub Pages (project site) публикует сайт по адресу /<repo>.
// В workflow передаётся BASE_PATH; локально и на Vercel он пустой.
const basePath = (process.env.BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || "",
  },
};

export default nextConfig;
