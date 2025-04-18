import { RootState } from "@/redux/store";
import { ContactBarTypes } from "@/redux/store/ui";
import { useSelector } from "react-redux";
import MyContact from "./my-contact/my-contact";
import AddFriendBody from "./add-friend/add-friend-body";

const ContactBody = () => {
	const { selected } = useSelector((state: RootState) => state.contactBar);

	const renderContent = () => {
		switch (selected) {
			case ContactBarTypes.Contact:
				return <MyContact />;
			case ContactBarTypes.AddFriend:
				return <AddFriendBody />;
			default:
				return null;
		}
	};

	return <>{renderContent()}</>;
};

export default ContactBody;
