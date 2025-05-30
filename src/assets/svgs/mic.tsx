import * as React from "react";
const MicIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-5 0 32 32"
		{...props}
	>
		<title>{"microphone"}</title>
		<desc>{"Created with Sketch Beta."}</desc>
		<defs />
		<g
			id="Page-1"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<g
				id="Icon-Set-Filled"
				transform="translate(-107.000000, -309.000000)"
				fill="currentColor" // 👈 đổi ở đây
			>
				<path
					d="M118,333 C121.866,333 125,329.866 125,326 L125,316 C125,312.134 121.866,309 118,309 C114.134,309 111,312.134 111,316 L111,326 C111,329.866 114.134,333 118,333 L118,333 Z M129,328 L127,328 C126.089,332.007 122.282,335 118,335 C113.718,335 109.911,332.007 109,328 L107,328 C107.883,332.799 112.063,336.51 117,336.955 L117,339 L116,339 C115.448,339 115,339.448 115,340 C115,340.553 115.448,341 116,341 L120,341 C120.552,341 121,340.553 121,340 C121,339.448 120.552,339 120,339 L119,339 L119,336.955 C123.937,336.51 128.117,332.799 129,328 L129,328 Z"
					id="microphone"
				/>
			</g>
		</g>
	</svg>
);
export default MicIcon;
