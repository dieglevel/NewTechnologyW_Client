import { SVGProps } from "react"

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
	<svg
		viewBox="0 0 32 32"
    	xmlns="http://www.w3.org/2000/svg"
		fill="none"
		strokeWidth={2}
		stroke="currentColor"
		{...props}
	>
		<path
      d="M2.1 8a5.9 5.9 0 1 1 11.8 0A5.9 5.9 0 0 1 2.1 8ZM8 .9a7.1 7.1 0 1 0 4.423 12.654l.011.012 5 5a.8.8 0 1 0 1.132-1.132l-5-5-.012-.011A7.1 7.1 0 0 0 8 .9Z"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
  )
}
