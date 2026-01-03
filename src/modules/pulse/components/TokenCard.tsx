import React, { useEffect, useState, useRef } from "react";
import {
  RiFileCopyFill,
  RiSearchLine,
  RiGroupLine,
  RiTrophyLine,
  RiVipCrown2Line,
  RiEyeLine,
  RiUserStarLine,
  RiCrosshair2Line,
  RiGhostLine,
  RiBox3Line,
  RiRestaurantLine,
  RiGlobalLine,
  RiQuillPenLine,
  RiStackLine,
  RiBarChartLine,
  RiCapsuleFill, 
} from "react-icons/ri";

// --- Types ---
export interface TokenData {
  image: string;
  ticker: string;
  name: string;
  address: string;
  timeAgo: string;
  price: number;
  volume: string;
  marketCap: string;
  protocol: "pump" | "meteora" | "std";
  holders: number;
  topTraders: number;
  trophies: number;
  crowns: string;
  views: number;
  curveProgress: number;
  txCount: number;
  
  // --- ADD THIS LINE ---
  status: "new" | "final" | "migrated"; 
  // --------------------

  hasQuill?: boolean;
  hasPill?: boolean;
  hasWebsite?: boolean;
  badges: {
    type: "holders" | "chef" | "sniper" | "ghost" | "boxes";
    label: string;
    subLabel?: string;
    color: "green" | "red";
  }[];
}

interface TokenCardProps {
  data: TokenData;
  variant?: "new" | "final" | "migrated"; 
}

