import {Spinner} from "@heroui/spinner";
export default function Loading() {
	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<Spinner size="lg" />
		</div>
	);
}
