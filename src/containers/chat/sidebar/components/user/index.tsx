import { avatarDefault } from "@/assets/images";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDetailInformation } from "@/redux/store/models/detail-information-slice";
import Image from "next/image";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InformationModal from "./modal/information-modal";

export const User = () => {
	const detailInformation = useSelector((state: RootState) => state.detailInformation.detailInformation);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (!detailInformation) {
			dispatch(fetchDetailInformation());
		}
		console.log("detailInformation", detailInformation);
	}, [detailInformation]);


	return (
		<>
			<Image
				priority
				src={detailInformation?.avatarUrl ?? avatarDefault}
				alt="Avatar"
				className="rounded-full cursor-pointer"
				width={40}
				height={40}
				
			></Image>

			<InformationModal
				// isOpen={isOpen}
				// onClose={onClose}
				// onOpen={onOpen}
				// onOpenChange={onOpenChange}
			></InformationModal>
		</>
	);
};
