
import { Register } from "@/containers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng ký tài khoản Zalo",
};

const Page = () => {
	return <Register />;
};

export default Page;
