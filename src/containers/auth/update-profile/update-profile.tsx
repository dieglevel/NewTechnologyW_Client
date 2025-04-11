"use client";

import { getProfile, uploadSingleImageApi } from "@/api";
import { avatarDefault, defaultBackground } from "@/assets/images";
import { CalendarIcon, EditIcon, PhoneIcon } from "@/assets/svgs";
import { ErrorResponse } from "@/lib/axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { handleImageChange, handleThumbnailChange, handleUpdateProfile } from "./handle";
import { getLocalTimeZone, now, parseAbsoluteToLocal, parseDate, ZonedDateTime } from "@internationalized/date";
import { DateInput } from "@heroui/date-input";
import Loading from "@/app/loading";

export const UpdateProfile = () => {

	const [idDetailInformation, setIdDetailInformation] = useState<string | null>(null);

	const [previewUrlThumbnailUrl, setPreviewUrlThumbnailUrl] = useState<string | null>(null);
	const [upLoadingThumbnailUrl, setUpLoadingThumbnailUrl] = useState<boolean>(false);
	const thumbnailRef = useRef<HTMLInputElement>(null);

	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [upLoading, setUpLoading] = useState<boolean>(false);
	const avatarlRef = useRef<HTMLInputElement>(null);

	const [fullName, setFullName] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<ZonedDateTime>(now(getLocalTimeZone()));
	const [gender, setGender] = useState<boolean>(true);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		const getUser = async () => {
			try {
				const user = await getProfile();
				if (user.statusCode === 200) {
					setIdDetailInformation(user.data.id);
					setPreviewUrlThumbnailUrl(user.data.thumbnailUrl ?? null);
					setPreviewUrl(user.data.avatarUrl ?? null);
					setFullName(user.data.fullName ?? "");
					setDateOfBirth(
						user.data.dateOfBirth
							? parseAbsoluteToLocal(new Date(user.data.dateOfBirth).toISOString())
							: now(getLocalTimeZone()),
					);
					setGender(user.data.gender ?? true);
					setIsLoading(false);
				}
			} catch (error) {
				const err = error as ErrorResponse;
				addToast({
					title: "Lỗi",
					description: err.message,
					color: "danger",
				});
				setIsLoading(false);
			}
		};
		getUser();
	}, []);

	const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
		setFullName(e.target.value);
	};

	const handleChangeDateOfBirth = (e: ZonedDateTime | null) => {
		if (e) {
			setDateOfBirth(e);
		}
	};

	const handleChangeAvatar = async () => {
		if (avatarlRef.current) {
			avatarlRef.current.click();
		}
	};

	const handleChangeThumbnail = async () => {
		if (thumbnailRef.current) {
			thumbnailRef.current.click();
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex h-screen flex-col items-center gap-6 pt-14">
					<div className="flex flex-col items-center gap-6">
						<h1 className="text-6xl font-bold text-primary">Zalo</h1>
						<div className="flex flex-col items-center">
							<span className="">Đăng ký tài khoản Zalo</span>
							<span className="">Để kết nối với ứng dụng Zalo Web</span>
						</div>
					</div>
					<div className="flex flex-col items-center rounded-lg border bg-white">
						<div className="flex w-full flex-col items-center p-4">
							<span className="text-md font-semibold">Đăng ký tài khoản Zalo</span>
							<hr className="mt-2 flex border-gray-300" />
						</div>
						<div className="flex w-full flex-col items-center justify-center gap-6 px-10 pb-10">
							<div className="relative flex w-full flex-col items-center justify-center gap-2">
								<div
									className="flex cursor-pointer items-center justify-center"
									onClick={handleChangeThumbnail}
								>
									{upLoadingThumbnailUrl && (
										<Spinner
											className="absolute z-20"
											size="lg"
											color="primary"
										/>
									)}
									<Image
										src={previewUrlThumbnailUrl ?? defaultBackground}
										alt="Thumbnail"
										className={`h-60 w-full rounded-lg border-2 border-solid border-slate-100 object-fill shadow-md ${upLoadingThumbnailUrl && "brightness-75"}`}
										width={240}
										height={60}
										priority
									/>

									<Input
										disabled={upLoadingThumbnailUrl}
										ref={thumbnailRef}
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) => {
											handleThumbnailChange(
												idDetailInformation,
												e,
												setUpLoadingThumbnailUrl,
												setPreviewUrlThumbnailUrl,
											);
										}}
									/>
								</div>
								<div
									className={`absolute -bottom-20 flex items-center justify-center ${!upLoading && "cursor-pointer"} `}
									onClick={handleChangeAvatar}
								>
									{" "}
									<div className="absolute -right-0 bottom-0 z-10 flex size-fit translate-x-0 translate-y-0 items-center justify-center rounded-full bg-body p-2 shadow-md transition-all duration-300 ease-in-out hover:bg-slate-200 hover:shadow-lg">
										<EditIcon className="size-5" />
									</div>
									{upLoading && (
										<Spinner
											className="absolute z-20"
											size="lg"
											color="primary"
										/>
									)}
									<Image
										priority
										src={previewUrl || avatarDefault}
										alt="Avatar"
										className={`h-32 w-32 rounded-full border-4 border-blue-500 bg-white object-contain shadow-lg ${upLoading && "brightness-75"}`}
										width={100}
										height={100}
									/>
								</div>
								<Input
									disabled={upLoading}
									ref={avatarlRef}
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) => {
										handleImageChange(
											idDetailInformation,
											e,
											setUpLoading,
											setPreviewUrl,
										);
									}}
								/>
							</div>
							<div className="flex w-full flex-row items-center justify-center gap-2 pt-20">
								<Input
									label="Họ và tên"
									variant="underlined"
									size="sm"
									placeholder="Họ và tên"
									value={fullName}
									onChange={handleChangeFullName}
									isDisabled={isLoadingSubmit}
								/>
							</div>
							<div className="flex w-full flex-row items-center justify-center gap-2">
								<DateInput
									label="Ngày sinh"
									size="sm"
									variant="underlined"
									isDisabled={isLoadingSubmit}
									granularity="day"
									value={dateOfBirth}
									onChange={handleChangeDateOfBirth}
								/>
							</div>
							<RadioGroup
								label="Giới tính"
								className="flex w-full items-start justify-start"
								orientation="horizontal"
								value={gender.toString()}
								onChange={() => {
									setGender(!gender);
								}}
								isDisabled={isLoadingSubmit}
							>
								<Radio value="true">Nam</Radio>
								<Radio value="false">Nữ</Radio>
							</RadioGroup>
							<Button
								size="md"
								className="w-full bg-primary text-white"
								onPress={async () => {
									setIsLoadingSubmit(true);
									setUpLoading(true);
									setUpLoadingThumbnailUrl(true);
									await handleUpdateProfile(
										idDetailInformation,
										{
											gender,
											fullName,
											dateOfBirth: dateOfBirth.toDate(),
										},
									);
									setUpLoading(false);
									setUpLoadingThumbnailUrl(false);
									setIsLoadingSubmit(false);
								}}
								isLoading={isLoadingSubmit}
								isDisabled={isLoadingSubmit}
							>
								Xác nhận
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
