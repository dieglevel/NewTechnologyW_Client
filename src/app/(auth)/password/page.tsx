import Password from "@/components/containers/auth/password";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cập nhật mật khẩu Zalo",
};
const PasswordPage = () => {
	return <Password />;
};

export default PasswordPage;
