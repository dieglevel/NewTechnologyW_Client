import { BaseEntity } from "../base-entity";
import { IRoom } from "./room.interface";

export interface IPinnedMessage extends BaseEntity {
    pinnedBy: string;
    messageId: string;
    chatRoom: IRoom;
  }
  