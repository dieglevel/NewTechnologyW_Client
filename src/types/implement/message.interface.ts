// import { BaseEntity } from "../base-entity";
import { IMessageFile } from "./file.interface";


export interface IMessage {
	_id?: string;
	message_id?: string;
	account_id?: string;
	room_id?: string;
	content?: string;
	sticker?: string;
	files?: IMessageFile[]; // Changed from string to string[] to accommodate multiple files
	isRevoked?: boolean;
	isDeleted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	type: "mixed" | "sticker" | "call",
}