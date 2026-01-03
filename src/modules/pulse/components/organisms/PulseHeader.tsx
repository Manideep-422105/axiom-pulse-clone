import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import dynamic from "next/dynamic";
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

const DisplayModal = dynamic(() => import("./modals/DisplayModal"), {
  ssr: false,
});
const HotkeysModal = dynamic(() => import("./modals/HotkeysModal"), {
  ssr: false,
});
const AlertsModal = dynamic(() => import("./modals/AlertsModal"), {
  ssr: false,
});
const SnipeSettingsModal = dynamic(
  () => import("./modals/SnipeSettingsModal"),
  { ssr: false }
);

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
  isActive: boolean
) => {
  useEffect(() => {
    if (!isActive) return;
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, isActive]);
};

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const IconButton = memo<IconButtonProps>(({ icon, onClick, isActive }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors ${
      isActive ? "bg-primaryStroke/60" : ""
    }`}
  >
    <span
      className={`text-[16px] transition-colors ${
        isActive
          ? "text-textPrimary"
          : "text-textSecondary group-hover:text-textPrimary"
      }`}
    >
      {icon}
    </span>
  </button>
));

IconButton.displayName = "IconButton";

const ChainToggle = memo(() => (
  <div className="flex items-center gap-1">
    <button className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primaryStroke/60 scale-110 transition-all duration-150">
      <img
        alt="SOL"
        width="20"
        height="20"
        src="https://cryptologos.cc/logos/solana-sol-logo.png"
        className="w-5 h-5"
        loading="lazy"
        decoding="async"
      />
    </button>
    <button className="relative flex items-center justify-center w-[32px] h-[32px] rounded-full opacity-60 hover:opacity-100 hover:bg-primaryStroke/30 transition-all duration-150">
      <img
        alt="BNB"
        width="20"
        height="20"
        src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
        className="w-5 h-5 grayscale-[0.3]"
        loading="lazy"
        decoding="async"
      />
    </button>
  </div>
));

ChainToggle.displayName = "ChainToggle";

const WalletButton = memo(() => (
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
        loading="lazy"
        decoding="async"
      />
      <span className="text-[14px] font-medium text-textPrimary">0</span>
    </div>
    <RiArrowDownSLine className="text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors" />
  </button>
));

WalletButton.displayName = "WalletButton";

const QuickBuyInput = memo(() => (
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
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));

QuickBuyInput.displayName = "QuickBuyInput";

export default function PulseHeader() {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isHotkeysOpen, setIsHotkeysOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSnipeSettingsOpen, setIsSnipeSettingsOpen] = useState(false);

  const displayRef = useRef<HTMLDivElement>(null);
  const hotkeysRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const snipeSettingsRef = useRef<HTMLDivElement>(null);

  useClickOutside(displayRef, () => setIsDisplayOpen(false), isDisplayOpen);
  useClickOutside(hotkeysRef, () => setIsHotkeysOpen(false), isHotkeysOpen);
  useClickOutside(alertsRef, () => setIsAlertsOpen(false), isAlertsOpen);
  useClickOutside(
    snipeSettingsRef,
    () => setIsSnipeSettingsOpen(false),
    isSnipeSettingsOpen
  );

  const toggleDisplay = useCallback(() => setIsDisplayOpen((p) => !p), []);
  const toggleHotkeys = useCallback(() => setIsHotkeysOpen((p) => !p), []);
  const toggleAlerts = useCallback(() => setIsAlertsOpen((p) => !p), []);
  const toggleSnipe = useCallback(() => setIsSnipeSettingsOpen((p) => !p), []);

  return (
    <div className="flex-none flex flex-row w-full h-[48px] justify-between items-center px-4 lg:px-6 bg-background border-b border-primaryStroke">
      <div className="flex items-center gap-4">
        <span className="text-textPrimary text-[20px] font-medium">Pulse</span>
        <ChainToggle />
      </div>

      <div className="flex flex-row gap-4 items-center">
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6"
        >
          <RiQuestionLine className="text-[20px] text-textTertiary hover:text-textSecondary transition-colors" />
        </button>

        <div className="relative" ref={displayRef}>
          <button
            onClick={toggleDisplay}
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
          {isDisplayOpen && (
            <DisplayModal
              isOpen={isDisplayOpen}
              onClose={() => setIsDisplayOpen(false)}
            />
          )}
        </div>

        <div className="flex items-center gap-1">
          <IconButton icon={<RiBookmarkLine />} />

          <div className="relative" ref={hotkeysRef}>
            <IconButton
              icon={<RiKeyboardBoxLine />}
              onClick={toggleHotkeys}
              isActive={isHotkeysOpen}
            />
            {isHotkeysOpen && (
              <HotkeysModal
                isOpen={isHotkeysOpen}
                onClose={() => setIsHotkeysOpen(false)}
              />
            )}
          </div>

          <div className="relative" ref={alertsRef}>
            <IconButton
              icon={<RiVolumeUpLine />}
              onClick={toggleAlerts}
              isActive={isAlertsOpen}
            />
            {isAlertsOpen && (
              <AlertsModal
                isOpen={isAlertsOpen}
                onClose={() => setIsAlertsOpen(false)}
              />
            )}
          </div>

          <div className="relative" ref={snipeSettingsRef}>
            <button
              onClick={toggleSnipe}
              className={`group flex items-center justify-center w-8 h-8 rounded-full hover:bg-primaryStroke/60 transition-colors relative ${
                isSnipeSettingsOpen ? "bg-primaryStroke/60" : ""
              }`}
            >
              <RiCrosshair2Line className="text-[16px] text-textSecondary group-hover:text-textPrimary" />
              <RiSettings3Line className="text-[12px] text-textSecondary group-hover:text-textPrimary absolute bottom-0 right-0" />
            </button>
            {isSnipeSettingsOpen && (
              <SnipeSettingsModal
                isOpen={isSnipeSettingsOpen}
                onClose={() => setIsSnipeSettingsOpen(false)}
              />
            )}
          </div>
        </div>

        <WalletButton />
        <QuickBuyInput />
      </div>
    </div>
  );
}
