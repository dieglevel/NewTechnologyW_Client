"use client";

import { avatarDefault } from "@/assets/images";
import { CalendarIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const UpdateProfile = () => {
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const [fullName, setFullName] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<string>("");
	const [gender, setGender] = useState<boolean>(true);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
		  const reader = new FileReader();
		  reader.onloadend = () => {
			 setImageSrc(reader.result as string);
		  };
		  reader.readAsDataURL(file);
		} else {
		  setImageSrc(null);
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
			<div className="flex h-128 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
					<hr className="mt-2 flex w-128 border-gray-300" />
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-6 px-20 py-10">
					<div className="flex w-full flex-col items-center justify-center gap-2">
						<Image
							priority
							src={imageSrc || avatarDefault}
							alt="Avatar"
							className="rounded-full w-32 h-32 object-contain border-3 border-primary"
							width={100}
							height={100}
						/>
						<Input
							type="file"
							title="Chọn ảnh đại diện"
							placeholder="asd"
							onChange={handleFileChange}
							accept="image/*"
							size="md"
							variant="faded"
							className="w-1/3"
							classNames={{
								input: "text-white file:text-white file:border-none",
								inputWrapper: "bg-primary",
							}}
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							variant="underlined"
							size="sm"
							placeholder="Họ và tên"
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							type="date"
							size="sm"
							variant="underlined"
						/>
					</div>
					<RadioGroup
						className="flex w-full items-start justify-start"
						orientation="horizontal"
						value={gender.toString()}
						onChange={() => {
							setGender(!gender);
						}}
					>
						<Radio value="true">Nam</Radio>
						<Radio value="false">Nữ</Radio>
					</RadioGroup>
					<Button
						size="md"
						className="w-full bg-primary text-white"
					>
						Xác nhận
					</Button>
				</div>
			</div>
		</div>
	);
};
