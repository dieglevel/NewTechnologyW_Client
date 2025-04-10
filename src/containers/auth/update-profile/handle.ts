import { updateProfile, UpdateProfileRequest, uploadSingleImageApi } from "@/api";
import { ErrorResponse } from "@/lib/axios";
import { addToast } from "@heroui/toast";
import { Dispatch, SetStateAction } from "react";

export const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, setUploading: Dispatch<SetStateAction<boolean>>, setPreviewUrl: Dispatch<SetStateAction<string | null>>) => {
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
            description: "Ảnh đã được tải lên thành công",
            color: "success",
         });

         try {
            const responseDetailInformation = await updateProfile({
               avatarUrl: response.data.url,
            });

            setPreviewUrl(response.data.url ?? "");
            setUploading(false);
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

export const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>, setUploading: Dispatch<SetStateAction<boolean>>, setPreviewUrl: Dispatch<SetStateAction<string | null>>) => {
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
            const responseDetailInformation = await updateProfile({
               thumbnailUrl: response.data.url,
            });

            setPreviewUrl(response.data.url ?? "");
            setUploading(false);
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

export const handleUpdateProfile = async (profile: UpdateProfileRequest) => {
   try {
      const response = await updateProfile(profile);
      // to chat
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