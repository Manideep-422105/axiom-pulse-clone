import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
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
  RiCapsuleFill,
  RiFireLine,
  RiFlashlightFill,
  RiUserLine,
  RiBarChartLine,
  RiClipboardLine,
  RiCloseLine,
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
  status: "new" | "final" | "migrated";
  hasQuill?: boolean;
  hasPill?: boolean;
  hasWebsite?: boolean;
  badges: {
    type: "holders" | "chef" | "sniper" | "ghost" | "boxes";
    label: string;
    subLabel?: string;
    color: "green" | "red" | "blue";
  }[];
}

interface TokenCardProps {
  data: TokenData;
  variant?: "new" | "final" | "migrated";
}

// --- TOAST COMPONENT ---
const Toast = ({
  message,
  visible,
  onClose,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;

  return createPortal(
    <div className="fixed top-[80px] left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 px-4 py-3 bg-[#1A1D21] border border-primaryStroke rounded-[4px] shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
      <RiClipboardLine className="text-primaryBlue text-[18px]" />
      <span className="text-textPrimary text-[14px] font-medium mr-2">
        {message}
      </span>
      <button onClick={onClose} className="text-textTertiary hover:text-textPrimary transition-colors">
        <RiCloseLine className="text-[16px]" />
      </button>
    </div>,
    document.body
  );
};

// --- NORMAL VIEW ---
const NormalView = ({
  data,
  variant,
  displayMC,
  displayVol,
  getMcColor,
  badgeStyle,
  onCopy,
}: any) => (
  <>
    <div className="flex flex-col items-center gap-[4px] flex-shrink-0">
      <div className="relative w-[74px] h-[74px] flex justify-center items-center">
        <div className={`absolute bottom-[-4px] right-[-4px] z-30 p-[1px] ${badgeStyle.bg} rounded-full flex justify-center items-center w-[16px] h-[16px]`}>
          <div className="w-[14px] h-[14px] bg-background rounded-full flex justify-center items-center">
            <div className={`w-1.5 h-1.5 ${badgeStyle.bg} rounded-full`}></div>
          </div>
        </div>
        <div className={`absolute z-20 ${badgeStyle.border} p-[1px] rounded-[4px]`}>
          <div className="bg-backgroundSecondary p-[2px] rounded-[3px]">
            <div className="w-[68px] h-[68px] relative rounded-[1px] overflow-hidden group">
              <img src={data.image} alt={data.ticker} className="w-full h-full object-cover" />
              <div className="absolute inset-0 border border-textPrimary/10 pointer-events-none rounded-[1px]"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-[74px] h-[74px] z-10 flex items-center justify-center">
          <svg width="78" height="78" viewBox="0 0 78 78">
            <path d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76" className={`${badgeStyle.ring} opacity-40`} stroke="currentColor" fill="transparent" strokeWidth="1" />
            <path d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76" className={badgeStyle.ring} stroke="currentColor" fill="transparent" strokeWidth="1" strokeLinecap="round" strokeDasharray="296" strokeDashoffset="3.3" />
          </svg>
        </div>
      </div>
      <button onClick={(e) => onCopy(e, data.address)} className="text-textTertiary hover:text-primaryBlueHover transition-colors text-[10px] font-medium bg-transparent px-1.5 py-0.5 rounded flex items-center gap-1 group">
        <span className="group-hover:text-primaryBlueHover max-w-[50px] truncate">{data.address}</span>
        <RiFileCopyFill className="hidden group-hover:block text-[10px]" />
      </button>
    </div>

    <div className="flex flex-col flex-1 min-w-0 gap-[4px]">
      <div className="flex flex-row justify-between items-end min-h-[18px]">
        <div className="flex flex-row gap-[6px] items-center overflow-hidden min-w-0">
          <span className="text-textPrimary text-[16px] font-medium tracking-tight whitespace-nowrap">{data.ticker}</span>
          <div onClick={(e) => onCopy(e, data.address)} className="flex items-center gap-1 text-textTertiary hover:text-primaryBlueHover cursor-pointer transition-colors min-w-0 overflow-hidden">
            <span className="text-[14px] font-medium truncate">{data.name}</span>
            <RiFileCopyFill className="text-[14px] flex-shrink-0" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-[8px] text-[14px] font-medium leading-none">
          <div className="flex items-center gap-1">
            <span className="text-textTertiary text-[12px] font-medium">V</span>
            <span className="text-textPrimary tracking-tight font-bold">{displayVol}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-textTertiary text-[12px] font-medium">MC</span>
            <span className={`${getMcColor()} tracking-tight font-bold`}>{displayMC}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full h-[18px] items-center mt-1">
        <div className="flex items-center gap-[8px] mr-[12px]">
          <span className="text-primaryGreen text-[14px] font-medium">{data.timeAgo}</span>
          <div className="flex gap-[8px] items-center text-textSecondary">
            {data.hasPill && <RiCapsuleFill className="text-[16px]" />}
            {data.hasQuill && <RiQuillPenLine className="text-[16px] text-primaryRed" />}
            {data.hasWebsite && <RiGlobalLine className="text-[16px]" />}
            <RiSearchLine className="text-[16px]" />
          </div>
        </div>
        <div className="hidden xl:flex flex-row gap-[10px] items-center">
          <StatIcon icon={RiGroupLine} val={data.holders} />
          <StatIcon icon={RiBarChartLine} val={data.topTraders} rotate />
          <StatIcon icon={RiTrophyLine} val={data.trophies} />
          <div className="flex items-center gap-[2px]">
            <RiVipCrown2Line className="text-primaryYellow text-[16px] pb-[1px]" />
            <span className="text-textPrimary text-[12px] font-medium">{data.crowns}</span>
          </div>
        </div>
        <div className="flex ml-auto items-center gap-[8px]">
          <div className="flex items-center gap-1">
            <span className="text-textTertiary text-[12px] font-medium">F</span>
            <span className="text-textPrimary text-[12px] font-medium">{data.curveProgress}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-textTertiary text-[12px] font-medium">TX</span>
            <span className="text-textPrimary text-[12px] font-medium">{data.txCount}</span>
          </div>
          <div className="w-[20px] h-[2px] bg-primaryStroke rounded-full overflow-hidden">
            <div className="h-full bg-primaryGreen w-1/2"></div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-[24px] gap-[4px] justify-start items-end mt-[2px]">
        {data.badges.map((badge: any, idx: number) => (
          <Badge key={idx} badge={badge} />
        ))}
      </div>
    </div>
  </>
);

// --- HOVER VIEW (UPDATED LAYOUT) ---
const HoverView = ({
  data,
  displayMC,
  displayVol,
  getMcColor,
  badgeStyle,
  onCopy,
}: any) => (
  <div className="absolute inset-0 z-50 bg-[#121316] border border-secondaryStroke rounded-[4px] flex flex-row overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-100">
    
    {/* --- LEFT SIDE: CONTENT --- */}
    <div className="flex-1 flex flex-col p-[12px] min-w-0 justify-between">
      
      {/* Top Row: Image + Info + Stats */}
      <div className="flex flex-row gap-[12px] items-start">
        {/* Large Image */}
        <div className="relative w-[68px] h-[68px] flex-shrink-0">
          <img src={data.image} alt={data.ticker} className="w-full h-full object-cover rounded-[2px]" />
          <div className="absolute top-0 right-0 p-1 bg-black/40 rounded-bl-[4px]">
             <RiEyeLine className="text-white text-[12px]" />
          </div>
        </div>

        {/* Info & Stats */}
        <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-[6px] overflow-hidden">
              <span className="text-textPrimary text-[16px] font-bold truncate">{data.ticker}</span>
              <span className="text-textTertiary text-[12px] truncate">{data.name}</span>
              <RiFileCopyFill 
                onClick={(e) => onCopy(e, data.address)}
                className="text-textTertiary text-[12px] cursor-pointer hover:text-primaryBlueHover" 
              />
            </div>
            
            {/* Stats Right */}
            <div className="text-right whitespace-nowrap">
               <span className="text-textTertiary text-[12px] font-bold">V </span>
               <span className="text-textPrimary font-bold text-[14px]">{displayVol}</span>
               <span className="text-textTertiary text-[12px] font-bold ml-1">MC </span>
               <span className={`${getMcColor()} font-bold text-[14px]`}>{displayMC}</span>
            </div>
          </div>

          {/* Line 2: Timer, Socials */}
          <div className="flex justify-between items-center mt-1">
             <div className="flex items-center gap-[8px]">
                <span className="text-primaryGreen text-[13px] font-bold">{data.timeAgo}</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-primaryRed/40 bg-primaryRed/10">
                   <RiFireLine className="text-primaryRed text-[10px]" />
                   <span className="text-primaryRed text-[10px] font-bold">23:59</span>
                </div>
                <div className="flex gap-2 text-textSecondary">
                   <RiUserLine className="text-[14px] hover:text-white cursor-pointer" />
                   {data.hasPill && <RiCapsuleFill className="text-[14px] hover:text-white cursor-pointer" />}
                   <RiSearchLine className="text-[14px] hover:text-white cursor-pointer" />
                </div>
             </div>
             
             {/* Curve/TX (Small) */}
             <div className="flex items-center gap-2 text-[11px] font-medium">
                <div className="flex gap-1"><span className="text-textTertiary">F</span><span className="text-textPrimary">{data.curveProgress}</span></div>
                <div className="flex gap-1"><span className="text-textTertiary">TX</span><span className="text-textPrimary">{data.txCount}</span></div>
                <div className="w-[16px] h-[3px] bg-primaryGreen rounded-full"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Badges (Visible in hover now!) */}
      <div className="flex flex-row gap-[4px] mt-1 overflow-hidden items-end">
         {data.badges.map((badge: any, idx: number) => <Badge key={idx} badge={badge} />)}
      </div>
    </div>

    {/* --- RIGHT SIDE: BLUE FLASH BUTTON --- */}
    <button className="w-[96px] h-full bg-[#5B74FF] hover:bg-[#6C84FF] active:bg-[#4A63EE] flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer group border-l border-primaryStroke">
      <RiFlashlightFill className="text-[#090909] text-[28px] group-hover:scale-110 transition-transform" />
    </button>

  </div>
);

