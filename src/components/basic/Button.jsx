import { twMerge } from "tailwind-merge";

function Button({ className = "", variant = "solid", ...rest }) {
  return (
    <button
      className={twMerge(
        "py-2 px-3 rounded transition",
        variant === "solid" &&
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        variant === "outline" &&
          "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100",
        className
      )}
      {...rest}
      type={rest.type || "button"}
    />
  );
}

export default Button;
