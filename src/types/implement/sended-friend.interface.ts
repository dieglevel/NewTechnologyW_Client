import { IDetailInformation } from "./detail-information.interface";

export interface ISendedFriend {
   receiver_id: string,
   sender_id: string,
   requestId: string,
   detail: IDetailInformation
}