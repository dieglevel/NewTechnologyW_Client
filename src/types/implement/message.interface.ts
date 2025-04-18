import { BaseEntity } from "../base-entity";


export interface IMessage extends BaseEntity {
    accountId: string;
    roomId: string;
    content: string;
    isDeleted: boolean;
    isRevoked: boolean;
    file?: string;
}