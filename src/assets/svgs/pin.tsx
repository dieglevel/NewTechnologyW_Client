import { SVGProps } from "react";
export const PinIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="12"
		fill="none"
		viewBox="0 0 12 12"
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 8.5V11M4.5 5.38a1 1 0 0 1-.555.895l-.89.45a1 1 0 0 0-.555.895V8a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-.38a1 1 0 0 0-.555-.895l-.89-.45A1 1 0 0 1 7.5 5.38V3.5A.5.5 0 0 1 8 3a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2 .5.5 0 0 1 .5.5z"
		></path>
	</svg>
);
