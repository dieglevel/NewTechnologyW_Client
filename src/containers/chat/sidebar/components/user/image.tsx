import { avatarDefault } from "@/assets/images";
import { RootState } from "@/redux/store";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ImageRender = () => {
	const { detailInformation, status } = useSelector((state: RootState) => state.detailInformation);

	// useEffect(() => {
	// 	if (status === "succeeded") {
	// 	}
	// }, [status]);

	return (
		<>
			{(status === "loading" || status === "idle") ? (
				<Spinner color="white"/>
			) : (
				<>				
				<Image
					src={detailInformation?.avatarUrl ?? avatarDefault}
					alt="Avatar"
					width={48}
					height={48}
					priority
				/>
				</>

			)}
		</>
	);
};
