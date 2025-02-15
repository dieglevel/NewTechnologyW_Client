import { SVGProps } from "react";
export const FileIcon = (props: SVGProps<SVGSVGElement>) => (
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
			strokeWidth="2"
			d="M13.234 20.98 21 13.028M16 6.729l-8.414 8.586a2 2 0 0 0 2.828 2.828l8.414-8.586A4 4 0 0 0 13.172 3.9l-8.415 8.585a6 6 0 0 0 8.486 8.486"
		></path>
	</svg>
);
