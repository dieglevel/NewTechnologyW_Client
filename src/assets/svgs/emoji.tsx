import { SVGProps } from "react";
export const EmojiIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="25"
		fill="none"
		viewBox="0 0 24 25"
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 22.229c5.523 0 10-4.478 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
		></path>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 14.229s1.5 2 4 2 4-2 4-2M9 9.229h.01M15 9.229h.01"
		></path>
	</svg>
);
