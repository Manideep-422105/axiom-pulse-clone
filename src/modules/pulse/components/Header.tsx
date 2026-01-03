"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  RiSearch2Line,
  RiNotification3Line,
  RiWalletLine,
  RiUserSettingsLine,
  RiStarLine,
  RiArrowDownSLine,
  RiGlobalLine,
} from "react-icons/ri";
import { IconType } from "react-icons";
import DepositModal from "./DepositModal";
import WatchlistModal from "./WatchlistModal"; // <--- IMPORT
import NotificationsModal from "./NotificationsModal";
import WalletModal from "./WalletModal"; // <--- IMPORT
// --- Interfaces ---

interface NavButtonProps {
  label: string;
  href: string;
  active?: boolean;
}

interface IconButtonProps {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}

interface ChainOption {
  id: "sol" | "bnb";
  name: string;
  icon: string;
}

// --- Constants ---
const CHAINS: ChainOption[] = [
  {
    id: "sol",
    name: "Solana",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=025",
  },
  {
    id: "bnb",
    name: "BNB",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025",
  },
];

// --- Sub-Components ---

const NavButton: React.FC<NavButtonProps> = ({
  label,
  href,
  active = false,
}) => (
  <Link href={href}>
    <button
      className={`
      flex flex-row h-[32px] text-nowrap px-[8px] xl:px-[14px] 
      justify-start items-center 
      rounded-[4px] font-medium text-[14px]
      transition-all duration-0 hover:duration-135 ease-in-out
      ${
        active
          ? "bg-primaryBlue/20 text-primaryBlue"
          : "text-textPrimary hover:bg-primaryBlue/20 hover:text-primaryBlue"
      }
    `}
    >
      {label}
    </button>
  </Link>
);

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  className = "",
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      bg-primaryStroke hover:bg-secondaryStroke/80 
      flex flex-row w-[32px] h-[32px] justify-center items-center 
      rounded-full transition-colors ${className}
    `}
  >
    <Icon className="text-textPrimary text-[16px] sm:text-[18px]" />
  </button>
);

// --- Main Component ---

const Header: React.FC = () => {
  const [isChainOpen, setIsChainOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainOption>(CHAINS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const walletRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }

      if (walletRef.current && !walletRef.current.contains(target)) {
        setIsWalletOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-background border-b border-primaryStroke font-sans z-50 relative">
      <div className="flex flex-row w-full h-[52px] sm:h-[64px] min-h-[48px] sm:min-h-[64px] px-[16px] lg:px-[24px] gap-[16px] lg:gap-[24px] justify-between sm:justify-start items-center">
        {/* --- LEFT SECTION: Logo & Navigation --- */}
        <div className="flex flex-row items-center flex-shrink-0 w-[36px] sm:w-[24px] 2xl:w-[130px]">
          <Link
            href="/?chain=sol"
            className="flex flex-row items-center text-textPrimary"
          >
            {/* Logo SVG (Shortened for brevity - keeping your existing logo code) */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] text-textPrimary"
            >
              <g clipPath="url(#clip0_logo)">
                <path
                  d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect
                    width="26"
                    height="22"
                    fill="white"
                    transform="translate(5 7)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              width="102"
              height="21"
              viewBox="0 0 103 19"
              fill="none"
              className="max-w-[102px] hidden 2xl:block text-textPrimary ml-4"
            >
              {/* Drift Text Paths */}
              <path
                d="M56.1914 18.3745V1.33447H59.7434L64.8074 15.3265L69.8714 1.33447H73.4234V18.3745H70.8314V5.89447L66.2474 18.3505H63.3674L58.7834 5.89447V18.3745H56.1914Z"
                fill="currentColor"
              />
              <path
                d="M45.9362 18.7584C40.9922 18.7584 37.9922 15.3984 37.9922 9.87844C37.9922 4.35844 40.9922 0.950439 45.9362 0.950439C50.9282 0.950439 53.9042 4.35844 53.9042 9.87844C53.9042 15.3984 50.9282 18.7584 45.9362 18.7584ZM45.9362 16.3824C49.2482 16.3824 51.2162 13.9824 51.2162 9.87844C51.2162 5.77444 49.2482 3.32644 45.9362 3.32644C42.6482 3.32644 40.6802 5.77444 40.6802 9.87844C40.6802 13.9824 42.6482 16.3824 45.9362 16.3824Z"
                fill="currentColor"
              />
              <path
                d="M33.1055 18.3745V1.33447H35.6975V18.3745H33.1055Z"
                fill="currentColor"
              />
              <path
                d="M16.9023 18.3745L22.5663 9.83047L16.9503 1.33447H19.9983L24.1983 7.81447L28.3263 1.33447H31.3503L25.7343 9.78247L31.4223 18.3745H28.3743L24.1503 11.7985L19.9263 18.3745H16.9023Z"
                fill="currentColor"
              />
              <path
                d="M0.980469 18.3745L7.12447 1.33447H10.4125L16.5565 18.3745H13.7965L12.2365 13.9345H5.27647L3.74047 18.3745H0.980469ZM6.09247 11.5825H11.4445L8.75647 3.80647L6.09247 11.5825Z"
                fill="currentColor"
              />
              <path
                d="M99.2929 18.6624C97.0311 18.6624 95.5703 16.9661 95.5703 14.3116C95.5703 11.6571 97.0311 9.96069 99.2929 9.96069C101.539 9.96069 103 11.6571 103 14.3116C103 16.9661 101.539 18.6624 99.2929 18.6624ZM99.2929 17.6729C100.926 17.6729 101.916 16.4006 101.916 14.3116C101.916 12.2225 100.926 10.9502 99.2929 10.9502C97.6437 10.9502 96.6541 12.2225 96.6541 14.3116C96.6541 16.4006 97.6437 17.6729 99.2929 17.6729Z"
                fill="currentColor"
              />
              <path
                d="M90.9961 18.4742V10.1494H91.8914L91.9385 11.7987C92.2684 10.6835 92.9438 10.1494 94.0276 10.1494H94.7501V11.1547H93.9962C92.7396 11.1547 92.0328 12.0186 92.0328 13.4008V18.4742H90.9961Z"
                fill="currentColor"
              />
              <path
                d="M81.2461 18.4741V7.32202H85.1572C87.6075 7.32202 89.0525 8.57859 89.0525 10.6519C89.0525 12.7253 87.6075 13.9818 85.1572 13.9818H82.3142V18.4741H81.2461ZM82.3142 12.9452H85.1572C86.9792 12.9452 87.9216 12.1441 87.9216 10.6519C87.9216 9.14405 86.9792 8.35869 85.1572 8.35869H82.3142V12.9452Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>

        {/* --- NAVIGATION (Desktop) --- */}
        <div className="relative flex hidden sm:flex flex-1 min-w-[0px]">
          <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-row gap-[4px] justify-start items-center">
              <NavButton label="Discover" href="/discover" />
              <NavButton label="Pulse" href="/pulse" active />
              <NavButton label="Trackers" href="/trackers" />
              <NavButton label="Perpetuals" href="/perpetuals" />
              <NavButton label="Yield" href="/yield" />
              <NavButton label="Vision" href="/vision" />
              <NavButton label="Portfolio" href="/portfolio" />
              <NavButton label="Rewards" href="/rewards" />
            </div>
          </div>
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex flex-row gap-[16px] justify-start items-center">
          {/* SEARCH BAR (Desktop) */}
          <div>
            <button
              type="button"
              className="hidden sm:flex flex-shrink-0 whitespace-nowrap border-primaryStroke font-normal border-[1px] flex-row h-[32px] sm:px-[8px] md:px-[8px] lg:px-[8px] 2xl:pl-[12px] 2xl:pr-[6px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer"
            >
              <RiSearch2Line className="text-[18px] text-textPrimary" />
              <span className="text-[12px] text-textTertiary font-medium hidden 2xl:block">
                Search by token or CA...
              </span>
              <div className="hidden 2xl:flex border-primaryStroke border-[1px] text-[12px] h-[20px] flex-row px-[8px] gap-[8px] justify-center items-center rounded-full">
                <span className="text-textPrimary">/</span>
              </div>
            </button>
          </div>

          {/* --- CHAIN SELECTOR (DROPDOWN) --- */}
          <div className="hidden sm:block" ref={dropdownRef}>
            <div className="relative flex">
              {/* Trigger Button */}
              <button
                onClick={() => setIsChainOpen(!isChainOpen)}
                className="hover:brightness-125 border-[2px] flex flex-shrink-0 flex-row h-[32px] pl-[8px] pr-[6px] gap-[6px] justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-[0.96]"
                style={{ borderColor: "rgba(20, 241, 149, 0.1)" }}
              >
                <img
                  src={selectedChain.icon}
                  alt={selectedChain.name}
                  width="16"
                  height="16"
                />
                <span className="text-[14px] text-textPrimary font-medium">
                  {selectedChain.name === "Solana" ? "SOL" : selectedChain.name}
                </span>
                <RiArrowDownSLine
                  className={`text-textPrimary text-[18px] transition-transform duration-200 ${
                    isChainOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu (Pixel Perfect based on screenshot) */}
              {isChainOpen && (
                <div className="absolute top-[40px] left-0 w-[140px] bg-backgroundSecondary border border-primaryStroke rounded-[8px] shadow-xl z-50 overflow-hidden flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                  {CHAINS.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => {
                        setSelectedChain(chain);
                        setIsChainOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 w-full hover:bg-primaryStroke/50 transition-colors text-left group"
                    >
                      <img
                        src={chain.icon}
                        alt={chain.name}
                        className={`w-5 h-5 ${
                          chain.id === "bnb" ? "grayscale-[0.3]" : ""
                        }`}
                      />
                      <span
                        className={`text-[14px] font-medium ${
                          selectedChain.id === chain.id
                            ? "text-textPrimary"
                            : "text-textSecondary group-hover:text-textPrimary"
                        }`}
                      >
                        {chain.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT ACTION GROUP */}
          <div className="flex items-center gap-[8px] sm:gap-[16px]">
            {/* Deposit Button (Desktop) */}
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="hidden sm:flex bg-primaryBlue h-[32px] px-[12px] flex-row justify-start items-center rounded-full hover:bg-primaryBlueHover cursor-pointer"
            >
              <span className="text-nowrap text-background text-[14px] font-bold">
                Deposit
              </span>
            </button>

            {/* --- MOBILE VIEW ICONS (Hidden on Desktop) --- */}
            <div className="flex sm:hidden items-center gap-[8px]">
              {/* Mobile SOL Selector (Simplified) */}
              <div className="relative flex">
                <button
                  className="hover:brightness-125 border-[2px] flex flex-shrink-0 flex-row h-[32px] pl-[8px] pr-[6px] gap-[6px] justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-[0.96]"
                  style={{ borderColor: "rgba(20, 241, 149, 0.1)" }}
                >
                  <img
                    src={selectedChain.icon}
                    alt="Chain"
                    width="16"
                    height="16"
                  />
                  <span className="text-[14px] text-textPrimary font-medium">
                    {selectedChain.name === "Solana" ? "SOL" : "BNB"}
                  </span>
                  <RiArrowDownSLine className="text-textPrimary text-[18px]" />
                </button>
              </div>
              <button className="bg-primaryStroke hover:bg-secondaryStroke/80 flex flex-row h-[32px] px-[8px] gap-[4px] justify-center items-center rounded-full">
                <RiGlobalLine className="text-textPrimary text-[16px] sm:text-[18px]" />
                <span className="text-[12px] sm:text-[14px] text-nowrap font-medium">
                  GLOBAL
                </span>
                <RiArrowDownSLine className="text-textPrimary text-[16px] sm:text-[18px]" />
              </button>
              <IconButton
                icon={RiNotification3Line}
                className="sm:w-[32px] sm:h-[32px] px-[10px] sm:px-[12px] w-[32px] h-[32px]"
              />
              <IconButton
                icon={RiWalletLine}
                className="sm:w-[32px] sm:h-[32px] px-[10px] sm:px-[12px] w-[32px] h-[32px]"
              />
              <IconButton
                icon={RiUserSettingsLine}
                className="sm:w-[32px] sm:h-[32px] px-[10px] sm:px-[12px] w-[32px] h-[32px]"
              />
            </div>

            {/* --- DESKTOP ICONS --- */}
            <div className="hidden sm:flex items-center gap-[8px] lg:gap-[16px]">
              <IconButton
                icon={RiStarLine}
                onClick={() => setIsWatchlistOpen(true)} // <--- TRIGGER OPEN
              />
              <div className="relative" ref={notifRef}>
                <IconButton
                  icon={RiNotification3Line}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} // Toggle
                />
                {/* Render Modal Inside Relative Container */}
                <NotificationsModal
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>

              {/* Wallet Button */}
              <div className="relative" ref={walletRef}>
                <button
                  onClick={() => setIsWalletOpen(!isWalletOpen)} // Toggle
                  className="w-fit min-w-max bg-primaryStroke flex flex-row h-[32px] px-[12px] py-[8px] gap-[8px] justify-center items-center rounded-full hover:bg-opacity-80 transition-colors hover:bg-secondaryStroke/80 cursor-pointer"
                >
                  <RiWalletLine className="text-textPrimary text-[18px]" />
                  <div className="hidden xl:flex flex-shrink-0 whitespace-nowrap flex-row gap-[4px] justify-start items-center">
                    <img
                      src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025"
                      alt="SOL"
                      width="16"
                      height="16"
                    />
                    <span className="text-[14px] font-semibold text-textPrimary">
                      0
                    </span>
                  </div>
                  <div className="hidden xl:block flex-shrink-0 w-[1px] h-full bg-secondaryStroke"></div>
                  <div className="hidden xl:flex flex-shrink-0 whitespace-nowrap flex-row gap-[4px] justify-start items-center">
                    <img
                      src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025"
                      alt="USDC"
                      width="18"
                      height="28"
                    />
                    <span className="text-[14px] font-semibold text-textPrimary">
                      0
                    </span>
                  </div>
                  <RiArrowDownSLine
                    className={`text-textPrimary text-[18px] transition-transform duration-200 ${
                      isWalletOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Wallet Modal Component */}
                <WalletModal
                  isOpen={isWalletOpen}
                  onClose={() => setIsWalletOpen(false)}
                />
              </div>
            </div>

            {/* --- USER AVATAR --- */}
            <span className="contents">
              <button
                type="button"
                className="flex flex-row w-[28px] h-[28px] justify-center items-center rounded-full relative overflow-visible transition-all duration-150 ease-in-out active:scale-[0.96] border-transparent bg-primaryStroke hover:bg-secondaryStroke/80 hover:border-transparent"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <div className="absolute inset-0 w-full h-full border-white/[0.1] border-[1px] z-[15] pointer-events-none rounded-full"></div>
                  <img
                    alt="User"
                    draggable="false"
                    className="object-cover transition-all duration-150 brightness-100 hover:brightness-110"
                    src={`data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad-246053916' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:hsl(36, 71%25, 51%25);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:hsl(173, 71%25, 41%25);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23grad-246053916)' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='system-ui, -apple-system, sans-serif' font-size='48' font-weight='600' fill='white' opacity='0.95'%3E58%3C/text%3E%3C/svg%3E`}
                  />
                </div>
                <div className="absolute bottom-[-2px] right-[-2px] w-[14px] h-[14px] rounded-full bg-background z-[20] flex items-center justify-center">
                  <div className="w-[8px] h-[8px] rounded-full bg-primaryGreen"></div>
                </div>
              </button>
            </span>

            {/* Desktop Settings Icon */}
            <div className="hidden sm:flex relative">
              <button className="bg-primaryStroke flex flex-row w-[32px] h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-secondaryStroke/80">
                <RiUserSettingsLine className="text-textPrimary text-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
      />
    </header>
  );
};

export default Header;
