import { LocalStorage } from "@/lib/local-storage";

export const handleLogOut = () => {
   localStorage.removeItem(LocalStorage.ipDevice);
   localStorage.removeItem(LocalStorage.token);
   window.location.href = "/login";

}