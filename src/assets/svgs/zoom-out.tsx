import * as React from "react"
import { SVGProps } from "react"
const ZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 11a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-9a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M7 11a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ZoomOut
