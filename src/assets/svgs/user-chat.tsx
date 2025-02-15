import { SVGProps } from "react";
export const UserChatIcon = (props: SVGProps<SVGSVGElement>) => (
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
	  d="M19 3.729H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-14a2 2 0 0 0-2-2"
	></path>
	<path
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  strokeWidth="2"
	  d="M12 13.729a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 21.729v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
	></path>
 </svg>
);
