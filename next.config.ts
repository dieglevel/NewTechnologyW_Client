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
		  {
			 protocol: 'https',
			 hostname: 'media0.giphy.com',
			 port: '',
			 pathname: '/**',
		  },
		  {
			protocol: 'https',
			hostname: 'media1.giphy.com',
			port: '',
			pathname: '/**',
		 },		  {
			protocol: 'https',
			hostname: 'media2.giphy.com',
			port: '',
			pathname: '/**',
		 },		  {
			protocol: 'https',
			hostname: 'media3.giphy.com',
			port: '',
			pathname: '/**',
		 },		  {
			protocol: 'https',
			hostname: 'media4.giphy.com',
			port: '',
			pathname: '/**',
		 },
		 
		],
	 },
};

export default nextConfig;
