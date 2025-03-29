"use client"

export const SVGButton = () => {
   return (
      <button className="relative p-4 bg-gradient-to-tr from-green-500 to-blue-500 via-purple-500 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="5" fill="none" />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="12">
               Click
            </text>
         </svg>
      </button>
   );
}