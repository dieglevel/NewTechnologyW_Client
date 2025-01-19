

import { Password } from "@/containers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cập nhật mật khẩu Zalo",
};
const Page = () => {
	return <Password />;
};

export default Page;
