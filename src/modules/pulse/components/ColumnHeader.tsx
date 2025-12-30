import React from "react";
import { RiFlashlightFill, RiEqualizer3Line } from "react-icons/ri";

interface ColumnHeaderProps {
  title: string;
}

export default function ColumnHeader({ title }: ColumnHeaderProps) {
  return (
    <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap flex-row w-full gap-3 min-h-[48px] justify-end items-center pr-3 pl-1 lg:pl-3 xl:pl-3 border-b border-primaryStroke bg-backgroundSecondary">
      
      {/* --- LEFT: Title --- */}
      <div className="flex flex-row items-center gap-4 flex-1">
        <span className="text-textPrimary text-[16px] font-medium flex-1">
          {title}
        </span>
      </div>

      {/* --- RIGHT: Controls --- */}
      <div className="flex flex-row items-center gap-3">
        
        {/* 1. Search Bar */}
        <div className="whitespace-nowrap font-normal border border-primaryStroke flex flex-row flex-1 min-w-0 max-w-[200px] h-[28px] pl-[9px] pr-[1px] gap-2 justify-start items-center rounded-full transition-colors duration-125 cursor-text overflow-hidden hover:bg-primaryStroke/35">
          <input
            placeholder="Search by ticker or name"
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex flex-1 min-w-0 text-[12px] bg-transparent outline-none text-textPrimary font-medium placeholder:text-textTertiary"
            type="text"
          />
        </div>

        {/* 2. Complex Filter Pill (Visible on Large screens) */}
        <div className="hidden lg:block">
          <div className="overflow-hidden whitespace-nowrap border border-primaryStroke font-normal flex flex-row h-[28px] pl-1 gap-1.5 justify-start items-center rounded-full hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer">
            
            {/* Flashlight Icon */}
            <span className="flex text-[14px] text-textTertiary font-medium pl-1">
              <RiFlashlightFill />
            </span>

            {/* Input Field */}
            <div className="flex flex-1 sm:max-w-[32px] min-w-0">
              <input
                placeholder="0.0"
                className="text-[12px] w-full text-textPrimary placeholder:text-textTertiary font-medium outline-none bg-transparent text-left"
                type="text"
              />
            </div>

            {/* SOL Icon (Using generic URL for display) */}
            <img
              alt="SOL"
              width="14"
              height="14"
              src="https://cryptologos.cc/logos/solana-sol-logo.png"
              className="w-3.5 h-3.5"
            />

            {/* P1 / P2 / P3 Toggles */}
            <div className="border-l border-primaryStroke flex h-full pr-[2px] pl-[2px] gap-[3px] justify-center items-center cursor-pointer">
              
              {/* P1 Button (Active Style) */}
              <button type="button" className="group w-[22px] h-[22px] flex flex-row gap-1 rounded-[4px] justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryBlueHover/10">
                <span className="text-[12px] font-medium transition-colors ease-in-out duration-125 text-primaryBlue hover:text-primaryBlueHover">
                  P1
                </span>
              </button>

              {/* P2 Button (Inactive Style) */}
              <button type="button" className="group w-[22px] h-[22px] flex flex-row gap-1 rounded-[4px] justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60">
                <span className="text-[12px] font-medium transition-colors ease-in-out duration-125 text-textSecondary">
                  P2
                </span>
              </button>

              {/* P3 Button (Inactive Style) */}
              <button type="button" className="group w-[22px] h-[22px] flex flex-row gap-1 rounded-r-full rounded-l-[4px] justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60">
                <span className="text-[12px] font-medium transition-colors ease-in-out duration-125 text-textSecondary">
                  P3
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* 3. Settings Icon */}
        <button
          type="button"
          className="flex flex-row p-1 w-[24px] h-[24px] justify-center items-center transition-opacity duration-150 ease-in-out cursor-pointer rounded-md relative hover:bg-primaryStroke/30"
        >
          <RiEqualizer3Line className="text-[16px] text-textSecondary" />
        </button>

      </div>
    </div>
  );
}