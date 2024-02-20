import { twJoin } from "tailwind-merge";
import Input from "./Input";

function TextField({ label = "", isError, helperText = "", inputProps }) {
  return (
    <div className="relative flex flex-col gap-2">
      {Boolean(label) && <label htmlFor={inputProps?.name}>{label}</label>}
      <Input color={isError ? "danger" : inputProps?.color} {...inputProps} />
      {Boolean(helperText) && (
        <small className={twJoin(isError && "text-red-500")}>
          {helperText}
        </small>
      )}
    </div>
  );
}

export default TextField;
