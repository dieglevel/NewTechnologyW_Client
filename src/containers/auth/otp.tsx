"use client";

import { Button } from "@nextui-org/button";
import { InputOtp } from "@nextui-org/input-otp";

export const OTP = () => {
	const goPassword = () => {
		window.location.href = "/password";
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
					<span>Nhập vào OTP đã được gửi vào email của bạn</span>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<InputOtp length={6} />
					</div>
					<Button
						onPress={() => goPassword()}
						size="md"
						className="w-full bg-primary text-white"
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</div>
	);
};