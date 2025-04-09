import { getIpDeviceApi } from "@/api/ip-device";
import axios from "axios";
import { LocalStorageKey } from "../local-storage";
import { addToast } from "@heroui/toast";

export interface ErrorResponse {
	error: string;
	message: string;
	statusCode: number;
	timestamp: Date;
	path: string;
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	timeout: 60000,
	timeoutErrorMessage: "Thời gian chờ kết nối quá lâu",
	headers: { "Content-Type": "application/json" },
});

// Interceptor trước khi gửi request
api.interceptors.request.use(
	async (config) => {
		// Kiểm tra nếu headers đã có token và id-device thì không làm gì thêm
		if (config.headers["Authorization"] && config.headers["ip-device"]) {
			return config;
		}

		// Lấy token và idDevice từ localStorage
		let token = localStorage.getItem(LocalStorageKey.TOKEN);
		let idDevice = localStorage.getItem(LocalStorageKey.IP_DEVICE);

		// Nếu chưa có idDevice, gọi API để lấy và lưu lại
		if (!idDevice) {
			idDevice = await getIpDeviceApi();
			localStorage.setItem(LocalStorageKey.IP_DEVICE, idDevice ?? "");
		}

		// Nếu có token, gán cả token và idDevice vào headers
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		config.headers["ip-device"] = idDevice;

		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor xử lý lỗi
api.interceptors.response.use(
	(response) => response,
	(error) => {

		console.log(error)

		if (!error.response) {
			return Promise.reject(error);
		}

		const errorResponse: ErrorResponse = error.response.data;

		if (errorResponse.statusCode === 401) {
			addToast({
				title: "Phiên đăng nhập đã hết hạn",
				description: "Vui lòng đăng nhập lại",
				color: "danger",
			})
			localStorage.removeItem(LocalStorageKey.TOKEN);
			window.location.href = "/login";
		}

		return Promise.reject(errorResponse);
	},
);
