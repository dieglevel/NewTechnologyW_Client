"use client";

import { EyeFilledIcon, EyeSlashFilledIcon, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changeEmailApi, changePasswordApi, getAccountApi, getInformationVerifyApi } from "@/api/auth";
import { ErrorResponse } from "@/lib/axios";
import { LocalStorage } from "@/lib/local-storage";
import { REGEX_EMAIL, REGEX_PHONEVN } from "@/utils";

export const ChangeMail = () => {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [newEmail, setNewEmail] = useState<string>("");
	const [newPhone, setNewPhone] = useState<string>("");
	const [sendMethod, setSendMethod] = useState<"email" | "phone">("email");
	const [disabled, isDisabled] = useState<boolean>(true) 

	useEffect(() => {
		const getUser = async () => {
			const data = await getInformationVerifyApi();
			if (data) {
				if (data.statusCode === 200) {
					const user = data.data;
					setEmail(user.email)
					setPhone(user.phone)
					setNewEmail(user.email);
					setNewPhone(user.phone);
				}
			}
		};

		getUser();
	}, []);


	useEffect(() => {
		if (newEmail === email && newPhone === phone) {
			isDisabled(true);
		} else {
			isDisabled(false);
		}
	}, [newEmail, newPhone]);

	const [error, setError] = useState<{
		errorEmail: string;
		errorPhone: string;
		errorPassword: string;
		errorGeneral: string;
	}>({
		errorEmail: "",
		errorPhone: "",
		errorPassword: "",
		errorGeneral: "",
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewEmail(e.target.value);
	};

	const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPhone(e.target.value);
		if (newEmail === email && newPhone === phone) {
			isDisabled(true);
		} else {
			isDisabled(false);
		}
	};

	const handleSendMethodChange = (value: string) => {
		setSendMethod(value as "email" | "phone");
	};

	const validateFields = () => {
		let isValid = true;
		const newError = {
			errorEmail: "",
			errorPhone: "",
			errorPassword: "",
			errorGeneral: "",
		};

		if (sendMethod === "email") {
			if (!newEmail) {
				newError.errorEmail = "Vui lòng nhập email";
				isValid = false;
			} else if (!REGEX_EMAIL.test(newEmail)) {
				newError.errorEmail = "Email không hợp lệ";
				isValid = false;
			}
		} else {
			if (!newPhone) {
				newError.errorPhone = "Vui lòng nhập số điện thoại";
				isValid = false;
			} else if (!REGEX_PHONEVN.test(phone)) {
				newError.errorPhone = "Số điện thoại không hợp lệ";
				isValid = false;
			}
		}

		if (!newEmail && !newPhone) {
			newError.errorPhone	 = "Vui lòng nhập ít nhất một phương thức liên hệ";
			isValid = false;
		}

		

		

		setError(newError);
		return isValid;
	};

	const handleSubmit = () => {
		setLoading(true);

		if (!validateFields()) {
			setLoading(false);
			return;
		}

		const handleResetPassword = async () => {
			try {
				setLoading(true);
				const contactInfo = sendMethod === "email" ? email : phone;

				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Yêu cầu đặt lại mật khẩu đã được gửi",
					description: `Mã OTP đã được gửi đến ${sendMethod === "email" ? "email" : "số điện thoại"} của bạn`,
					color: "success",
				});
				const isSuccess = await changeEmailApi(newEmail, newPhone, sendMethod)
				console.log("second")
				if(isSuccess)
					router.push(`/otp?identifier=${sendMethod==="email"?email:phone}&type=update`);
			} catch (e) {
				const error = e as ErrorResponse;
				addToast({
					classNames: { title: "font-bold", description: "text-sm" },
					variant: "solid",
					title: "Không thể đặt lại mật khẩu",
					description:
						error.statusCode === 404
							? `${sendMethod === "email" ? "Email" : "Số điện thoại"} không tồn tại trong hệ thống`
							: "Có lỗi xảy ra, vui lòng thử lại sau",
					color: "danger",
				});
				setLoading(false);
			}
		};

		handleResetPassword();
	};

	const emailOptionEnabled = !!email;
	const phoneOptionEnabled = !!phone;

	return (
		<div className="flex h-screen flex-col items-center gap-6 pt-14">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Đặt lại mật khẩu Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-4">
					<span className="text-md font-semibold">Sửa thông tin xác thực</span>
					<hr className="mt-2 flex w-full border-gray-300" />
				</div>

				<div className="flex w-full flex-col items-center justify-center gap-6 px-20 py-14">
					<div className="flex w-full flex-col">
						<Input
							errorMessage={error.errorEmail}
							isInvalid={!!error.errorEmail}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							disabled={loading}
							variant="underlined"
							size="sm"
							value={newEmail}
							onChange={handleChangeEmail}
							placeholder="Email"
						/>
					</div>

					<div className="flex w-full flex-col">
						<Input
							errorMessage={error.errorPhone}
							isInvalid={!!error.errorPhone}
							classNames={{ errorMessage: "text-md", input: "text-xl" }}
							disabled={loading}
							variant="underlined"
							size="sm"
							value={newPhone}
							onChange={handleChangePhone}
							placeholder="Số điện thoại"
						/>
					</div>

					{/* Send method selection */}
					<div className="flex w-full flex-col">
						<p className="mb-2 text-sm">Gửi mã OTP về:</p>
						{error.errorGeneral && <p className="text-sm text-danger">{error.errorGeneral}</p>}
						<RadioGroup
							value={sendMethod}
							onValueChange={handleSendMethodChange}
							orientation="horizontal"
							className="mt-2"
						>
							<Radio
								value="email"
								isDisabled={!emailOptionEnabled || loading}
								className={!emailOptionEnabled ? "opacity-50" : ""}
							>
								Email {email && `(${email})`}
							</Radio>
							<Radio
								value="phone"
								isDisabled={!phoneOptionEnabled || loading}
								className={!phoneOptionEnabled ? "opacity-50" : ""}
							>
								Số điện thoại {phone && `(${phone})`}
							</Radio>
						</RadioGroup>
					</div>

					<Button
						isLoading={loading}
						disabled={loading || (!emailOptionEnabled && !phoneOptionEnabled)}
						onPress={() => handleSubmit()}
						size="md"
						className="w-full bg-primary text-xl font-bold text-white"
						isDisabled={disabled}
					>
						Tiếp tục
					</Button>
				</div>
			</div>
		</div>
	);
};
