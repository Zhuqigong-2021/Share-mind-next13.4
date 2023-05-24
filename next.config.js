/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  // env: {
  //   GOOGLE_ID:
  //     "364183754045 -v9gk3enp19i2u1bfhknt8t7clscsorsk.apps.googleusercontent.com",
  //   GOOGLE_CLIENT_SECRET: "GOCSPX - F9nX256FBLHsftH_VmxgcD1zO94e",
  //   MONGODB_URI:
  //     "mongodb+srv://phil:zqg123@zqgmern.md048ih.mongodb.net/?retryWrites=true&w=majority",

  //   NEXTAUTH_URL: "http://localhost:3000",
  //   NEXTAUTH_URL_INTERNAL: "http://localhost:3000",
  //   NEXTAUTH_SECRET: "lGMV4eGgJpmY7jrNOH7kI3DSmqC7A9BzKdw / MMRIVaA=",
  // },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
