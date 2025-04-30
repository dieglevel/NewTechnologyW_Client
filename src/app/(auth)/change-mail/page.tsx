

import { ChangeMail } from "@/containers/auth/change-mail/change-mail";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Khôi phục mật khẩu Zalo",
};

const Page = () => {
	return <ChangeMail />;
};

export default Page;
