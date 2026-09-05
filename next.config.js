/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'ui-avatars.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
        formats: ['image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    },
    compress: true,
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        optimizeCss: true, // ✅ فعال‌سازی بهینه‌سازی CSS (critters به‌صورت داخلی استفاده می‌شود)
    },
    output: 'standalone',
    // ✅ بخش webpack حذف شد تا خطای ValidationError برطرف شود
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;