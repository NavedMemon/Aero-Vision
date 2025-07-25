/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["openweathermap.org", "cdnjs.cloudflare.com"],
  },

  env: {
    JWT_SECRET: "aerovisionaerovisionaerovisonproject",
  },
};

export default nextConfig;
