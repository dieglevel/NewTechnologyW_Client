import { dbName } from "@/lib/idb";
import { LocalStorage } from "@/lib/local-storage";
import { deleteDB } from "idb";

export const handleLogOut = () => {
   localStorage.removeItem(LocalStorage.ipDevice);
   localStorage.removeItem(LocalStorage.token);
   localStorage.removeItem(LocalStorage.userId);
   window.location.href = "/login";
   deleteDB(dbName)
}