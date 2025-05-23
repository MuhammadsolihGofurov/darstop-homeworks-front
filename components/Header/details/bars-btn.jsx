import { toggleOffanvas } from "@/redux/slice/settings";
import React from "react";
import { useDispatch } from "react-redux";

export default function BarsBtn({ isSidebar }) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleOffanvas())}
      className={`relative z-0 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:bg-accent w-7 h-7 after:opacity-0 after:scale-0 hover:after:scale-100 hover:after:opacity-100 after:transition-all after:duration-200 after:bg-opacity-20  items-center justify-center  ${isSidebar ? "hidden" : "lg:hidden flex"}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
        <path
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
          className="fill-gray-700"
        ></path>
      </svg>
    </button>
  );
}
