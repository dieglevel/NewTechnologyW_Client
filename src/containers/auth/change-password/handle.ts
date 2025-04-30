import { changePasswordApi } from "@/api";
import { ErrorResponse } from "@/lib/axios";
import { addToast } from "@heroui/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const checkUpdatePassword = (
	password: string,
	rePassword: string,
	setError: Dispatch<
		SetStateAction<{
			errorOldPassword: string;
			errorPassword: string;
			errorRePassword: string;
		}>
	>,
): boolean => {
	if (!password || !rePassword) {
		setError({
			errorOldPassword: password ? "" : "Vui lòng nhập mật khẩu cũ",
			errorPassword: password ? "" : "Vui lòng nhập mật khẩu",
			errorRePassword: rePassword ? "" : "Vui lòng nhập lại mật khẩu",
		});
		return false;
	}
	if (password !== rePassword) {
		setError({
			errorOldPassword:"",
			errorPassword: "",
			errorRePassword: "Mật khẩu không khớp",
		});

		return false;
	}

	// 8 từ , phải có số và chữ đi
	const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
	if (!passwordRegex.test(password)) {
		setError({
			errorOldPassword:"",
			errorPassword: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số",
			errorRePassword: "",
		});
		return false;
	}

	setError({
		errorOldPassword: "",
		errorPassword: "",
		errorRePassword: "",
	});

	return true;
};

export const handleChange = async (
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	currentPassword: string,
	newPassword: string,
	router: AppRouterInstance
) => {

	try {
		setIsLoading(true);
		await changePasswordApi(currentPassword, newPassword);
		addToast({
			classNames: { title: "font-bold", description: "text-sm" },
			variant: "solid",
			title: "Đổi mật khẩu thành công",
			color: "success",
		});
		router.push("/chat");
	} catch (e) {
		const error = e as ErrorResponse;
		addToast({
			classNames: { title: "font-bold", description: "text-sm" },
			variant: "solid",
			title: "Đổi mật khẩu thất bại",
			description:
				error.statusCode === 404 ? "Sai mật khẩu cũ" : "Có lỗi xảy ra, vui lòng thử lại sau",
			color: "danger",
		});
		setIsLoading(false);
	}
};

