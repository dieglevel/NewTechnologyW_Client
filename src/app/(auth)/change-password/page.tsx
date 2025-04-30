

import { ChangePassword } from "@/containers/auth/change-password/change-password";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Khôi phục mật khẩu Zalo",
};

const Page = () => {
	return <ChangePassword />;
};

export default Page;
