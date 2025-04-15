import * as React from "react";
import { SVGProps } from "react";
const Reload = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		{...props}
	>
		<g
			strokeWidth={0}
			fill="none"
			fillRule="evenodd"
		>
			<path d="M0 0h24v24H0z" />
			<path
				strokeLinecap="round"
				strokeWidth={2}
				d="M4 13a8 8 0 1 0 3.755-6.782"
			/>
			<path
				strokeLinecap="round"
				strokeWidth={2}
				d="m9.238 1.898-1.74 3.941a1 1 0 0 0 .512 1.319l3.94 1.74"
			/>
		</g>
	</svg>
);
export default Reload;