// --- MAIN COMPONENT ---
const TokenCard = React.memo(({ data, variant = "final" }: TokenCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const prevPriceRef = useRef(data.price);
  const [priceColor, setPriceColor] = useState<"green" | "red" | "neutral">("neutral");

  // Logic Helpers
  const getMcColor = () => {
    switch (variant) {
      case "new": return "text-primaryBlue";
      case "migrated": return "text-primaryGreen";
      default: return "text-primaryYellow";
    }
  };

  const getBadgeStyles = () => {
    if (data.protocol === "meteora") {
      return { bg: "bg-meteora-gradient", border: "bg-meteora-gradient/20", ring: "text-primaryYellow" };
    }
    return { bg: "bg-pump", border: "bg-pump/20", ring: "text-pump" };
  };
  const badgeStyle = getBadgeStyles();

  useEffect(() => {
    if (data.price > prevPriceRef.current) setPriceColor("green");
    else if (data.price < prevPriceRef.current) setPriceColor("red");
    prevPriceRef.current = data.price;
    const timer = setTimeout(() => setPriceColor("neutral"), 800);
    return () => clearTimeout(timer);
  }, [data.price]);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const flashClass =
    priceColor === "green" ? "bg-primaryGreen/10"
    : priceColor === "red" ? "bg-primaryRed/10"
    : "hover:bg-white/5";

  const safeMarketCap = data.marketCap || "0";
  const displayMC = safeMarketCap.toString().startsWith("$") ? safeMarketCap : `$${safeMarketCap}`;
  const safeVolume = data.volume || "0";
  const displayVol = safeVolume.toString().startsWith("$") ? safeVolume : `$${safeVolume}`;

  return (
    <>
      <div
        className={`relative w-full h-[122px] border-b border-primaryStroke overflow-hidden transition-colors duration-300 ${flashClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex flex-row w-full gap-[12px] px-[12px] pt-[12px] pb-[12px] justify-start items-start h-full ${isHovered ? "invisible" : "visible"}`}>
          <NormalView
            data={data}
            variant={variant}
            displayMC={displayMC}
            displayVol={displayVol}
            getMcColor={getMcColor}
            badgeStyle={badgeStyle}
            onCopy={handleCopy}
          />
        </div>

        {isHovered && (
          <HoverView
            data={data}
            displayMC={displayMC}
            displayVol={displayVol}
            getMcColor={getMcColor}
            badgeStyle={badgeStyle}
            onCopy={handleCopy}
          />
        )}
      </div>

      <Toast message="Address copied to clipboard" visible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
});

// --- HELPERS ---
function StatIcon({ icon: Icon, val, rotate }: any) {
  return (
    <div className="flex items-center gap-[2px]">
      <div className={`w-[16px] h-[16px] flex items-center justify-center ${rotate ? "rotate-90" : ""}`}>
        <Icon className="text-textTertiary text-[16px]" />
      </div>
      <span className="text-textPrimary text-[12px] font-medium">{val}</span>
    </div>
  );
}

function Badge({ badge }: { badge: TokenData["badges"][0] }) {
  const icons = {
    holders: <RiUserStarLine className="text-[14px]" />,
    chef: <RiRestaurantLine className="text-[12px]" />,
    sniper: <RiCrosshair2Line className="text-[14px]" />,
    ghost: <RiGhostLine className="text-[14px]" />,
    boxes: <RiBox3Line className="text-[12px]" />,
  };
  const colorClass = badge.color === "green" ? "text-primaryGreen" : badge.color === "blue" ? "text-primaryBlue" : "text-primaryRed";

  return (
    <div className={`flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border border-primaryStroke/50`}>
      <div className={`flex items-center justify-center`}>
        <span className={colorClass}>{icons[badge.type]}</span>
      </div>
      <span className={`${colorClass} text-[12px] font-medium leading-none`}>{badge.label}</span>
      {badge.subLabel && <span className="text-textSecondary text-[11px] font-medium leading-[16px] whitespace-nowrap">{badge.subLabel}</span>}
    </div>
  );
}

export default TokenCard;