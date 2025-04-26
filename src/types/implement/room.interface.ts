import { avatar } from '@/assets/images';
import { BaseEntity } from "../base-entity";
import { IMessage } from "./message.interface";


export interface IRoom {
	id?: string;
	name?: string;
	isSeen?: string[];
	leader_account_id?: string;
	latestMessage?: IMessage;
	type?: "group" | "single" | "channel" | "cloud"; 
	isDelete?: boolean;
	isLoad?: boolean;
	detailRoom?: IDetailRoom[];
	avatar?: string;
	isDisbanded?: boolean;
	avatarUrl?: string;
}

export interface IDetailRoom  {
	id?: string;
	fullName?: string;
	avatar?: string;
	avatarUrl?: string;
}