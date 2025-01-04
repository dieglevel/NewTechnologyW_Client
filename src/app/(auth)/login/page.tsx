import Login from "@/components/containers/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng nhập tài khoản Zalo",
};

const LoginPage = () => {
	return <Login />;
};

export default LoginPage;
