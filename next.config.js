/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr', '@supabase/supabase-js'],
  },
  // Suppress Edge Runtime warnings - these are known Supabase warnings that don't affect functionality
  // The realtime client is imported but not used in middleware
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Ensure proper handling of Edge Runtime
  reactStrictMode: true,
}

module.exports = nextConfig

