"use client";

import { PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export const Register = () => {
	const goOtp = () => {
		window.location.href = "/otp";
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
				<div className="p flex w-full flex-col items-center justify-center gap-6 px-20 py-14">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							startContent={
								<div className="flex flex-row gap-4">
									<PhoneIcon className="size-5 text-icon" />
									<select
										name=""
										id=""
									>
										<option value="84">+84</option>
										<option value="1">+1</option>
									</select>
								</div>
							}
							variant="underlined"
							size="sm"
							placeholder="Số điện thoại hoặc email"
						/>
					</div>
					<Button
						onPress={() => goOtp()}
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
