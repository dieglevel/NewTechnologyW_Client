import { api, ErrorResponse } from "@/lib/axios"
import { BaseResponse } from "@/types"
import { IFriend, IRequestFriend, ISendedFriend } from "@/types/implement"

export const getListFriend = async () => {
   try {
      const response = await api.get<BaseResponse<IFriend[]>>("/friend/list")
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

export const sendRequestFriend = async (receiverId: string,
   message: string) => {
   try {
      const response = await api.post<BaseResponse<IFriend>>("/request-friend/send", { receiverId, message })
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

export const getListSended = async () => {
   try {
      const response = await api.get<BaseResponse<ISendedFriend[]>>("/request-friend/list-sended")
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

export const getListResponseFriend = async () => {
   try {
      const response = await api.get<BaseResponse<IRequestFriend[]>>("/request-friend/list-request")
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}