const TokenCard = React.memo(({ data, variant = "final" }: TokenCardProps) => {
  const prevPriceRef = useRef(data.price);
  const [priceColor, setPriceColor] = useState<"green" | "red" | "neutral">("neutral");

  // --- Helper: Dynamic Market Cap Color ---
  const getMcColor = () => {
    switch (variant) {
      case "new": return "text-primaryBlue";      
      case "migrated": return "text-primaryGreen"; 
      case "final": 
      default: return "text-primaryYellow";       
    }
  };

  // --- Helper: Protocol Badge Logic ---
  const getBadgeStyles = () => {
    if (data.protocol === "meteora") {
      return {
        bg: "bg-meteora-gradient",
        border: "bg-meteora-gradient/20",
        ring: "text-primaryYellow", 
      };
    }
    return {
      bg: "bg-pump", 
      border: "bg-pump/20",
      ring: "text-pump",
    };
  };

  const badgeStyle = getBadgeStyles();

  // --- Price Flash Effect ---
  useEffect(() => {
    if (data.price > prevPriceRef.current) setPriceColor("green");
    else if (data.price < prevPriceRef.current) setPriceColor("red");
    prevPriceRef.current = data.price;
    const timer = setTimeout(() => setPriceColor("neutral"), 800);
    return () => clearTimeout(timer);
  }, [data.price]);

  const flashClass =
    priceColor === "green" ? "bg-primaryGreen/10 transition-colors duration-300"
    : priceColor === "red" ? "bg-primaryRed/10 transition-colors duration-300"
    : "hover:bg-white/5 transition-colors duration-500";

  // --- SAFE DATA HANDLING ---
  const safeMarketCap = data.marketCap || "0";
  const displayMC = safeMarketCap.toString().startsWith('$') ? safeMarketCap : `$${safeMarketCap}`;

  const safeVolume = data.volume || "0";
  const displayVol = safeVolume.toString().startsWith('$') ? safeVolume : `$${safeVolume}`;

  return (
    <div className={`flex flex-row w-full gap-[12px] px-[12px] pt-[12px] pb-[12px] justify-start items-start cursor-pointer border-b border-primaryStroke bg-background ${flashClass}`}>
      
      {/* --- LEFT COLUMN: Image & Ring --- */}
      <div className="flex flex-col items-center gap-[4px] flex-shrink-0">
        <div className="relative w-[74px] h-[74px] flex justify-center items-center">
          
          {/* Protocol Badge (Bottom Right) */}
          <div className={`absolute bottom-[-4px] right-[-4px] z-30 p-[1px] ${badgeStyle.bg} rounded-full flex justify-center items-center w-[16px] h-[16px]`}>
            <div className="w-[14px] h-[14px] bg-background rounded-full flex justify-center items-center">
              <div className={`w-1.5 h-1.5 ${badgeStyle.bg} rounded-full`}></div>
            </div>
          </div>

          {/* Image Container */}
          <div className={`absolute z-20 ${badgeStyle.border} p-[1px] rounded-[4px]`}>
            <div className="bg-backgroundSecondary p-[2px] rounded-[3px]">
              <div className="w-[68px] h-[68px] relative rounded-[1px] overflow-hidden group">
                <img src={data.image} alt={data.ticker} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border border-textPrimary/10 pointer-events-none rounded-[1px]"></div>
                {/* Hover Camera Icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <RiEyeLine className="text-white text-[20px]" />
                </div>
              </div>
            </div>
          </div>

          {/* SVG Ring */}
          <div className="absolute top-0 left-0 w-[74px] h-[74px] z-10 flex items-center justify-center">
            <svg width="78" height="78" viewBox="0 0 78 78">
              <path d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76" className={`${badgeStyle.ring} opacity-40`} stroke="currentColor" fill="transparent" strokeWidth="1" />
              <path d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76" className={badgeStyle.ring} stroke="currentColor" fill="transparent" strokeWidth="1" strokeLinecap="round" strokeDasharray="296" strokeDashoffset="3.3" />
            </svg>
          </div>
        </div>

        {/* Address Pill */}
        <button className="text-textTertiary hover:text-primaryBlueHover transition-colors text-[10px] font-medium bg-transparent px-1.5 py-0.5 rounded flex items-center gap-1 group">
          <span className="group-hover:text-primaryBlueHover max-w-[50px] truncate">{data.address}</span>
          <RiFileCopyFill className="hidden group-hover:block text-[10px]" />
        </button>
      </div>

      {/* --- RIGHT COLUMN: Content --- */}
      <div className="flex flex-col flex-1 min-w-0 gap-[4px]">
        
        {/* ROW 1: Header */}
        <div className="flex flex-row justify-between items-end min-h-[18px]">
          <div className="flex flex-row gap-[6px] items-center overflow-hidden min-w-0">
            <span className="text-textPrimary text-[16px] font-medium tracking-tight whitespace-nowrap">
              {data.ticker}
            </span>
            <div className="flex items-center gap-1 text-textTertiary hover:text-primaryBlueHover cursor-pointer transition-colors min-w-0 overflow-hidden">
              <span className="text-[14px] font-medium truncate">{data.name}</span>
              <RiFileCopyFill className="text-[14px] flex-shrink-0" />
            </div>
          </div>
          
          {/* Market Stats */}
          <div className="flex flex-row items-center gap-[8px] text-[14px] font-medium leading-none">
            <div className="flex items-center gap-1">
              <span className="text-textTertiary text-[12px] font-medium">V</span>
              <span className="text-textPrimary tracking-tight font-bold">
                {displayVol}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-textTertiary text-[12px] font-medium">MC</span>
              <span className={`${getMcColor()} tracking-tight font-bold`}>
                 {displayMC}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 2: Stats & Actions */}
        <div className="flex flex-row w-full h-[18px] items-center mt-1">
          {/* Time & Action Icons */}
          <div className="flex items-center gap-[8px] mr-[12px]">
            <span className="text-primaryGreen text-[14px] font-medium">{data.timeAgo}</span>
            <div className="flex gap-[8px] items-center text-textSecondary">
               
               {data.hasPill && (
                  <RiCapsuleFill className="text-[16px] hover:text-primaryBlueHover cursor-pointer transition-colors" />
               )}

               {data.hasQuill && (
                 <RiQuillPenLine className="text-[16px] text-primaryRed hover:text-primaryBlueHover cursor-pointer transition-colors" />
               )}

               {data.hasWebsite && (
                 <RiGlobalLine className="text-[16px] hover:text-primaryBlueHover cursor-pointer transition-colors" />
               )}

               <RiSearchLine className="text-[16px] hover:text-primaryBlueHover cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Hidden on small screens */}
          <div className="hidden xl:flex flex-row gap-[10px] items-center">
            <div className="flex items-center gap-[2px]">
              <RiGroupLine className="text-textTertiary text-[16px]" />
              <span className="text-textPrimary text-[12px] font-medium">{data.holders}</span>
            </div>
            <div className="flex items-center gap-[2px]">
              <div className="w-[16px] h-[16px] flex items-center justify-center">
                  <RiBarChartLine className="text-textTertiary text-[16px] rotate-90" />
              </div>
              <span className="text-textPrimary text-[12px] font-medium">{data.topTraders}</span>
            </div>
            <div className="flex items-center gap-[2px]">
              <RiTrophyLine className="text-textTertiary text-[16px]" />
              <span className="text-textPrimary text-[12px] font-medium">{data.trophies}</span>
            </div>
            <div className="flex items-center gap-[2px]">
              <RiVipCrown2Line className="text-primaryYellow text-[16px] pb-[1px]" />
              <span className="text-textPrimary text-[12px] font-medium">{data.crowns}</span>
            </div>
          </div>

          {/* RIGHT SIDE: Curve / TX */}
          <div className="flex ml-auto items-center gap-[8px]">
             {/* Curve F */}
             <div className="flex items-center gap-1">
                <span className="text-textTertiary text-[12px] font-medium">F</span>
                <RiStackLine className={`${badgeStyle.ring} text-[12px]`} /> 
                <span className="text-textPrimary text-[12px] font-medium">
                  {Number.isNaN(data.curveProgress) || data.curveProgress === undefined ? "0.000" : data.curveProgress}
                </span>
             </div>
             
             {/* TX Count */}
             <div className="flex items-center gap-1">
                <span className="text-textTertiary text-[12px] font-medium">TX</span>
                <span className="text-textPrimary text-[12px] font-medium">
                   {data.txCount || 0}
                </span>
             </div>

             {/* Progress Bar */}
             <div className="w-[20px] h-[2px] bg-primaryStroke rounded-full overflow-hidden">
                <div className="h-full bg-primaryGreen w-1/2"></div>
             </div>
          </div>
        </div>

        {/* ROW 3: Badges (PIXEL PERFECT UPDATE) */}
        {/* We use specific responsive classes from your inspection: hidden sm:flex md:hidden lg:hidden xl:flex */}
        <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-[24px] gap-[4px] justify-start items-end mt-[2px]">
          {data.badges.map((badge, idx) => (
            <Badge key={idx} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
});

// Helper: Badge Component (Updated matching Inspection)
function Badge({ badge }: { badge: TokenData["badges"][0] }) {
  const icons = {
    holders: <RiUserStarLine className="text-[14px]" />,
    chef: <RiRestaurantLine className="text-[12px]" />,
    sniper: <RiCrosshair2Line className="text-[14px]" />,
    ghost: <RiGhostLine className="text-[14px]" />,
    boxes: <RiBox3Line className="text-[12px]" />,
  };
  const colorClass = badge.color === "green" ? "text-primaryGreen" : "text-primaryRed";
  
  return (
    <div className={`flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border border-primaryStroke/50`}>
      {/* Icon Wrapper (Matches inspection structure for chef hat) */}
      <div className={`flex items-center justify-center ${badge.type === 'chef' || badge.type === 'boxes' ? 'min-w-[14px] min-h-[14px]' : ''}`}>
         <span className={colorClass}>{icons[badge.type]}</span>
      </div>

      <span className={`${colorClass} text-[12px] font-medium leading-none`}>{badge.label}</span>
      
      {/* Sublabel (Matches inspection "1h" style) */}
      {badge.subLabel && (
        <span className="text-textSecondary text-[11px] font-medium leading-[16px] whitespace-nowrap">{badge.subLabel}</span>
      )}
    </div>
  );
}

export default TokenCard;