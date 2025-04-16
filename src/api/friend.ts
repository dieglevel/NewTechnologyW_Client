import { api, ErrorResponse } from "@/lib/axios"
import { BaseResponse } from "@/types"
import { IFriend } from "@/types/implement"

export const getListFriend = async () => {
   try {
      const response = await api.get<BaseResponse<IFriend[]>>("/friend/list")
      return response.data;
   } catch (error) {
      throw error as ErrorResponse
   }
}

