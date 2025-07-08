import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ปิด ESLint ตอน build
  },
  // คุณสามารถเพิ่ม config อื่นๆ ได้ที่นี่ เช่น pageExtensions, images, etc.
};

export default nextConfig;
