import * as React from "react";
import { SVGProps } from "./interface";
export const ChatIcon = ({ size = 25, color = "red", strokeWidth = 1 }: SVGProps) => (
	<svg
		viewBox="0 0 36 36"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
	>
		<path
			d="M12.5084 29.6669C15.5303 31.2171 19.0065 31.637 22.3106 30.8509C25.6147 30.0648 28.5294 28.1245 30.5295 25.3795C32.5295 22.6346 33.4834 19.2655 33.2193 15.8795C32.9551 12.4935 31.4903 9.31311 29.0887 6.91154C26.6872 4.50998 23.5068 3.04514 20.1208 2.78098C16.7347 2.51682 13.3657 3.47073 10.6207 5.47079C7.87579 7.47086 5.93545 10.3856 5.14937 13.6897C4.3633 16.9938 4.78318 20.47 6.33335 23.4919L3.16669 32.8336L12.5084 29.6669Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
