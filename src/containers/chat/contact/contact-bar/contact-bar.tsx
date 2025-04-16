import { AddFriendIcon, UserChatIcon } from "@/assets/svgs";
import { RootState } from "@/redux/store";
import { ContactBarTypes, selectContactBar } from "@/redux/store/ui";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";

const ContactBar = () => {
	const { selected } = useSelector((state: RootState) => state.contactBar);
	const dispatch = useDispatch();

	const handleSelect = (type: ContactBarTypes) => {
		dispatch(selectContactBar(type));
	};

	return (
		<div className="flex w-[25%] flex-col bg-body">
			<div
				className={`flex cursor-pointer items-center justify-start gap-4 border-b-1 bg-body px-4 py-4 hover:bg-primary-100 ${selected === ContactBarTypes.Contact ? "bg-primary-200" : ""}`}
				onClick={() => handleSelect(ContactBarTypes.Contact)}
			>
				<div className="flex size-8 items-center justify-center">
					<UserChatIcon className="size-6 stroke-black" />
				</div>
				<p className="font-bold">Danh sách bạn bè</p>
			</div>
			<div
				className={`flex cursor-pointer items-center justify-start gap-4 border-b-1 bg-body px-4 py-4 hover:bg-primary-100 ${selected === ContactBarTypes.AddFriend ? "bg-primary-200" : ""}`}
				onClick={() => handleSelect(ContactBarTypes.AddFriend)}
			>
				<div className="flex size-8 items-center justify-center">
					<AddFriendIcon className="size-6 stroke-2" />
				</div>
				<p className="font-bold">Lời mời kết bạn</p>
			</div>
			<div
				className={`flex cursor-pointer items-center justify-start gap-4 border-b-1 bg-body px-4 py-4 hover:bg-primary-100 ${selected === ContactBarTypes.Blocked ? "bg-primary-200" : ""}`}
				onClick={() => handleSelect(ContactBarTypes.Blocked)}
			>
				<p className="font-bold">Danh sách chặn</p>
			</div>
		</div>
	);
};

export default ContactBar;
