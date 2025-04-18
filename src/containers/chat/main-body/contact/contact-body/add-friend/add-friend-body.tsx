import { useSelector } from "react-redux";
import RequestFriend from "./request-friend";
import { RootState } from "@/redux/store";

const AddFriendBody = () => {
	const { requestFriends } = useSelector((state: RootState) => state.requestFriend) || { requestFriends: [] };
	return (
		<div className="flex w-full gap-4 overflow-y-auto bg-gray-200 p-4">
			<div className="flex w-full flex-wrap justify-center gap-4">
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
	);
};

export default AddFriendBody;
