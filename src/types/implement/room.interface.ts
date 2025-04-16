import { BaseEntity } from "../base-entity";
import { IMessage } from "./message.interface";


export interface IRoom extends BaseEntity {
    id: string;
    roomName: string;
    isSeen?: string[]; 
    lastMessage: IMessage | null;
}