import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
	dest: "public",
	// disable: process.env.NODE_ENV === "development",
	fallbacks: {
		document: "/~offline",
		// Đây là fallback cho các request JSON: /_next/data/xxx.json (nếu cần)
	},
});

const nextConfig: NextConfig = withPWA({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pinimg.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.giphy.com",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
		],
	},
});

export default nextConfig;
