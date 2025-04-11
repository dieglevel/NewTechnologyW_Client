import { updateProfile, UpdateProfileRequest, uploadSingleImageApi } from "@/api";
import { SocketEmit, SocketOn } from "@/constants/socket";
import { ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { socketService } from "@/lib/socket/socket";
import { IDetailInformation } from "@/types/implement";
import { addToast } from "@heroui/toast";
import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export const handleImageChange = async (id: string | null, e: React.ChangeEvent<HTMLInputElement>, setUploading: Dispatch<SetStateAction<boolean>>, setPreviewUrl: Dispatch<SetStateAction<string | null>>) => {
   setUploading(true);

   const file = e.target.files?.[0];

   if (!file) {
      setUploading(false);
      return;
   }
   try {
      const userId = localStorage.getItem(LocalStorage.userId)
      const response = await uploadSingleImageApi(file);
      if (response.statusCode === 200) {
         addToast({
            classNames: { title: "font-bold", description: "text-sm" },
            variant: "solid",
            title: "Tải ảnh thành công",
            description: "Ảnh đã được tải lên thành công",
            color: "success",
         });

         try {
            socketService.emit(SocketEmit.detailInformation, {
               avatarUrl: response.data.url,
            });
            socketService?.on(SocketOn.updateUserDetailInformation, (data: IDetailInformation) => {
               if (data.id === userId) {
                  setPreviewUrl(response.data.url ?? "");
                  setUploading(false);
               }
            });
            socketService?.off(SocketOn.updateUserDetailInformation);

         }
         catch (error) {
            const errorDetailInformation = error as ErrorResponse;
            addToast({
               classNames: { title: "font-bold", description: "text-sm" },
               variant: "solid",
               title: "Có lỗi xảy ra",
               description: "Cập nhật thông tin không thành công",
               color: "danger",
            });
         }


         setPreviewUrl(response.data.url ?? "");
         setUploading(false);
      }
   } catch (e) {
      const error = e as ErrorResponse;
      addToast({
         classNames: { title: "font-bold", description: "text-sm" },
         variant: "solid",
         title: "Có lỗi xảy ra",
         description: "Tải ảnh không thành công",
         color: "danger",
      });
      setUploading(false);
   }
};

export const handleThumbnailChange = async (userId: string | null ,e: React.ChangeEvent<HTMLInputElement>, setUploading: Dispatch<SetStateAction<boolean>>, setPreviewUrl: Dispatch<SetStateAction<string | null>>) => {
   setUploading(true);

   const file = e.target.files?.[0];

   if (!file) {
      setUploading(false);
      return;
   }
   try {
      const response = await uploadSingleImageApi(file);
      if (response.statusCode === 200) {
         addToast({
            classNames: { title: "font-bold", description: "text-sm" },
            variant: "solid",
            title: "Tải ảnh thành công",
            description: "Ảnh nền đã được tải lên thành công",
            color: "success",
         });

         try {
            socketService?.emit(SocketEmit.detailInformation, {
               thumbnailUrl: response.data.url,
            });
            socketService?.on(SocketOn.updateUserDetailInformation, (data: IDetailInformation) => {
               if (data.id === userId) {
                  setPreviewUrl(response.data.url ?? "");
                  setUploading(false);
               }
            });
            socketService?.off(SocketOn.updateUserDetailInformation);

         }
         catch (error) {
            const errorDetailInformation = error as ErrorResponse;
            addToast({
               classNames: { title: "font-bold", description: "text-sm" },
               variant: "solid",
               title: "Có lỗi xảy ra",
               description: "Cập nhật thông tin không thành công",
               color: "danger",
            });
         }


         setPreviewUrl(response.data.url ?? "");
         setUploading(false);
      }
   } catch (e) {
      const error = e as ErrorResponse;
      addToast({
         classNames: { title: "font-bold", description: "text-sm" },
         variant: "solid",
         title: "Có lỗi xảy ra",
         description: "Tải ảnh nền không thành công",
         color: "danger",
      });
      setUploading(false);
   }
};

export const handleUpdateProfile = async (userId: string|null, profile: UpdateProfileRequest) => {
   try {
      socketService?.emit(SocketEmit.detailInformation, profile);
      socketService?.on(SocketOn.updateUserDetailInformation, (data: IDetailInformation) => {
         if (data.id === userId) {
            addToast({
               classNames: { title: "font-bold", description: "text-sm" },
               variant: "solid",
               title: "Cập nhật tài khoản thành công",
               description: "Cập nhật tài khoản thành công",
               color: "success",
            });
         }
      });
      socketService?.off(SocketOn.updateUserDetailInformation);
      
      window.location.href = "/chat";
   }
   catch (err) {
      const error = err as ErrorResponse;
      addToast({
         classNames: { title: "font-bold", description: "text-sm" },
         variant: "solid",
         title: "Cập nhập tài khoản không thành công",
         description: error.message,
         color: "danger",
      });
   }
}