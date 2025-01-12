import OTP from "@/components/containers/auth/otp";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nhập mã OTP",
};
const OTPPage = () => {
	return <OTP />;
};

export default OTPPage;
