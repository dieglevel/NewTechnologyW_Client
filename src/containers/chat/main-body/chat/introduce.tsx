"use client";

import { useState } from "react";
import { BodyChat, FooterChat, HeaderChat } from "./components";
import Image from "next/image";
import logo from '@/assets/images/introzalo.png'


export const IntroduceView = () => {
	return (
		<div className="flex h-lvh w-full flex-col">
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="mb-4 text-3xl font-bold text-blue-700 md:text-4xl">Welcome to Zalo </h1>
					<Image
						src={logo}
						alt="Background"
						width={300}
						height={300}
						className="mx-auto "
					/>
					<p className="mb-8 text-gray-600">
						💬 Zalo Clone - Kết Nối Mọi Khoảnh Khắc Chào mừng bạn đến với Zalo Clone – nền tảng nhắn
						tin và gọi điện hiện đại, nhanh chóng và bảo mật. Trải nghiệm chat cá nhân, trò chuyện
						nhóm và gọi điện dễ dàng chỉ trong vài thao tác. Đăng nhập ngay để bắt đầu kết nối!
					</p>
				</div>
			</div>
		</div>
	);
};
