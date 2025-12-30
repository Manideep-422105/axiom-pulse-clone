import React from "react";
import {
  RiQuestionLine,
  RiListCheck,
  RiArrowDownSLine,
  RiBookmarkLine, // approximating icon-bookmark-x
  RiKeyboardBoxLine,
  RiVolumeUpLine,
  RiCrosshair2Line,
  RiSettings3Line,
  RiWalletLine,
  RiFlashlightFill,
} from "react-icons/ri";

export default function PulseHeader() {
  return (
    <div className="flex-none flex flex-row w-full h-[48px] justify-between items-center px-4 lg:px-6 bg-background border-b border-primaryStroke">
      
      {/* --- LEFT SECTION: Title & Chain Switcher --- */}
      <div className="flex items-center gap-4">
        <span className="text-textPrimary text-[20px] font-medium">Pulse</span>
        
        <div className="flex items-center gap-1">
          {/* Active Chain (Solana) */}
          <button
            type="button"
            className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primaryStroke/60 scale-110 transition-all duration-150"
            aria-label="Switch to Solana"
          >
            {/* Replace src with your local image or a remote URL */}
            <img
              alt="SOL"
              width="20"
              height="20"
              src="https://cryptologos.cc/logos/solana-sol-logo.png" 
              className="w-5 h-5"
            />
          </button>

          {/* Inactive Chain (BNB) */}
          <button
            type="button"
            className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full opacity-60 hover:opacity-100 hover:bg-primaryStroke/30 transition-all duration-150"
            aria-label="Switch to BNB"
          >
            <img
              alt="BNB"
              width="20"
              height="20"
              src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
              className="w-5 h-5 grayscale-[0.3]"
            />
          </button>
        </div>
      </div>

      {/* --- RIGHT SECTION: Tools & Wallet --- */}
      <div className="flex flex-row gap-4 items-center">
        
        {/* Help Icon */}
        <button type="button" className="flex items-center justify-center w-6 h-6">
          <RiQuestionLine className="text-[20px] text-textTertiary hover:text-textSecondary transition-colors" />
        </button>

        {/* Display Dropdown */}
        <div className="relative">
          <button className="flex items-center h-[32px] px-3 gap-2 bg-primaryStroke rounded-full hover:bg-secondaryStroke/80 transition-colors">
            <RiListCheck className="text-[18px] text-textPrimary" />
            <span className="text-[14px] font-bold text-textPrimary">Display</span>
            <RiArrowDownSLine className="text-[18px] text-textPrimary" />
          </button>
        </div>

        {/* Icon Group (Bookmarks, Keyboard, Sound, Settings) */}
        <div className="flex items-center gap-1">
          <IconButton icon={<RiBookmarkLine />} />
          <IconButton icon={<RiKeyboardBoxLine />} />
          <IconButton icon={<RiVolumeUpLine />} />
          
          {/* Settings with Overlay Icon */}
          <button className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors relative">
            <RiCrosshair2Line className="text-[16px] text-textSecondary group-hover:text-textPrimary" />
            <RiSettings3Line className="text-[12px] text-textSecondary group-hover:text-textPrimary absolute bottom-0 right-0" />
          </button>
        </div>

        {/* Wallet Pill */}
        <button className="flex items-center h-[32px] px-3 gap-2 border border-primaryStroke rounded-full hover:bg-primaryStroke/35 transition-colors group">
          <div className="flex items-center gap-1">
            <RiWalletLine className="text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
            <span className="text-[14px] font-medium text-textSecondary group-hover:text-textPrimary transition-colors">1</span>
          </div>
          <div className="flex items-center gap-1">
             {/* Small SOL Icon */}
             <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-4 h-4" alt="sol" />
             <span className="text-[14px] font-medium text-textPrimary">0</span>
          </div>
          <RiArrowDownSLine className="text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
        </button>

        {/* Responsive Input (Visible on SM, Hidden on LG per your code) */}
        <div className="hidden sm:block lg:hidden">
            <div className="flex items-center h-[32px] border border-primaryStroke rounded-full px-3 gap-2 bg-transparent overflow-hidden">
                <RiFlashlightFill className="text-textTertiary text-sm" />
                <input 
                    placeholder="0.0" 
                    className="w-[60px] bg-transparent outline-none text-textPrimary text-sm font-medium placeholder:text-textTertiary" 
                />
                 <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-4 h-4" alt="sol" />
            </div>
        </div>

      </div>
    </div>
  );
}

// Helper Component for the simple icon buttons
function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button 
      type="button" 
      className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors"
    >
      <span className="text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors">
        {icon}
      </span>
    </button>
  );
} 