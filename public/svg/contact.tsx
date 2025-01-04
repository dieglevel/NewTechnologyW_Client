import * as React from "react";
import { SVGProps } from "./interface";
export const ContactIcon = ({ size = 25, color = "red", strokeWidth = 1 }: SVGProps) => (
	<svg
		viewBox="0 0 38 38"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
	>
		<path
			d="M25.3333 3.1665V6.33317"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M11.0833 34.8333V31.6667C11.0833 30.8268 11.4169 30.0214 12.0108 29.4275C12.6047 28.8336 13.4101 28.5 14.25 28.5H23.75C24.5898 28.5 25.3953 28.8336 25.9891 29.4275C26.583 30.0214 26.9166 30.8268 26.9166 31.6667V34.8333"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.6667 3.1665V6.33317"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M19 22.1665C21.6234 22.1665 23.75 20.0399 23.75 17.4165C23.75 14.7932 21.6234 12.6665 19 12.6665C16.3766 12.6665 14.25 14.7932 14.25 17.4165C14.25 20.0399 16.3766 22.1665 19 22.1665Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M30.0833 6.3335H7.91667C6.16776 6.3335 4.75 7.75126 4.75 9.50016V31.6668C4.75 33.4157 6.16776 34.8335 7.91667 34.8335H30.0833C31.8322 34.8335 33.25 33.4157 33.25 31.6668V9.50016C33.25 7.75126 31.8322 6.3335 30.0833 6.3335Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
