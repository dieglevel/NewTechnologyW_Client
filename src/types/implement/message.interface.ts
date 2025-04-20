import { BaseEntity } from "../base-entity";


export interface IMessage extends BaseEntity {
	_id: string;
	message_id: string;
	account_id: string;
	room_id: string;
	content: string;
	files?: any[]; // Changed from string to string[] to accommodate multiple files
	isRevoked: boolean;
	isDeleted: boolean;
}