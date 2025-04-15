import { RootState } from "@/redux/store";
import { toggleOptionView } from "@/redux/store/ui";
import { useDispatch, useSelector } from "react-redux";

export const useOptionView = () => {
   const isOpen = useSelector((state: RootState) => state.optionView.isOpen);
   const dispatch = useDispatch();

   return {
      isOpen,
      setSelect: (value: boolean) => {
         dispatch(toggleOptionView(value));
      }
   }


}