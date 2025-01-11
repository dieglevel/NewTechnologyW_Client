import Register from "@/components/containers/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng ký tài khoản Zalo",
};

const RegisterPage = () => {
	return <Register />;
};

export default RegisterPage;
