import { useDispatch, useSelector } from "react-redux";
import AddFriend from "./components/add-friend/add-friend";
import Friend from "./components/add-friend/request-friend";
import ContactBar from "./contact-bar/contact-bar";
import { RootState, store } from "@/redux/store";
import { ContactBarTypes } from "@/redux/store/ui";
import MyContact from "./components/my-contact/my-contact";
import { useEffect } from "react";
import { getListFriend } from "@/api";
import { ErrorResponse } from "@/lib/axios";
import { setMyListFriend } from "@/redux/store/models";

const Contact = () => {
	const { selected } = useSelector((state: RootState) => state.contactBar);

	const renderContent = () => {
		switch (selected) {
			case ContactBarTypes.AddFriend:
				return <AddFriend />;
			case ContactBarTypes.Contact:
				return <MyContact />;
			default:
				return null;
		}
	};

	return (
		<>
			<ContactBar />
			<div className="flex h-screen w-full gap-4 overflow-y-auto border-l-1 bg-body">{renderContent()}</div>
		</>
	);
};

export default Contact;
