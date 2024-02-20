import Spinner from "./spinner/Spinner";
import Button from "./basic/Button";
import { useState } from "react";
import { useEffect } from "react";
import TextField from "./basic/TextField";
import twColors from "tailwindcss/colors";

// Spinner utils
const saturation = 500;
const slices = [
  { color: twColors.red[saturation], text: "Code 1" },
  { color: twColors.green[saturation], text: "Code 2" },
  { color: twColors.blue[saturation], text: "Code 3" },
  { color: twColors.yellow[saturation], text: "Code 4" },
  { color: twColors.purple[saturation], text: "Code 5" },
  { color: twColors.orange[saturation], text: "Code 6" },
];

// States default values
const formStateDefaultValues = {
  minTime: 5000,
  maxTime: 15000,
};

const errorsStateDefaultValues = {
  minTime: "",
  maxTime: "",
};

function WheelOfFortune() {
  // Spinner state
  const [spinStatus, setSpinStatus] = useState("stop");

  // Form states
  const [form, setForm] = useState(formStateDefaultValues);
  const [errors, setErrors] = useState(errorsStateDefaultValues);

  // Form functions
  const controlInput = (name) => ({
    name,
    value: form[name],
    onChange: (e) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { minTime, maxTime } = form;
    if (parseInt(minTime) >= parseInt(maxTime)) {
      setErrors({
        minTime: "مقدار بیشتر یا مساوی از حداکثر زمان چرخش است.",
        maxTime: "مقدار کمتر یا مساوی از حداقل زمان چرخش است.",
      });
    } else {
      setErrors({ minTime: "", maxTime: "" });
      setSpinStatus("spin");
    }
  };

  // Utility functions
  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  // Event handlers
  const handleStopButton = () => {
    setForm(formStateDefaultValues);
    setErrors(errorsStateDefaultValues);
    setSpinStatus("stop");
  };

  // Side effects
  useEffect(() => {
    if (spinStatus === "spin") {
      const { minTime, maxTime } = form;
      const timeToSpin = randomNumber(minTime, maxTime);
      const t = setTimeout(() => {
        setSpinStatus("pause");
      }, timeToSpin);
      return () => {
        clearTimeout(t);
      };
    }
  }, [spinStatus]);

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-center">گردونه شانس!</h2>
      <Spinner status={spinStatus} slices={slices} />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="حداقل زمان چرخش (میلی ثانیه)"
          inputProps={{ type: "number", ...controlInput("minTime") }}
          isError={!!errors.minTime}
          helperText={errors.minTime}
        />
        <TextField
          label="حداکثر زمان چرخش (میلی ثانیه)"
          inputProps={{ type: "number", ...controlInput("maxTime") }}
          isError={!!errors.maxTime}
          helperText={errors.maxTime}
        />
        <div className="flex [&>button]:flex-[100%] md:[&>button]:flex-1 flex-wrap gap-2 w-full">
          <Button type="submit" disabled={spinStatus === "spin"}>
            شروع
          </Button>
          <Button
            onClick={handleStopButton}
            variant="outline"
            disabled={spinStatus === "stop"}
          >
            توقف و شروع مجدد
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WheelOfFortune;
