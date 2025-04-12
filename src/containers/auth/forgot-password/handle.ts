import { addToast } from "@heroui/toast";
import { Dispatch, SetStateAction } from "react";

export const checkForget = (identify: string, setError: Dispatch<SetStateAction<{
   errorIdentify: string;
}>>): boolean => {
   if (!identify) {
      setError({
         errorIdentify: identify ? "" : "Vui lòng nhập số điện thoại hoặc email",
      });
      return false;
   }

   setError({
      errorIdentify: "",
   })

   // check is 10 digit phone number === true
   const isPhoneNumber = identify.match(/^\d{10}$/);
   if (isPhoneNumber) {
      if (identify[0] !== "0") {
         setError({
            errorIdentify: "Số điện thoại không hợp lệ",
         });
         return false;
      }
   }
   // check if email === true
   const isEmail = identify.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
   if (isEmail) {
      if (!identify.includes("@")) {
         setError({
            errorIdentify: "Email không hợp lệ",
         });
         return false;
      }
   }
   

   return true;
}

