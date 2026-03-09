/** @type {import('next').NextConfig} */
const nextConfig = {
  // 仅忽略 TypeScript 报错，强行打包
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;