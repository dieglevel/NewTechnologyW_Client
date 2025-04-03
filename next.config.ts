import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";
import path from "path";

const withPWA = withPWAInit({
	dest: "public",
	fallbacks: {
		document: "/~offline",
		// This is for /_next/.../.json files.
	}
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
		],
	},
});

export default nextConfig;
