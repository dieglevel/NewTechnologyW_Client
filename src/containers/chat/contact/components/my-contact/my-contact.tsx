import { RootState } from "@/redux/store";
import Friend from "./friend";
import { useSelector } from "react-redux";

const MyContact = () => {
	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	return (
		<div className="flex h-full w-full flex-col items-center justify-start bg-body p-4">
			
				{myListFriend?.map((friend) => (
					<Friend key={friend.id} data={friend} />
				))}
		</div>
	);
};

export default MyContact;
