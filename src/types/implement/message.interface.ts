import { BaseEntity } from "../base-entity";


export interface IMessage extends BaseEntity {
	_id: string;
	account_id: string;
	room_id: string;
	content: string;
	isDeleted: boolean;
	isRevoked: boolean;
	file?: string;
}