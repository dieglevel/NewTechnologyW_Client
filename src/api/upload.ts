import { api, ErrorResponse } from "@/lib/axios";
import { BaseResponse, ICloud } from "@/types";

export const uploadSingleImageApi = async (file: File) => {
   const formData = new FormData();
   formData.append("file", file);

   try {
      const response = await api.post<BaseResponse<ICloud>>("/cloud/upload-file", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      return response.data
   } catch (error) {
      throw error as ErrorResponse
   }
}