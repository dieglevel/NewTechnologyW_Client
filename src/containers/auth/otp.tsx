"use client";

import { verifyAccount } from "@/api/auth";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { addToast } from "@heroui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const OTP = () => {
	const router = useRouter();

	const identifier = useSearchParams().get("identifier") || "";
	const type = useSearchParams().get("type") || "";

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [otp, setOtp] = useState<string>("");

	const handleSubmit = async () => {
		setIsLoading(true);
		console.log("identifier", identifier);
		try {
			const response = await verifyAccount(identifier, otp);
			if (response?.statusCode === 201) {
				addToast({
					description: "Xác thực OTP thành công",
					color: "success",
				});
				router.push("/login");
			}
		} catch (error) {
			addToast({
				description: "Xác thực OTP thất bại",
				color: "danger",
			});
			setOtp("");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen flex-col items-center gap-6 pt-14">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đăng ký tài khoản Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex h-72 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="p flex w-full flex-col items-center justify-center gap-6 px-20 py-6">
					<span>{`Nhập vào OTP đã được gửi vào ${type === "email" ? "email" : "số điện thoại"} của bạn`}</span>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<InputOtp
							disabled={isLoading}
							length={6}
							value={otp}
							onValueChange={setOtp}
						/>
					</div>
					<Button
						onPress={handleSubmit}
						size="md"
						className="w-full bg-primary text-white"
						isLoading={isLoading}
						disabled={isLoading || otp.length < 6}
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</div>
	);
};
