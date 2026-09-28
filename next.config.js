/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sysbekcoasfkeknpyafc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Instagram feed images on the home page (lib/instagram.ts)
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
}

module.exports = nextConfig

