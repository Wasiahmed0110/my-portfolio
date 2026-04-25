/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Ye line Next.js ko linting errors ignore karne ka order deti hai
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;