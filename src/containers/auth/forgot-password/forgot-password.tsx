"use client";

import { ArrowBack, PhoneIcon } from "@/assets/svgs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkForget } from "./handle";
import { forgetApi } from "@/api";

export const ForgotPassword = () => {
	const router = useRouter();

	const [identify, setIdentify] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const [error, setError] = useState<{
		errorIdentify: string;
	}>({
		errorIdentify: "",
	});

	const handleChangeIdentify = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIdentify(e.target.value);
	};

	const handleSubmit = () => {
		setLoading(true);
		const checkField = checkForget(identify, setError);
		if (!checkField) {
			setLoading(false);
			return;
		}

		const handleForget = async () => {
			try {
				const response = await forgetApi(identify);
				if (response?.statusCode === 201) {
					router.push("/otp?identifier=" + identify + "&type=forget");
				}
			} catch (e) {
				addToast({
					title: "Không tìm thấy tài khoản",
					color: "danger",
				});
			} finally {
				setLoading(false);
			}
		};

		handleForget();

		// Call API to register here
	};

	return (
		<div className="flex h-screen flex-col items-center gap-6 pt-14">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-6xl font-bold text-primary">Zalo</h1>
				<div className="flex flex-col items-center">
					<span className="">Khôi phục mật khẩu Zalo</span>
					<span className="">Để kết nối với ứng dụng Zalo Web</span>
				</div>
			</div>
			<div className="flex h-80 w-128 flex-col items-center rounded-lg border bg-white">
				<div className="flex w-full flex-col items-center p-10">
					<span className="text-md font-semibold">Nhập số điện thoại hoặc email</span>
					{/* <hr className="flex mt-2 border-gray-300 w-128" /> */}
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-8 px-20">
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<Input
							
							value={identify}
							onChange={handleChangeIdentify}
							variant="underlined"
							size="sm"
							placeholder="Số điện thoại hoặc email"
						/>
					</div>
					<Button
						size="md"
						className="w-full bg-primary text-white"
						onPress={() => handleSubmit()}
					>
						Tiếp tục
					</Button>
					<div className="flex w-full flex-row justify-start">
						<Link
							className="flex w-full flex-row items-center justify-start"
							href="/login"
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
