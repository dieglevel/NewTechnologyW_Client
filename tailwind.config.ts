import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/components/(button|date-input|dropdown|image|input|input-otp|link|modal|popover|radio|spinner|tabs|toast|ripple|form|menu|divider).js",
	],
	theme: {
		extend: {
			width: {
				"128": "32rem", // Thêm w-128 với giá trị 32rem (~512px)
				"144": "36rem", // Thêm w-144 với giá trị 36rem (~576px)
				"160": "40rem", // Thêm w-160 với giá trị 40rem (~640px)
			},
			height: {
				"128": "32rem", // Thêm h-128 với giá trị 32rem (~512px)
				"144": "36rem", // Thêm h-144 với giá trị 36rem (~576px)
				"160": "40rem", // Thêm h-160 với giá trị 40rem (~640px)
			},
			colors: {
				background: "#E8F3FF", // Nền trắng
				foreground: "#1C1C1C", // Chữ màu đen
				card: {
					DEFAULT: "#F6F6F6", // Nền thẻ
					foreground: "#1C1C1C", // Chữ trong thẻ
				},
				popover: {
					DEFAULT: "#EAF4FF", // Nền popover
					foreground: "#0068FF", // Màu xanh Zalo
				},
				primary: {
					DEFAULT: "#0068FF", // Màu xanh chính
					foreground: "#FFFFFF", // Chữ màu trắng trên nền xanh
				},
				secondary: {
					DEFAULT: "#EAF4FF", // Màu xanh nhạt
					foreground: "#0068FF", // Màu xanh chính
				},
				muted: {
					DEFAULT: "#F6F6F6", // Xám nhẹ
					foreground: "#6B7280", // Xám tối (tailwind mặc định)
				},
				accent: {
					DEFAULT: "#1C1C1C", // Điểm nhấn (đen)
					foreground: "#FFFFFF", // Chữ trắng trên nền đen
				},
				destructive: {
					DEFAULT: "#FF4D4F", // Màu đỏ cho lỗi/hủy
					foreground: "#FFFFFF", // Chữ trắng
				},
				border: "#E5E7EB", // Màu xám nhạt cho viền
				input: "#F6F6F6", // Màu nền input
				ring: "#0068FF", // Hiệu ứng focus (màu xanh Zalo)
				chart: {
					"1": "#0068FF", // Màu xanh chính
					"2": "#1C1C1C", // Màu đen
					"3": "#EAF4FF", // Màu xanh nhạt
					"4": "#FF4D4F", // Màu đỏ
					// Màu xám nhẹ
				},

				//Custom
				icon: {
					DEFAULT: "#000000",
					active: "#FFFFFF",
					inactive: "#D9D9D9",
					second: "#575757",
				},
				text: {
					DEFAULT: "#0C0C0C",
					second: "#D9D9D9",
					seen: "#343434",
				},

				disable: {
					DEFAULT: "#7FC7F9",
					foreground: "#FFFFFF",
				},
			},
			borderRadius: {
				lg: "8px", // Cạnh bo lớn
				md: "6px", // Cạnh bo trung bình
				sm: "4px", // Cạnh bo nhỏ
				DEFAULT: "#D9D9D9",
			},

			// Custom
			backgroundColor: {
				DEFAULT: "#F8F8F8",
				icon: {
					active: "#0074E0",
					inactive: "#0084FF",
				},
				second: "#F9F9F9",
				body: "#FFFFFF",
				"chat-me": "#DBEBFF",
				third: "#D9D9D9",
				reply: "#ADD2FF",
				sidebar: "#0084FF",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		heroui(),
		// 	{
		// 	themes: {
		// 		light: {
		// 			colors: {
		// 				danger: "#FF4D4F",
		// 			},
		// 		},
		// 		dark: {},
		// 	},
		// }
	],
} satisfies Config;
