import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // Nền trắng
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
          "5": "#F6F6F6", // Màu xám nhẹ
        },
      },
      borderRadius: {
        lg: "8px", // Cạnh bo lớn
        md: "6px", // Cạnh bo trung bình
        sm: "4px", // Cạnh bo nhỏ
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
