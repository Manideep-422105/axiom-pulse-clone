import React from "react";
import { RiCloseLine, RiStarLine } from "react-icons/ri";

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchlistModal({
  isOpen,
  onClose,
}: WatchlistModalProps) {
  if (!isOpen) return null;

  return (
    // UPDATED: Increased blur to 'md'
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="flex flex-col min-w-[596px] max-w-[596px] flex-shrink-0 min-h-[520px] bg-backgroundTertiary border-[1px] border-secondaryStroke rounded-[4px] shadow-2xl"
        style={{ width: "596px" }}
      >
        {/* --- Header --- */}
        <div className="border-primaryStroke border-b-[1px] flex flex-row w-full h-[44px] min-h-[44px] gap-[16px] pl-[8px] pr-[16px] justify-between items-center">
          <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium pl-[8px]">
            Watchlist
          </span>
          <button
            onClick={onClose}
            className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out"
          >
            <RiCloseLine className="text-textSecondary text-[16px] group-hover:text-textPrimary" />
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="flex flex-col w-full h-full max-h-[520px] gap-[0px] justify-start items-center overflow-hidden">
          {/* Table Header */}
          <div
            className="border-primaryStroke/50 border-b-[1px] flex flex-row w-full h-[28px] min-h-[28px] px-[16px] gap-[0px] justify-start items-center sticky top-0 bg-backgroundTertiary z-10"
            style={{ paddingRight: "26px" }}
          >
            <div className="flex flex-row flex-1 h-full justify-start items-center cursor-pointer group">
              <span className="text-textTertiary text-[12px] font-normal group-hover:text-textSecondary">
                Token{" "}
              </span>
            </div>
            <div className="flex flex-row flex-1 h-full justify-start items-center cursor-pointer group">
              <span className="text-textTertiary text-[12px] font-normal group-hover:text-textSecondary">
                Market Cap{" "}
              </span>
            </div>
            <div className="flex flex-row flex-1 h-full justify-start items-center cursor-pointer group">
              <span className="text-textTertiary text-[12px] font-normal group-hover:text-textSecondary">
                1h Volume ↓
              </span>
            </div>
            <div className="flex flex-row w-[100px] h-full justify-start items-center cursor-pointer group">
              <span className="text-textTertiary text-[12px] font-normal group-hover:text-textSecondary">
                Liquidity{" "}
              </span>
            </div>
            <div className="flex flex-row w-[32px] max-w-[32px] h-full justify-end items-center">
              <span className="text-textTertiary text-[12px] font-normal">
                Actions
              </span>
            </div>
          </div>

          {/* Table Body (Empty State) */}
          <div className="flex flex-col w-full flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center h-full gap-[16px] p-[32px]">
              <RiStarLine className="text-[32px] text-textTertiary" />
              <div className="flex flex-col items-center gap-[8px]">
                <span className="text-textSecondary text-[14px] font-medium">
                  Your watchlist is empty
                </span>
                <span className="text-textTertiary text-[12px] text-center">
                  Add tokens to your watchlist by clicking the star icon on any
                  token page
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
