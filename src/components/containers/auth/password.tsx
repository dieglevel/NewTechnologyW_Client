"use client";

import { LockIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

const Password = () => {
	const goUpdateProfile = () => {
		window.location.href = "/update-profile";
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
			<div className="flex h-80 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="p flex w-full flex-col items-center justify-center gap-6 px-20 py-14">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							startContent={<LockIcon className="size-5" />}
							placeholder="Nhập mật khẩu của bạn"
							size="sm"
							variant="underlined"
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							startContent={<LockIcon className="size-5" />}
							placeholder="Nhập lại mật khẩu của bạn"
							size="sm"
							variant="underlined"
						/>
					</div>
					<Button
						onPress={() => goUpdateProfile()}
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

export default Password;
