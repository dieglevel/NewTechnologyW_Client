import { avatarDefault } from "@/assets/images";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export const User = () => {
	const detailInformation = useSelector(
		(state: RootState) => state.detailInformation.detailInformation);
	
		return (
		<>
			<Image
				priority
				src={detailInformation?.avatarUrl || avatarDefault}
				alt="Avatar"
				className="rounded-full"
			></Image>
		</>
	);
};
