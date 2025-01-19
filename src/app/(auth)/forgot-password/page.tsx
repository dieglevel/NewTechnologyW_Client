

import { ForgotPassword } from "@/containers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Khôi phục mật khẩu Zalo",
};

const Page = () => {
	return <ForgotPassword />;
};

export default Page;
