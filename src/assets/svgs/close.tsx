import * as React from "react";
import { SVGProps } from "react";
const Close = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		viewBox="0 0 24 24"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2.5}
				d="m7 7 10 10M7 17 17 7"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path
					fill="#fff"
					d="M0 0h24v24H0z"
				/>
			</clipPath>
		</defs>
	</svg>
);
export default Close;
