import { RootIDB } from "@/lib/idb";
import { LocalStorageKey } from "@/lib/local-storage";

export const handleLogOut = () => {
   localStorage.removeItem(LocalStorageKey.IP_DEVICE);
   localStorage.removeItem(LocalStorageKey.TOKEN);
   window.location.href = "/login";

   const db = RootIDB()
   db.deleteDB()
}