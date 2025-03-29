
export default function Loading() {
	return (
		<div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
			<div className="animate-spin rounded-full bg-gradient-to-tr from-green-500 via-purple-500 to-blue-500 p-4">
				<div className="rounded-full bg-white">
					<div className="h-24 w-24 rounded-full"></div>
				</div>
			</div>
		</div>
	);
}
