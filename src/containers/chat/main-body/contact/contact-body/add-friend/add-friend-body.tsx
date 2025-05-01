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
		<div className="flex w-full flex-col overflow-hidden bg-body">
			<div className="flex h-16 items-center border-b-1 bg-body px-4 py-4">
				<ArrowBack
					className="h-6 w-6 transform cursor-pointer rounded-full transition duration-200 hover:scale-110 hover:bg-gray-200 sm:hidden"
					onClick={handleSecondBar}
				/>
				<div className="flex items-center">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-300/10">
						<UserIcon className="h-5 w-5" />
					</div>
					<h1 className="ml-3 text-lg font-semibold text-gray-800">Lời mời kết bạn</h1>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-gray-200 p-4">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-gray-800">
						Lời mời đã nhận
						<span className="ml-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
							{requestFriends?.length || 0}
						</span>
					</h2>
				</div>
				<div className="flex h-fit w-full flex-wrap justify-center gap-4 sm:justify-start">
					{requestFriends && requestFriends.length > 0 ? (
						requestFriends?.map((friend) => (
							<RequestFriend
								key={friend.sender_id}
								data={friend}
							/>
						))
					) : (
						<div className="col-span-full flex w-full flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm">
							<div className="mb-4 rounded-full bg-gray-100 p-4">
								<UserIcon className="h-8 w-8 text-gray-400" />
							</div>
							<p className="text-gray-500">Không có yêu cầu kết bạn nào</p>
							<p className="mt-2 text-sm text-gray-400">
								Các lời mời kết bạn mới sẽ xuất hiện tại đây
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddFriendBody;
