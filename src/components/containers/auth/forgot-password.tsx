import { ArrowBack, PhoneIcon } from "@/assets/svgs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";

const ForgotPassword = () => {
	return (
		<div className="flex flex-col gap-6 items-center pt-14 h-screen">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-primary text-6xl font-bold">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Khôi phục mật khẩu Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex flex-col items-center bg-white border w-128 h-80 rounded-lg">
				<div className="flex flex-col p-10 w-full items-center">
					<span className="text-md font-semibold">Nhập số điện thoại hoặc email</span>
					{/* <hr className="flex mt-2 border-gray-300 w-128" /> */}
				</div>
				<div className="flex flex-col px-20 gap-8 w-full justify-center items-center">
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<Input
							startContent={
								<div className="flex flex-row gap-4">
									<PhoneIcon
										className="size-5"
									/>
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
						size="md"
						className="bg-primary text-white w-full"
					>
						Tiếp tục
					</Button>
					<div className="flex flex-row w-full justify-start">
						<Link
							className="justify-start items-center flex flex-row w-full"
							href="#"
						>
							<ArrowBack
								width={16}
								height={16}
							/>
							Quay lại
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
