import * as React from "react";
import { SVGProps } from "./interface";
export const SettingIcon = ({ size = 25, color = "red", strokeWidth = 1 }: SVGProps) => (
	<svg
		viewBox="0 0 36 37"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
	>
		<path
			d="M18.33 3.72852H17.67C16.8744 3.72852 16.1113 4.04459 15.5487 4.6072C14.9861 5.1698 14.67 5.93287 14.67 6.72852V6.99852C14.6695 7.5246 14.5306 8.0413 14.2673 8.49677C14.004 8.95224 13.6256 9.33047 13.17 9.59352L12.525 9.96852C12.0689 10.2318 11.5516 10.3704 11.025 10.3704C10.4984 10.3704 9.98106 10.2318 9.525 9.96852L9.3 9.84852C8.6116 9.45141 7.79376 9.34368 7.02601 9.54898C6.25825 9.75427 5.60333 10.2558 5.205 10.9435L4.875 11.5135C4.4779 12.2019 4.37017 13.0198 4.57546 13.7875C4.78076 14.5553 5.28231 15.2102 5.97 15.6085L6.195 15.7585C6.64842 16.0203 7.02543 16.3961 7.28858 16.8488C7.55173 17.3014 7.69184 17.815 7.695 18.3385V19.1035C7.6971 19.6321 7.55948 20.1519 7.29607 20.6103C7.03266 21.0686 6.65282 21.4492 6.195 21.7135L5.97 21.8485C5.28231 22.2468 4.78076 22.9018 4.57546 23.6695C4.37017 24.4373 4.4779 25.2551 4.875 25.9435L5.205 26.5135C5.60333 27.2012 6.25825 27.7028 7.02601 27.9081C7.79376 28.1133 8.6116 28.0056 9.3 27.6085L9.525 27.4885C9.98106 27.2252 10.4984 27.0866 11.025 27.0866C11.5516 27.0866 12.0689 27.2252 12.525 27.4885L13.17 27.8635C13.6256 28.1266 14.004 28.5048 14.2673 28.9603C14.5306 29.4157 14.6695 29.9324 14.67 30.4585V30.7285C14.67 31.5242 14.9861 32.2872 15.5487 32.8498C16.1113 33.4124 16.8744 33.7285 17.67 33.7285H18.33C19.1257 33.7285 19.8887 33.4124 20.4513 32.8498C21.0139 32.2872 21.33 31.5242 21.33 30.7285V30.4585C21.3305 29.9324 21.4694 29.4157 21.7327 28.9603C21.996 28.5048 22.3744 28.1266 22.83 27.8635L23.475 27.4885C23.9311 27.2252 24.4484 27.0866 24.975 27.0866C25.5016 27.0866 26.0189 27.2252 26.475 27.4885L26.7 27.6085C27.3884 28.0056 28.2062 28.1133 28.974 27.9081C29.7418 27.7028 30.3967 27.2012 30.795 26.5135L31.125 25.9285C31.5221 25.2401 31.6298 24.4223 31.4245 23.6545C31.2192 22.8868 30.7177 22.2318 30.03 21.8335L29.805 21.7135C29.3472 21.4492 28.9673 21.0686 28.7039 20.6103C28.4405 20.1519 28.3029 19.6321 28.305 19.1035V18.3535C28.3029 17.8249 28.4405 17.3051 28.7039 16.8468C28.9673 16.3884 29.3472 16.0078 29.805 15.7435L30.03 15.6085C30.7177 15.2102 31.2192 14.5553 31.4245 13.7875C31.6298 13.0198 31.5221 12.2019 31.125 11.5135L30.795 10.9435C30.3967 10.2558 29.7418 9.75427 28.974 9.54898C28.2062 9.34368 27.3884 9.45141 26.7 9.84852L26.475 9.96852C26.0189 10.2318 25.5016 10.3704 24.975 10.3704C24.4484 10.3704 23.9311 10.2318 23.475 9.96852L22.83 9.59352C22.3744 9.33047 21.996 8.95224 21.7327 8.49677C21.4694 8.0413 21.3305 7.5246 21.33 6.99852V6.72852C21.33 5.93287 21.0139 5.1698 20.4513 4.6072C19.8887 4.04459 19.1257 3.72852 18.33 3.72852Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M18 23.2285C20.4853 23.2285 22.5 21.2138 22.5 18.7285C22.5 16.2432 20.4853 14.2285 18 14.2285C15.5147 14.2285 13.5 16.2432 13.5 18.7285C13.5 21.2138 15.5147 23.2285 18 23.2285Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
