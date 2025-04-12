
import LoginQR from "@/containers/auth/login-qr/login-qr";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng nhập tài khoản Zalo",
};

const Page = () => {
	return <LoginQR />;
};

export default Page;
