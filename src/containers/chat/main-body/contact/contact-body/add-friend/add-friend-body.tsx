import { useDispatch, useSelector } from "react-redux";
import RequestFriend from "./request-friend";
import { RootState } from "@/redux/store";
import { ArrowBack, UserIcon } from "@/assets/svgs";
import { toggleSecondBar } from "@/redux/store/ui";
import { useSecondBar } from "@/hooks/second-bar";

const AddFriendBody = () => {
	const { requestFriends } = useSelector((state: RootState) => state.requestFriend) || { requestFriends: [] };
	const dispatch = useDispatch();
	const { isOpenSecondBar } = useSecondBar();

	const handleSecondBar = () => {
		dispatch(toggleSecondBar(!isOpenSecondBar));
	};

	return (
		<div className="flex w-full flex-col overflow-hidden rounded-lg bg-body">
			<div className="flex h-16 items-center border-b-1 bg-body px-4 py-4">
				<ArrowBack
					className="h-6 w-6 transform cursor-pointer rounded-full transition duration-200 hover:scale-110 hover:bg-gray-200 sm:hidden"
					onClick={handleSecondBar}
				/>
				<UserIcon className="h-5 w-5" />
				<p className="ml-2 text-base font-semibold">Lời mời kết bạn</p>
			</div>
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-gray-200 p-4">
				<p className="text-lg font-semibold">Lời mời đã nhận ({requestFriends?.length})</p>
				<div className="flex h-fit w-full flex-wrap justify-center gap-4 sm:justify-start">
					{requestFriends && requestFriends.length > 0 ? (
						requestFriends?.map((friend) => (
							<RequestFriend
								key={friend.sender_id}
								data={friend}
							/>
						))
					) : (
						<div className="flex h-full w-full items-center justify-center text-gray-500">
							<p>Không có yêu cầu kết bạn nào</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddFriendBody;
