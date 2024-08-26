const cmsUrl = new URL(process.env.NEXT_PUBLIC_CMS_URL);

const protocol = cmsUrl.protocol.substring(0, cmsUrl.protocol.length - 1);

module.exports = {
  images: {
    deviceSizes: [360, 393, 414, 575, 767, 991, 1199, 1440, 1600, 1920],
    imageSizes: [328, 361, 382, 543, 735, 927, 1135, 1376, 1536, 1856, 462, 576, 696, 776, 936],
    remotePatterns: [
      {
        protocol: protocol,
        hostname: cmsUrl.hostname,
        port: cmsUrl.port,
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
  },
};
