import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
dest: "public",

disable: process.env.NODE_ENV === "development",

register: true,
skipWaiting: true,
});

const nextConfig: NextConfig = {
reactStrictMode: true,

experimental: {
optimizePackageImports: [
"lucide-react",
"framer-motion",
"recharts",
],
},

images: {
remotePatterns: [
{
protocol: "https",
hostname: "**",
},
],
},

eslint: {
ignoreDuringBuilds: true,
},

typescript: {
ignoreBuildErrors: true,
},

turbopack: {},
};

export default withPWA(nextConfig);
