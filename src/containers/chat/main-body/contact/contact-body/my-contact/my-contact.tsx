import { RootState } from "@/redux/store";
import Friend from "./friend";
import { useSelector } from "react-redux";
import { ArrowBack, SearchIcon, UserIcon } from "@/assets/svgs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@heroui/input";
import { filterFriend } from "@/containers/chat/second-bar/search/components/handle";

const MyContact = () => {
	const { myListFriend } = useSelector((state: RootState) => state.myListFriend);

	const [search, setSearch] = useState<string>("");
	const [showId, setShowId] = useState<string | null>(null);

	const filteredFriends = useMemo(() => {
		return filterFriend(myListFriend || [], search);
	}, [myListFriend, search]);

	return (
		<div className="h-full w-full bg-gray-200">
			<div className="flex h-16 items-center border-b-1 bg-body px-4 py-4">
				<ArrowBack
					className="h-6 w-6 transform cursor-pointer rounded-full transition duration-200 hover:scale-110 hover:bg-gray-200 sm:hidden"
					// onClick={handleSecondBar}
				/>
				<div className="flex items-center">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-300/10">
						<UserIcon className="h-5 w-5" />
					</div>
					<h1 className="ml-3 text-lg font-semibold text-gray-800">Danh sách bạn bè</h1>
				</div>
			</div>
			<div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto bg-gray-200 p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-gray-800">
						Bạn bè
						<span className="ml-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
							{myListFriend?.length || 0}
						</span>
					</h2>
				</div>
				<Input
					placeholder="Tìm bạn"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					startContent={
						<SearchIcon className="size-8 fill-icon-second stroke-icon-second stroke-[0.1]" />
					}
					className="md:w-1/3 self-end"
					variant="bordered"
					classNames={{
						input: "bg-background placeholder:text-second placeholder:font-semibold",
						inputWrapper: ["border", "shadow-none", "bg-body"],
					}}
				/>
				<div className="mb-6 flex h-fit flex-col gap-5">
					{filteredFriends?.map((friend) => (
						<Friend
							key={friend.accountId}
							data={friend}
							selectedId={showId}
							setSelectedId={setShowId}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyContact;
