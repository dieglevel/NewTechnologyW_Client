import { LockIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import React from "react";

const Login = () => {
	return (
		<div className="flex flex-col gap-6 items-center pt-14 h-screen">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-primary text-6xl font-bold">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đăng nhập tài khoản Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex flex-col items-center bg-white border w-128 h-128 rounded-lg">
				<div className="flex flex-col p-4 w-full items-center">
					<span className="text-md font-semibold">Đăng nhập với mật khẩu</span>
					<hr className="flex mt-2 border-gray-300 w-128" />
				</div>
				<div className="flex flex-col p-20 gap-8 w-full justify-center items-center">
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<Input
							startContent={
								<div className="flex flex-row gap-4">
									<PhoneIcon className="text-icon size-5" />
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
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<Input
							startContent={<LockIcon className="size-5" />}
							placeholder="Mật khẩu"
							size="sm"
							variant="underlined"
						/>
					</div>
					<Button
						size="md"
						className="bg-primary text-white w-full"
					>
						Đăng nhập
					</Button>
					<Link
						href="/forgot-password"
						className="text-md text-black"
					>
						Quên mật khẩu
					</Link>
					<Link
						href="#"
						className="text-primary font-semibold flex mt-10"
					>
						Đăng nhập qua mã QR
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
