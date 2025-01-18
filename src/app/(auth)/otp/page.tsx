
import { OTP } from "@/containers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nhập mã OTP",
};
const Page = () => {
	return <OTP />;
};

export default Page;
