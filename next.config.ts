import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {	
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
};

export default nextConfig;
