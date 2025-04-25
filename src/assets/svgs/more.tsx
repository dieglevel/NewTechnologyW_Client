import * as React from "react";
export const More = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<circle
			cx={12}
			cy={12}
			r={1}
		/>
		<circle
			cx={19}
			cy={12}
			r={1}
		/>
		<circle
			cx={5}
			cy={12}
			r={1}
		/>
	</svg>
);
export default More;
