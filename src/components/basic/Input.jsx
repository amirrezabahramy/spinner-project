import { twMerge } from "tailwind-merge";

function Input({ className = "", color = "primary", ...rest }) {
  return (
    <input
      className={twMerge(
        "py-2 px-3 outline outline-1 focus:outline-2 rounded",
        color === "primary" && "outline-blue-500 focus:outline-blue-600",
        color === "danger" && "outline-red-500 focus:outline-red-600",
        className
      )}
      {...rest}
    />
  );
}

export default Input;
