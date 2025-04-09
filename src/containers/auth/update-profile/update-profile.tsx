"use client";

import { uploadSingleImageApi } from "@/api";
import { avatarDefault } from "@/assets/images";
import { CalendarIcon, PhoneIcon } from "@/assets/svgs";
import { ErrorResponse } from "@/lib/axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { handleImageChange, handleUpdateProfile } from "./handle";

export const UpdateProfile = () => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

	const [fullName, setFullName] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
	const [gender, setGender] = useState<boolean>(true);

	const [isLoading, setIsLoading] = useState(false);

	const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
		setFullName(e.target.value);
	}

	const handleChangeDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
		setDateOfBirth(new Date(e.target.value));
	}

	const handleChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
		setGender(e.target.value === "true");
	}

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
						<div className="relative flex items-center justify-center">
							{uploading && (
								<Spinner
									className="absolute"
									size="lg"
									color="primary"
								/>
							)}
							<Image
								priority
								src={previewUrl || avatarDefault}
								alt="Avatar"
								className={`h-32 w-32 rounded-full border-4 border-blue-500 object-contain shadow-lg ${uploading && "opacity-70"}`}
								width={100}
								height={100}
							/>
						</div>
						<Input
							disabled={uploading}
							isDisabled={uploading}
							type="file"
							title="Chọn ảnh đại diện"
							placeholder="asd"
							onChange={(e) => handleImageChange(e, setUploading, setPreviewUrl)}
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
							value={fullName}
							onChange={handleChangeFullName}
							isDisabled={isLoading}
						/>
					</div>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							type="date"
							size="sm"
							variant="underlined"
							placeholder="Ngày sinh"
							value={dateOfBirth.toISOString().split("T")[0]}
							onChange={handleChangeDateOfBirth}
							isDisabled={isLoading}
						/>
					</div>
					<RadioGroup
						className="flex w-full items-start justify-start"
						orientation="horizontal"
						value={gender.toString()}
						onChange={() => {
							setGender(!gender);
						}}
						isDisabled={isLoading}
					>
						<Radio value="true">Nam</Radio>
						<Radio value="false">Nữ</Radio>
					</RadioGroup>
					<Button
						size="md"
						className="w-full bg-primary text-white"
						onPress={() => {handleUpdateProfile({
							gender,
							fullName,
							dateOfBirth,
						})}}
						isLoading={isLoading}
						isDisabled={isLoading}
					>
						Xác nhận
					</Button>
				</div>
			</div>
		</div>
	);
};
