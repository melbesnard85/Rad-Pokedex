import type { SVGProps } from "react"

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 1L7 7M7 1L1 7" />
  </svg>
)
export default CloseIcon
