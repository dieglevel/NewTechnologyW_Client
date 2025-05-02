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
import { ImageRender } from "./image";

export const User = () => {
	const [openDropdown, setOpenDropdown] = useState(false);


	const dispatch = useDispatch();

	const handleOpenDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleOpenModelDetailInformation = () => {
		setOpenDropdown(false);
		dispatch(openModal({ isOpen: true, type: "detailInformation" }));
	};

	const handleOpenModelPassword = () => {
		setOpenDropdown(false);
		window.location.href = "/change-password";
	};

	const handleOpenModelEmail = () => {
		setOpenDropdown(false);
		window.location.href = "/change-mail";
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
					<div className="flex h-12 w-12 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-md">
						<ImageRender />
					</div>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownSection
						key={"user-information"}
						className="font-semibold"
						classNames={{ heading: "text-center" }}
					>
						<DropdownItem
							key={"detail-information"}
							onPress={handleOpenModelDetailInformation}
							className="font-bold"
							textValue="Thông tin cá nhân"
						>
							<p className="font-bold">Thông tin cá nhân</p>
						</DropdownItem>
						<DropdownItem
							key={"update-account"}
							onPress={handleOpenModelPassword}
							className="font-bold"
							textValue="Cập nhật mật khẩu"
						>
							<p className="font-bold">Cập nhật mật khẩu</p>
						</DropdownItem>
						<DropdownItem
							key={"change-mail"}
							onPress={handleOpenModelEmail}
							className="font-bold"
							textValue="Thông tin xác thực"
						>
							<p className="font-bold">Thông tin xác thực</p>
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</>
	);
};
