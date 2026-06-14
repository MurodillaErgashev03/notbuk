/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      // Supabase Storage public URLs (any project ref)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
