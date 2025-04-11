import { avatarDefault } from "@/assets/images";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteDetailInformation, fetchDetailInformation } from "@/redux/store/models/detail-information-slice";
import { useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InformationModal from "./modal/information-modal";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { openModal } from "@/redux/store/ui";

export const User = () => {
	const [openDropdown, setOpenDropdown] = useState(false);

	const { detailInformation, status: statusDetailInformation } = useSelector(
		(state: RootState) => state.detailInformation,
	);
	const {isOpen: isOpenModal, type} = useSelector((state: RootState) => state.modal);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (statusDetailInformation === "idle") {
			dispatch(fetchDetailInformation());
		}
	}, [dispatch, statusDetailInformation]);
	

	const handleOpenDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleOpenModel = () => {
		setOpenDropdown(false);
		dispatch(openModal({ isOpen: true, type: "detailInformation" }));
	};

	return (
		<>
			<Dropdown
				placement="right-start"
				isOpen={openDropdown}
				onOpenChange={handleOpenDropdown}
				className="w-full"
			>
				<DropdownTrigger>
					<div className="aspect-square h-12 w-12 cursor-pointer select-none overflow-hidden rounded-full border-2 border-white shadow-md">
						{detailInformation?.avatarUrl && (
							<Image
								src={detailInformation?.avatarUrl ?? avatarDefault}
								alt="Avatar"
								width={48}
								height={48}
								priority
							/>
						)}
					</div>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownSection
						key={"user-information"}
						className="font-semibold"
						classNames={{ heading: "text-center" }}
						title={detailInformation?.fullName ?? "-"}
					>
						<DropdownItem
							key={"detail-information"}
							onPress={handleOpenModel}
							className="font-bold"
							textValue="Thông tin cá nhân"
						>
							<p className="font-bold">Thông tin cá nhân</p>
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>

		</>
	);
};
