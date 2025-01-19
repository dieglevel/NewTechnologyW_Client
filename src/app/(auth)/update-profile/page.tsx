
import { UpdateProfile } from "@/containers/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cập nhật thông tin cá nhân",
};
const Page = () => {
	return <UpdateProfile />;
};

export default Page;
