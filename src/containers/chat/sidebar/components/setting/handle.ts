import { logoutApi } from "@/api";
import { dbName } from "@/lib/idb";
import { deleteDB } from "idb";

export const handleLogOut = async() => {
   console.log("handleLogOut called");
   await logoutApi()
   window.location.href = "/login";
   deleteDB(dbName)
}