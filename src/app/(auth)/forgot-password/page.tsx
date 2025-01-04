import ForgotPassword from "@/components/containers/auth/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Khôi phục mật khẩu Zalo",
};

const ForgotPasswordPage = () => {
	return <ForgotPassword />;
};

export default ForgotPasswordPage;
