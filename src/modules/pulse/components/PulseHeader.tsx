import React, { useEffect, useRef, useState } from "react";
import {
  RiQuestionLine,
  RiListCheck,
  RiArrowDownSLine,
  RiBookmarkLine,
  RiKeyboardBoxLine,
  RiVolumeUpLine,
  RiCrosshair2Line,
  RiSettings3Line,
  RiWalletLine,
  RiFlashlightFill,
} from "react-icons/ri";
import DisplayModal from "./DisplayModal"; // Import the modal
import HotkeysModal from "./HotkeysModal"; // <--- Import
import AlertsModal from "./AlertsModal"; // <--- Import
import SnipeSettingsModal from "./SnipeSettingsModal";
export default function PulseHeader() {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isHotkeysOpen, setIsHotkeysOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const alertsRef = useRef<HTMLDivElement>(null);
  const [isSnipeSettingsOpen, setIsSnipeSettingsOpen] = useState(false);
  const snipeSettingsRef = useRef<HTMLDivElement>(null);
  // Close alerts when clicking outside (Double check, though modal has internal check too)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (alertsRef.current && !alertsRef.current.contains(target)) {
        setIsAlertsOpen(false);
      }

      if (
        snipeSettingsRef.current &&
        !snipeSettingsRef.current.contains(target)
      ) {
        setIsSnipeSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-none flex flex-row w-full h-[48px] justify-between items-center px-4 lg:px-6 bg-background border-b border-primaryStroke">
      {/* --- LEFT SECTION --- */}
      <div className="flex items-center gap-4">
        <span className="text-textPrimary text-[20px] font-medium">Pulse</span>
        <div className="flex items-center gap-1">
          <button className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primaryStroke/60 scale-110 transition-all duration-150">
            <img
              alt="SOL"
              width="20"
              height="20"
              src="https://cryptologos.cc/logos/solana-sol-logo.png"
              className="w-5 h-5"
            />
          </button>
          <button className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full opacity-60 hover:opacity-100 hover:bg-primaryStroke/30 transition-all duration-150">
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

      {/* --- RIGHT SECTION --- */}
      <div className="flex flex-row gap-4 items-center">
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6"
        >
          <RiQuestionLine className="text-[20px] text-textTertiary hover:text-textSecondary transition-colors" />
        </button>

        {/* --- DISPLAY DROPDOWN (Correct Positioning Context) --- */}
        <div className="relative">
          <button
            onClick={() => setIsDisplayOpen(!isDisplayOpen)}
            className={`flex items-center h-[32px] px-3 gap-2 bg-primaryStroke rounded-full hover:bg-secondaryStroke/80 transition-colors ${
              isDisplayOpen ? "bg-secondaryStroke/80" : ""
            }`}
          >
            <RiListCheck className="text-[18px] text-textPrimary" />
            <span className="text-[14px] font-bold text-textPrimary">
              Display
            </span>
            <RiArrowDownSLine
              className={`text-[18px] text-textPrimary transition-transform ${
                isDisplayOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* RENDER MODAL HERE (Absolute position will now be relative to this div) */}
          <DisplayModal
            isOpen={isDisplayOpen}
            onClose={() => setIsDisplayOpen(false)}
          />
        </div>

        {/* Other Icons */}
        <div className="flex items-center gap-1">
          <IconButton icon={<RiBookmarkLine />} />
          <div className="relative">
            <button
              onClick={() => setIsHotkeysOpen(!isHotkeysOpen)}
              className={`group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors ${
                isHotkeysOpen ? "bg-primaryStroke/60" : ""
              }`}
            >
              <RiKeyboardBoxLine className="text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
            </button>

            <HotkeysModal
              isOpen={isHotkeysOpen}
              onClose={() => setIsHotkeysOpen(false)}
            />
          </div>
          <div className="relative" ref={alertsRef}>
            <button
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className={`group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors ${
                isAlertsOpen ? "bg-primaryStroke/60" : ""
              }`}
            >
              <RiVolumeUpLine className="text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
            </button>
            <AlertsModal
              isOpen={isAlertsOpen}
              onClose={() => setIsAlertsOpen(false)}
            />
          </div>
          <div className="relative" ref={snipeSettingsRef}>
            <button
              onClick={() => setIsSnipeSettingsOpen(!isSnipeSettingsOpen)}
              className={`group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors relative ${
                isSnipeSettingsOpen ? "bg-primaryStroke/60" : ""
              }`}
            >
              <RiCrosshair2Line className="text-[16px] text-textSecondary group-hover:text-textPrimary" />
              <RiSettings3Line className="text-[12px] text-textSecondary group-hover:text-textPrimary absolute bottom-0 right-0" />
            </button>

            <SnipeSettingsModal
              isOpen={isSnipeSettingsOpen}
              onClose={() => setIsSnipeSettingsOpen(false)}
            />
          </div>
        </div>

        <button className="flex items-center h-[32px] px-3 gap-2 border border-primaryStroke rounded-full hover:bg-primaryStroke/35 transition-colors group">
          <div className="flex items-center gap-1">
            <RiWalletLine className="text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
            <span className="text-[14px] font-medium text-textSecondary group-hover:text-textPrimary transition-colors">
              1
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="https://cryptologos.cc/logos/solana-sol-logo.png"
              className="w-4 h-4"
              alt="sol"
            />
            <span className="text-[14px] font-medium text-textPrimary">0</span>
          </div>
          <RiArrowDownSLine className="text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
        </button>

        <div className="hidden sm:block lg:hidden">
          <div className="flex items-center h-[32px] border border-primaryStroke rounded-full px-3 gap-2 bg-transparent overflow-hidden">
            <RiFlashlightFill className="text-textTertiary text-sm" />
            <input
              placeholder="0.0"
              className="w-[60px] bg-transparent outline-none text-textPrimary text-sm font-medium placeholder:text-textTertiary"
            />
            <img
              src="https://cryptologos.cc/logos/solana-sol-logo.png"
              className="w-4 h-4"
              alt="sol"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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
