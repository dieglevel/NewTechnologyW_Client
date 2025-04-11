import { api, ErrorResponse } from "@/lib/axios"
import { LocalStorage } from "@/lib/local-storage";
import { BaseResponse } from "@/types";
import { IDetailInformation } from "@/types/implement";

export interface UpdateProfileRequest {
   thumbnailUrl?: string;
   gender?: boolean;
   fullName?: string;
   dateOfBirth?: Date;
   avatarUrl?: string;
}

export const updateProfile = async (profile: UpdateProfileRequest) => {
   try {
      const response = await api.post<BaseResponse<IDetailInformation>>("/detail-information/update", {
         ...profile,
      })

      return response.data

   } catch (error) {
      throw error as ErrorResponse
   }
}

export const getProfile = async () => {
   const userId = localStorage.getItem(LocalStorage.userId)
   try {
      const response = await api.get<BaseResponse<IDetailInformation>>(`/detail-information/${userId}`)
      return response.data
   } catch (error) {
      throw error as ErrorResponse
   }
}