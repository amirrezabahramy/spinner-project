import { twMerge } from "tailwind-merge";
import Navigation from "../icons/Navigation";

function Spinner({ status, slices }) {
  return (
    <div className="relative">
      <div
        className={twMerge(
          "relative w-[16rem] h-[16rem] bg-transparent border-2 rounded-full shadow-xl overflow-hidden animate-spin sm:w-[20rem] sm:h-[20rem] md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem]",
          status === "pause" && "animate-pause",
          status === "stop" && "animate-none"
        )}
      >
        {slices.map((slice, index) => (
          <div
            key={index}
            style={{
              transform: `rotate(${index * (360 / slices.length)}deg) skewY(${
                90 - 360 / slices.length
              }deg)`,
            }}
            className="absolute top-0 end-0 w-1/2 h-1/2 overflow-hidden origin-bottom-right"
          >
            <div
              style={{
                backgroundColor: slice.color,
                transform: `skewY(-${90 - 360 / slices.length}deg) rotate(-${
                  360 / (slices.length * 2)
                }deg)`,
              }}
              className="absolute -start-full w-[200%] h-[200%] text-center text-white pt-5 shadow"
            >
              <span className="font-irbold">{slice.text}</span>
            </div>
          </div>
        ))}
      </div>
      <Navigation className="absolute rotate-90 top-1/2 -start-14 -translate-y-1/2 [&>*]:fill-slate-800 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
    </div>
  );
}

export default Spinner;
