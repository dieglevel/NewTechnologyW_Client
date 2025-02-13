import { SVGProps } from "react";
export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="12"
		height="13"
		viewBox="0 0 12 13"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M9.5 11V10C9.5 9.46957 9.28929 8.96086 8.91421 8.58579C8.53914 8.21071 8.03043 8 7.5 8H4.5C3.96957 8 3.46086 8.21071 3.08579 8.58579C2.71071 8.96086 2.5 9.46957 2.5 10V11"
			stroke="#0C0C0C"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6Z"
			stroke="#0C0C0C"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
