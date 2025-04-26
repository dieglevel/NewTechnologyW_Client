"use client";

import { UserX, Home, ArrowLeft } from "lucide-react";

interface DisbandedGroupProps {
	groupName?: string;
}

export function DisbandedGroup({groupName = "Nhóm chat" }: DisbandedGroupProps) {
	return (
		<div className="flex h-full w-full items-center justify-center p-4">
			<div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
				{/* Header */}
				<div className="p-6 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
						<UserX className="h-8 w-8 text-red-500" />
					</div>
					<h2 className="text-xl font-bold text-gray-800">Nhóm đã giải tán</h2>
					<p className="mt-1 text-gray-500">{groupName} đã bị giải tán bởi người quản trị nhóm.</p>
				</div>

				{/* Content */}
				<div className="px-6 pb-4 text-center text-gray-600">
					<p>
						Bạn không thể gửi tin nhắn hoặc xem nội dung mới trong nhóm này nữa. Vui lòng quay lại
						danh sách nhóm hoặc trang chủ.
					</p>
				</div>

			</div>
		</div>
	);
}
