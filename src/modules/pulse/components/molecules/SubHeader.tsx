import React, { memo } from "react";
import { Settings, Star, LineChart, LucideIcon } from "lucide-react";

interface HeaderButtonProps {
  icon: LucideIcon;
  className?: string;
}

const Divider = memo(() => (
  <div className="flex flex-row h-full items-center z-20 gap-[8px]">
    <div className="w-[1px] h-[16px] bg-primaryStroke"></div>
  </div>
));

Divider.displayName = "Divider";

const HeaderButton = memo<HeaderButtonProps>(
  ({ icon: Icon, className = "text-textTertiary" }) => (
    <span className="contents">
      <button
        type="button"
        className={`min-w-[24px] min-h-[24px] flex items-center justify-center hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px] ${className}`}
      >
        <Icon size={14} strokeWidth={2} />
      </button>
    </span>
  )
);

HeaderButton.displayName = "HeaderButton";

export const SubHeader = memo(() => {
  return (
    <div className="grayscale-[30%] hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-[28px] gap-[8px] px-[16px] pb-[1px] overflow-hidden border-b border-primaryStroke sm:border-primaryStroke/50 bg-background text-textPrimary">
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <HeaderButton icon={Settings} className="text-textTertiary" />
      </div>

      <Divider />

      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <HeaderButton icon={Star} className="text-textSecondary" />
        <HeaderButton icon={LineChart} className="text-textTertiary" />
      </div>

      <Divider />

      <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
        <div className="h-full flex flex-row gap-[1px] pt-[1px] items-center overflow-x-auto ticker-scroll-container [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-ticker">
          <div
            style={{
              width: "0px",
              height: "100%",
              position: "relative",
              display: "flex",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});

SubHeader.displayName = "SubHeader";
