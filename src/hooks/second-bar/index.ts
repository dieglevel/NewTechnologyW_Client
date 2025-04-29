import { RootState } from "@/redux/store";
import { setSecondBarAuto, toggleOptionView, toggleSecondBar } from "@/redux/store/ui";
import { useDispatch, useSelector } from "react-redux";

export const useSecondBar = () => {
	const isOpenSecondBar = useSelector((state: RootState) => state.secondBar.isOpenSecondBar);
	const isAutoControlled = useSelector((state: RootState) => state.secondBar.isAutoControlled);
	const dispatch = useDispatch();

	return {
		isOpenSecondBar,
		setSelect: (value: boolean) => {
			dispatch(toggleSecondBar(value));
		},
		autoControl: (value: boolean) => {
			if (isAutoControlled) {
				dispatch(setSecondBarAuto(value)); 
			}
		},
		
	};
};
