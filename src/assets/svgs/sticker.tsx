import { SVGProps } from "react";
export const StickerIcon = (props: SVGProps<SVGSVGElement>) => (
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
	  d="M15.5 3.729H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-10.5z"
	></path>
	<path
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  strokeWidth="2"
	  d="M14 3.729v4a2 2 0 0 0 2 2h4M8 13.729h.01M16 13.729h.01M10 16.729s.8 1 2 1c1.3 0 2-1 2-1"
	></path>
 </svg>
);
