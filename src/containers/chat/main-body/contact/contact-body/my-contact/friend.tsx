"use client";

import { unFriend } from "@/api";
import { avatarDefault } from "@/assets/images";
import { More } from "@/assets/svgs";
import { AccountInfoModal } from "@/containers/chat/second-bar/search/components/modal-information";
import type { ErrorResponse } from "@/lib/axios";
import type { IDetailInformation, IFriend } from "@/types/implement";
import { ISearchAccount } from "@/types/implement/response";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useDisclosure } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { UserMinus, UserCheck } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

interface Props {
	data: IFriend;
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
}

const FriendCard = ({ data, selectedId, setSelectedId }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isLoading, setIsLoading] = useState(false);
	const [friend, setFriend] = useState<ISearchAccount>({} as ISearchAccount);

	const isActive = selectedId === data.friendId;

	const optionsRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
				setSelectedId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const friendId = data.accountId ?? "";
		const friendDetail = data.detail ?? ({} as IDetailInformation);

		setFriend({ id: friendId, detailInformation: friendDetail });
	}, [])

	const handleUnFriend = async () => {
		try {
			setIsLoading(true);
			const response = await unFriend(data.friendId ?? "");
			if (response?.statusCode === 200) {
				addToast({
					title: "Thành công",
					description: "Hủy kết bạn thành công",
					color: "success",
				});
			}
		} catch (error) {
			const e = error as ErrorResponse;
			addToast({
				title: "Thất bại",
				description: e.message,
				color: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="group relative w-full rounded-xl bg-body p-5 shadow-sm hover:shadow-md">
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-50 opacity-0 group-hover:opacity-100" />

			<div className="relative flex items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<div className="relative">
						<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-300 to-primary-500 opacity-75 blur-sm group-hover:opacity-100" />
						<div
							className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-white shadow-inner cursor-pointer"
							onClick={() => {
								onOpen();
							}}
						>
							<Image
								src={data?.detail?.avatarUrl ?? avatarDefault}
								alt={data?.detail?.fullName ?? "Friend"}
								width={300}
								height={300}
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<h3 className="line-clamp-1 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary-700">
							{data?.detail?.fullName ?? "-"}
						</h3>
					</div>
				</div>

				<Button
					onPress={() => setSelectedId(isActive ? null : (data.friendId ?? null))}
					isIconOnly
					isDisabled={isLoading}
					className={`flex items-center gap-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200`}
				>
					{isLoading ? <Spinner /> : <More className="h-5 w-5" />}
				</Button>
			</div>
			{isActive && (
				<div
					ref={optionsRef}
					className={`bot-4 absolute right-4 z-10 w-40 overflow-clip rounded-md bg-white py-1 shadow-lg`}
				>
					<button
						className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-zinc-700"
						onClick={() => {
							onOpen();
						}}
					>
						Xem thông tin
					</button>
					<Divider />
					<button
						className="flex w-full items-center px-4 py-2 text-left text-sm text-red-500 hover:bg-zinc-700"
						onClick={() => {
							handleUnFriend();
						}}
					>
						Xóa kết bạn
					</button>
				</div>
			)}
			<AccountInfoModal
				data={friend}
				isOpen={isOpen}
				onOpenChange={onOpen}
				onClose={onClose}
			/>
		</div>
	);
};

export default FriendCard;
