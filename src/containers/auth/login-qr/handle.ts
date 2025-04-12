import { getAccountApi, loginApi } from "@/api/auth";
import { ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { addToast } from "@heroui/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const handleCheckPage = async () => {
	const token = localStorage.getItem(LocalStorage.token);
	if (token) {
		window.location.href = "/chat";
	}
};

interface LoginQRInfo {
	ipDevice: string;
	userAgent: string;
}

export const handleGenerateQR = async (info: LoginQRInfo): Promise<string> => {
	const jsonString = JSON.stringify(info);
	return jsonString;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};