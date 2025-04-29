import { getRoom } from "@/api";
import { useSecondBar } from "@/hooks/second-bar";
import { RootState } from "@/redux/store";
import { changeSidebar, SideBarSelected, toggleSecondBar } from "@/redux/store/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const getRoomList = async () => {
	const response = await getRoom();
	if (response.statusCode === 200) {
		return response.data.listRoomResponse;
	} else {
		throw new Error(response.message);
	}
};

export const SecondBarManager = () => {
	const { autoControl } = useSecondBar();

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth < 640;
			autoControl(!isMobile); // Dùng autoControl thay vì dispatch trực tiếp
		};

		handleResize(); // chạy lần đầu
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [autoControl]);

	return null;
};
