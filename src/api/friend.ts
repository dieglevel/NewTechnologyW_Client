import { api, ErrorResponse } from "@/lib/axios"
import { BaseResponse } from "@/types"
import { IFriend, IRequestFriend, ISendedFriend } from "@/types/implement"
import { access } from "fs"

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

export const acceptRequestFriend = async (requestId: string) => {
   try {
      const response = await api.put<BaseResponse<IFriend>>("/request-friend/respond", { requestId, status: true })
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

export const rejectRequestFriend = async (requestId: string) => {
   try {
      const response = await api.put<BaseResponse<IFriend>>("/request-friend/respond", { requestId, status: false })
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

export const unFriend = async (friendId: string) => {
   try {
      const response = await api.put<BaseResponse<IFriend>>(`/friend/delete/${friendId}`)
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}