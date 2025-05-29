import { avatar } from "@/assets/images";
import { IMessage } from "./message.interface";
import { BaseEntity } from "../base-entity";

export interface IRoom {
	id?: string;
	name?: string;
	isSeen?: string[];
	leader_account_id?: string;
	latestMessage?: IMessage;
	type?: "group" | "single" | "channel" | "cloud";
	isDelete?: boolean;
	isLoad?: boolean;
	detailRoom?: IDetailAccountRoom[];
	avatar?: string;
	isDisbanded?: boolean;
	avatarUrl?: string;
	updatedAt?: Date;
	messagePinID?: string[];
	configChatRoom?: ChatRoomConfig;
}

export interface IDetailAccountRoom {
	id?: string;
	fullName?: string;
	avatar?: string;
	avatarUrl?: string;
}

export interface ChatRoomConfig extends BaseEntity {
	changeNameAndImage: boolean;
	pinMessage: boolean;
	createNote: boolean;
	createVote: boolean;
	sendMessage: boolean;
	approveMember: boolean;
	tickAdminSubAdmin: boolean;
	acceptReader: boolean;
	isAcceptLinkJoin: boolean;
	linkJoin: string;
}