import React from "react";
export const PlusIcon: React.FC<any> = ({
  width = 16,
  height = 16,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
    {...props}
      fill="none"
      stroke={color}
      height={height}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  );
};
