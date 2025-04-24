import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse } from "@/types";
import { IRoom } from "@/types/implement/room.interface";

export const getRoom = async () => {
   try {
      const response = await api.get<BaseResponse<IRoom[]>>(`/chatroom-merge/my-list-room`);
      console.log("response ne troi: ", response.data);
      return response.data;
   } catch (error) {
      throw error as ErrorResponse;
   }
};