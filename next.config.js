/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "github-readme-stats.vercel.app",
      "github-readme-streak-stats.herokuapp.com",
      "github-profile-trophy.vercel.app",
      "visitcount.itsvg.in",
      "img.shields.io",
      "quotes-github-readme.vercel.app",
      "memer-new.vercel.app",
    ],
  },
};

module.exports = nextConfig;
