"use client";

import React from "react";
import Link from "next/link";
import {
  RiSearch2Line,
  RiNotification3Line,
  RiWalletLine,
  RiUserSettingsLine,
  RiStarLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { IconType } from "react-icons";

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
      justify-start items-center transition-colors duration-135 ease-in-out
      rounded-[4px] font-medium text-[14px]
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
    <Icon className="text-textPrimary text-[18px]" />
  </button>
);
// --- Main Component ---

const Header: React.FC = () => {
  return (
    <header className="w-full bg-background border-b border-primaryStroke font-sans">
      <div className="flex flex-row w-full h-[52px] sm:h-[64px] px-[16px] lg:px-[24px] gap-[16px] lg:gap-[24px] justify-between items-center">
        {/* --- LEFT SECTION: Logo & Navigation --- */}
        <div className="flex flex-row items-center gap-6">
          {/* Logo SVG */}
          <Link
            href="/"
            className="flex flex-row items-center text-textPrimary"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="w-[36px] h-[36px]"
            >
              <g clipPath="url(#clip0)">
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
                <clipPath id="clip0">
                  <rect
                    width="26"
                    height="22"
                    fill="white"
                    transform="translate(5 7)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>

            {/* Drift Text Logo (Hidden on small screens, visible on 2xl) */}
            <svg
              width="102"
              height="21"
              viewBox="0 0 103 19"
              fill="none"
              className="hidden 2xl:block ml-2 text-textPrimary"
            >
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
            </svg>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden sm:flex flex-1 overflow-x-auto no-scrollbar mask-gradient">
            <div className="flex flex-row gap-[4px] items-center">
              <NavButton label="Discover" href="/discover" active />
              <NavButton label="Pulse" href="/pulse" />
              <NavButton label="Trackers" href="/trackers" />
              <NavButton label="Perpetuals" href="/perpetuals" />
              <NavButton label="Yield" href="/yield" />
              <NavButton label="Vision" href="/vision" />
              <NavButton label="Portfolio" href="/portfolio" />
              <NavButton label="Rewards" href="/rewards" />
            </div>
          </nav>
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex flex-row gap-[8px] lg:gap-[16px] items-center">
          {/* Search Bar */}
          <button className="hidden sm:flex group h-[32px] border border-primaryStroke rounded-full px-3 items-center gap-2 hover:bg-primaryStroke/35 transition-colors">
            <RiSearch2Line className="text-textPrimary text-[16px]" />
            <span className="text-[12px] text-textTertiary font-medium hidden 2xl:block">
              Search by token or CA...
            </span>
            <div className="hidden 2xl:flex h-[20px] px-2 border border-primaryStroke rounded text-[12px] items-center text-textPrimary">
              /
            </div>
          </button>

          {/* SOL Selector */}
          <div className="hidden sm:block">
            <button className="flex h-[32px] items-center gap-1.5 px-2 border-2 border-primaryGreen/10 rounded-full hover:brightness-125 transition-all">
              {/* Note: In production Next.js, consider using <Image /> here */}
              <img
                src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025"
                alt="SOL"
                className="w-4 h-4"
              />
              <span className="text-[14px] font-medium text-textPrimary">
                SOL
              </span>
              <RiArrowDownSLine className="text-textPrimary" />
            </button>
          </div>

          {/* Deposit Button */}
          <button className="flex bg-[#526FFF] h-[32px] px-[12px] flex-row justify-start items-center rounded-full hover:bg-[#526FFF]">
            <span className="text-nowrap text-background text-[14px] font-bold">
              Deposit
            </span>
          </button>

          {/* Icons Group */}
          <div className="hidden sm:flex items-center gap-[8px] lg:gap-[16px]">

            <IconButton icon={RiStarLine} />
            <IconButton icon={RiNotification3Line} />

            {/* Wallet Button */}
            <button className="bg-primaryStroke hover:bg-secondaryStroke/80 flex h-[32px] px-[12px] gap-2 items-center rounded-full transition-colors">
              <RiWalletLine className="text-textPrimary text-[18px]" />
              <div className="hidden xl:flex items-center gap-1">
                <img
                  src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025"
                  alt="SOL"
                  className="w-3 h-3 grayscale"
                />
                <span className="text-[14px] font-semibold text-textPrimary">
                  0
                </span>
              </div>
              <div className="hidden xl:block w-[1px] h-4 bg-secondaryStroke mx-1"></div>
              <div className="hidden xl:flex items-center gap-1">
                {/* Placeholder for USDC logo */}
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center">
                  $
                </span>
                <span className="text-[14px] font-semibold text-textPrimary">
                  0
                </span>
              </div>
              <RiArrowDownSLine className="text-textPrimary text-[18px]" />
            </button>
          </div>

          {/* User Avatar */}
          <div className="relative cursor-pointer group">
            <div className="w-[28px] h-[28px] rounded-full overflow-hidden border border-white/10 ring-2 ring-transparent group-hover:ring-white/10 transition-all">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad-user"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "hsl(36, 71%, 51%)", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "hsl(173, 71%, 41%)",
                        stopOpacity: 1,
                      }}
                    />
                  </linearGradient>
                </defs>
                <rect width="120" height="120" fill="url(#grad-user)" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontSize="48"
                  fontWeight="600"
                  fill="white"
                  opacity="0.95"
                >
                  58
                </text>
              </svg>
            </div>
            {/* Online Status Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] bg-background rounded-full flex items-center justify-center">
              <div className="w-[8px] h-[8px] bg-primaryGreen rounded-full"></div>
            </div>
          </div>

          {/* Settings Icon */}
          <IconButton icon={RiUserSettingsLine} className="hidden sm:flex" />
        </div>
      </div>
    </header>
  );
};

export default Header;
