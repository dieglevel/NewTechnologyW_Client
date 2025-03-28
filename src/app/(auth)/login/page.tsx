
import { Login } from "@/containers/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng nhập tài khoản Zalo",
};

const Page = () => {
	return <Login />;
};

export default Page;
