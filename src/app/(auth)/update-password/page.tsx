

import { Register } from "@/containers/auth";
import { UpdatePassword } from "@/containers/auth/update-password/update-password";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Đăng ký tài khoản Zalo",
};

const Page = () => {
	return <UpdatePassword />;
};

export default Page;
