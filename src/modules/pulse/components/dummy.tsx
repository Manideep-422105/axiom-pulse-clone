import React from "react";

import {
  RiFileCopyFill,
  RiQuillPenLine,
  RiSearchLine,
  RiGroupLine,
  RiTrophyLine,
  RiVipCrown2Line,
  RiEyeLine,
  RiUserStarLine,
  RiCrosshair2Line,
  RiGhostLine,
  RiBox3Line,
  RiCapsuleFill, // Substituting for 'icon-pill'
  RiRestaurantLine, // Substituting for 'icon-chef-hat'
} from "react-icons/ri";

// Updated Interface to match the richness of the data

export interface TokenData {
  image: string;

  ticker: string; // "A.P.U."

  name: string; // "Administrative Performance Unit"

  address: string; // "2N8h...pump"

  timeAgo: string; // "15s"

  // Stats

  holders: number;

  topTraders: number;

  trophies: number;

  crowns: string; // "0/6"

  views: number;

  // Badges (Bottom Row)

  badges: {
    type: "holders" | "chef" | "sniper" | "ghost" | "boxes";

    label: string;

    subLabel?: string;

    color: "green" | "blue" | "red" | "gray";
  }[];
}

export default function TokenCard({ data }: { data: TokenData }) {
  return (
    <div className="flex flex-row w-full gap-[12px] px-[12px] pt-[12px] pb-[2px] justify-start items-center hover:bg-white/5 transition-colors cursor-pointer border-b border-primaryStroke">
      {/* --- LEFT COLUMN: Image & Progress Ring --- */}

      <div className="flex flex-col items-center gap-[4px]">
        <div className="relative w-[74px] h-[74px] flex justify-center items-center">
          {/* 1. Pump Badge (Bottom Right) */}

          <div className="absolute bottom-[-4px] right-[-4px] z-30 p-[1px] bg-primaryBlue rounded-full flex justify-center items-center w-[16px] h-[16px]">
            <div className="w-[14px] h-[14px] bg-background rounded-full flex justify-center items-center">
              {/* Tiny dot or icon representing the pump logo */}

              <div className="w-1.5 h-1.5 bg-primaryBlue rounded-full"></div>
            </div>
          </div>

          {/* 2. Main Image Container */}

          <div className="absolute z-20 bg-primaryStroke/20 p-[1px] rounded-[4px]">
            <div className="bg-backgroundSecondary p-[2px] rounded-[3px]">
              <div className="w-[68px] h-[68px] relative rounded-[1px] overflow-hidden">
                <img
                  src={data.image}
                  alt={data.ticker}
                  className="w-full h-full object-cover"
                />

                {/* Border Overlay */}

                <div className="absolute inset-0 border border-textPrimary/10 pointer-events-none rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* 3. Progress Ring SVG (The square border effect) */}

          <div className="absolute top-0 left-0 w-[74px] h-[74px] z-10 flex items-center justify-center">
            <svg
              width="78"
              height="78"
              viewBox="0 0 78 78"
              className="rotate-[-90deg]"
            >
              {/* Background Path */}

              <path
                d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                className="text-primaryGreen opacity-20"
                stroke="currentColor"
                fill="transparent"
                strokeWidth="1"
              />

              {/* Progress Path (Animated/Filled) */}

              <path
                d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                className="text-primaryGreen"
                stroke="currentColor"
                fill="transparent"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="296"
                strokeDashoffset="250" // Change this value to animate progress
              />
            </svg>
          </div>
        </div>

        {/* Address Pill */}

        <button className="text-textTertiary hover:text-primaryBlueHover transition-colors text-[10px] font-medium bg-primaryStroke/20 px-1.5 py-0.5 rounded flex items-center gap-1">
          {data.address}
        </button>
      </div>

      {/* --- RIGHT COLUMN: Content --- */}

      <div className="flex flex-col flex-1 h-full gap-[8px] justify-start items-start min-w-0 pb-[12px]">
        {/* ROW 1: Header (Ticker & Name) */}

        <div className="flex flex-row w-full justify-between items-end min-w-0">
          <div className="flex flex-row gap-[4px] justify-start items-center overflow-hidden">
            <span className="text-textPrimary text-[16px] font-medium tracking-tight whitespace-nowrap">
              {data.ticker}
            </span>

            <div className="min-w-0 flex-1 overflow-hidden flex items-center gap-1 text-textTertiary hover:text-primaryBlueHover cursor-pointer transition-colors">
              <span className="text-[14px] font-medium tracking-tight truncate">
                {data.name}
              </span>

              <RiFileCopyFill className="text-[14px]" />
            </div>
          </div>
        </div>

        {/* ROW 2: Stats Line (Time | Icons | Counts) */}

        <div className="flex flex-row w-full h-[18px] gap-[12px] items-center">
          {/* Time */}

          <span className="text-primaryGreen text-[14px] font-medium">
            {data.timeAgo}
          </span>

          {/* Action Icons */}



          {/* Stats Group (Hidden on small screens based on your HTML, but flexible here) */}


        </div>

        {/* ROW 3: Badges / Pills */}

        <div className="hidden xl:flex flex-row w-full h-[24px] gap-[4px] items-center mt-1">
          {data.badges.map((badge, idx) => (
            <Badge key={idx} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Component for the Pill Badges (Row 3)

function Badge({ badge }: { badge: TokenData["badges"][0] }) {
  const icons = {
    holders: <RiUserStarLine className="text-[14px]" />,

    chef: <RiRestaurantLine className="text-[12px]" />, // Chef Hat Sub

    sniper: <RiCrosshair2Line className="text-[14px]" />,

    ghost: <RiGhostLine className="text-[14px]" />,

    boxes: <RiBox3Line className="text-[12px]" />,
  };

  // Dynamic text color based on prop

  const textColor =
    badge.color === "green"
      ? "text-primaryGreen"
      : badge.color === "blue"
      ? "text-primaryBlue"
      : "text-textSecondary";

  return (
    <div
      className={`

         flex flex-row gap-[4px] h-[24px] px-[6px] justify-start items-center rounded-full

         bg-backgroundSecondary border border-primaryStroke/50

         ${textColor}

      `}
    >
      <span className={textColor}>{icons[badge.type]}</span>

      <span className="text-[12px] font-medium">{badge.label}</span>

      {badge.subLabel && (
        <span className="text-textSecondary text-[11px] font-medium ml-1">
          {badge.subLabel}
        </span>
      )}
    </div>
  );
}
