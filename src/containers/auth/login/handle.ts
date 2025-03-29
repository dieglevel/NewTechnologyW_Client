import { loginApi } from "@/api/auth";
import { ErrorResponse } from "@/lib/axios";
import { LocalStorageKey } from "@/lib/local-storage";
import { addToast } from "@heroui/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const handleCheckPage = async () => {
	const token = localStorage.getItem(LocalStorageKey.TOKEN);
	if (token) {
		window.location.href = "/chat";
	}
};

export const handleLogin = async (
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	identifier: string,
	password: string,
	router: AppRouterInstance,
) => {
	// check if identifier or password is empty
	if (!identifier || !password) {
		addToast({
			classNames: { title: "font-bold", description: "text-sm" },
			variant: "solid",
			title: "Đăng nhập thất bại",
			description: "Vui lòng nhập tài khoản và mật khẩu",
			color: "danger",
		});
		return;
	}

	try {
		setIsLoading(true);
		await loginApi(identifier, password);
		router.push("/chat");
	} catch (e) {
		const error = e as ErrorResponse;
		addToast({
			classNames: { title: "font-bold", description: "text-sm" },
			variant: "solid",
			title: "Đăng nhập thất bại",
			description:
				error.statusCode === 404 ? "Sai tài khoản hoặc mật khẩu" : "Có lỗi xảy ra, vui lòng thử lại sau",
			color: "danger",
		});
	} finally {
		setIsLoading(false);
	}
};
