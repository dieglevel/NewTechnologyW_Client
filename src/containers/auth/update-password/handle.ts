import { addToast } from "@heroui/toast";
import { Dispatch, SetStateAction } from "react";

export const checkUpdatePassword = (
	password: string,
	rePassword: string,
	setError: Dispatch<
		SetStateAction<{
			errorPassword: string;
			errorRePassword: string;
		}>
	>,
): boolean => {
	if (!password || !rePassword) {
		setError({
			errorPassword: password ? "" : "Vui lòng nhập mật khẩu",
			errorRePassword: rePassword ? "" : "Vui lòng nhập lại mật khẩu",
		});
		return false;
	}
	if (password !== rePassword) {
		setError({
			errorPassword: "",
			errorRePassword: "Mật khẩu không khớp",
		});

		return false;
	}

	// 8 từ , phải có số và chữ đi
	const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
	if (!passwordRegex.test(password)) {
		setError({
			errorPassword: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số",
			errorRePassword: "",
		});
		return false;
	}

	setError({
		errorPassword: "",
		errorRePassword: "",
	});

	return true;
};
