import { BaseEntity } from "../base-entity";
import { IMessage } from "./message.interface";


export interface IRoom extends BaseEntity {
    room_id: string;
    roomName: string;
    isSeen?: string[]; 
    messages_latest: IMessage[];
}