import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
		  {
			 protocol: 'https',
			 hostname: 'i.pinimg.com',
			 port: '', // Bỏ trống nếu không dùng cổng đặc biệt
			 pathname: '/**', // Định nghĩa đường dẫn con (wildcard)
		  },
		],
	 },
};

export default nextConfig;
