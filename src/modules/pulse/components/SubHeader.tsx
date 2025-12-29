import React from "react";
import { Settings, Star, LineChart } from "lucide-react";

export const SubHeader = () => {
  return (
    <div className="grayscale-[30%] hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-[28px] gap-[8px] px-[16px] pb-[1px] overflow-hidden border-b border-primaryStroke sm:border-primaryStroke/50 bg-background text-textPrimary">
      {/* Section 1: Settings */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <span className="contents">
          <button
            type="button"
            className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]"
          >
            <Settings size={14} strokeWidth={2} />
          </button>
        </span>
      </div>

      {/* Divider */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        {/* distinct divider color using your config */}
        <div className="w-[1px] h-[16px] bg-primaryStroke"></div>
      </div>

      {/* Section 2: Star and Chart */}

      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <span className="contents">
          <button
            type="button"
            className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textSecondary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]"
          >
            <Star size={14} strokeWidth={2} />
          </button>
        </span>
        <span className="contents">
          <button
            type="button"
            className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]"
          >
            <LineChart size={14} strokeWidth={2} />
          </button>
        </span>
      </div>

      {/* Divider */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <div className="w-[1px] h-[16px] bg-primaryStroke"></div>
      </div>

      {/* Section 3: Ticker/Bin Container */}
      <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
        <div className="h-full flex flex-row gap-[1px] pt-[1px] items-center overflow-x-auto ticker-scroll-container [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-ticker">
          <div
            style={{
              width: "0px",
              height: "100%",
              position: "relative",
              display: "flex",
            }}
          >
            {/* Dynamic content */}
          </div>
        </div>
      </div>
    </div>
  );
};
