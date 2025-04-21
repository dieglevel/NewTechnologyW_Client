import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IRoom } from "@/types/implement/room.interface";

export const getRoom = async () => {
   try {
      const response = await api.get<BaseResponse<IRoom[]>>(`/message/get-all-message-of-`);

      return response.data;
   } catch (error) {
      throw error as ErrorResponse;
   }
};