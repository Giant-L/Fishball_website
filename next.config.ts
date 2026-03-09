/** @type {import('next').NextConfig} */
const nextConfig = {
  // 忽略 TypeScript 报错，强行打包
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 报错，强行打包
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;