import UpdateProfile from "@/components/containers/auth/update-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cập nhật thông tin cá nhân",
};
const UpdateProfilePage = () => {
	return <UpdateProfile />;
};

export default UpdateProfilePage;
