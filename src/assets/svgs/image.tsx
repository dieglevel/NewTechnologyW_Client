import { SVGProps } from "react";
export const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
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
	  d="M9 11.729a2 2 0 1 0 0-4 2 2 0 0 0 0 4M21 15.729l-3.086-3.086a2 2 0 0 0-2.828 0L6 21.729"
	></path>
 </svg>
);
