/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // GitHub Pages serves project sites from /<repository-name>.
  basePath,
  output: "export",
  trailingSlash: true,
};
export default nextConfig;
