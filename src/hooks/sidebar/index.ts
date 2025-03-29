import { RootState } from "@/redux/store";
import { changeSidebar, SideBarSelected } from "@/redux/store/sidebar";
import { useDispatch, useSelector } from "react-redux";

export const useSidebar = () => {
   const selected = useSelector((state: RootState) => state.sidebar.selected);
   const dispatch = useDispatch();

   return {
      selected,
      setSelect: (value: SideBarSelected) => {
         dispatch(changeSidebar(value));
      }
   }


}