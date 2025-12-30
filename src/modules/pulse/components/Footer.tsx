import React from "react";
import {
  RiListSettingsLine,
  RiWalletLine,
  RiArrowDownSLine,
  RiSettings3Line,
  RiWallet3Line,
  RiTwitterXLine,
  RiCompass3Line,
  RiPulseLine,
  RiBarChartLine,
  RiGasStationLine,
  RiCoinLine,
  RiLayoutTopLine,
  RiNotification3Line,
  RiPaletteLine,
  RiDiscordFill,
  RiArticleLine,
  RiCapsuleFill,
} from "react-icons/ri";

export default function Footer() {
  return (
    // Height fixed at 36px, Border Top, Background Color
    <div className="hidden sm:block w-full h-[36px] min-h-[36px] border-t border-primaryStroke bg-background text-textSecondary select-none z-50">
      {/* PADDING FIX: px-[24px] matches your inspection image 
         GAP FIX: gap-[16px] for main groups
      */}
      <div className="flex flex-row w-full h-full px-[24px] justify-between items-center gap-[16px] overflow-hidden">
        {/* --- LEFT SECTION --- */}
        <div className="flex flex-row items-center gap-[16px] min-w-0 overflow-x-auto scrollbar-hide h-full">
          {/* Group 1: Preset & Wallet Dropdown */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            {/* Preset Button - h-[24px] */}
            <button className="flex items-center gap-[4px] h-[24px] px-[8px] bg-primaryBlue/20 text-primaryBlue rounded-[4px] hover:bg-primaryBlue/25 transition-colors duration-150">
              <RiListSettingsLine className="text-[16px]" />
              <span className="text-[12px] font-semibold">PRESET 1</span>
            </button>

            {/* Wallet Select - h-[24px] */}
            <div className="relative">
              <button className="group flex items-center gap-[6px] h-[24px] pl-[8px] pr-[5px] border border-primaryStroke rounded-full hover:bg-primaryStroke/60 transition-colors">
                <div className="flex items-center gap-[4px]">
                  <RiWalletLine className="text-[14px] text-textTertiary group-hover:text-textSecondary" />
                  <span className="text-[12px] font-medium text-textTertiary group-hover:text-textSecondary">
                    1
                  </span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <img
                    src="https://cryptologos.cc/logos/solana-sol-logo.png"
                    className="w-[14px] h-[14px]"
                    alt="SOL"
                  />
                  <span className="text-[12px] font-medium text-textSecondary">
                    0
                  </span>
                </div>
                <RiArrowDownSLine className="text-[14px] text-textSecondary group-hover:text-textPrimary" />
              </button>
            </div>
          </div>

          <Divider />

          {/* Group 2: Navigation Icons */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            {/* Settings Cog */}
            <button className="-mr-[4px] min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/40 rounded-[4px] transition-colors">
              <RiSettings3Line className="text-[14px]" />
            </button>

            {/* Nav Links with "Notification Dot" logic */}
            <FooterLink icon={<RiWallet3Line />} label="Wallet" hasDot />
            <FooterLink icon={<RiTwitterXLine />} label="Twitter" hasDot />
            <FooterLink icon={<RiCompass3Line />} label="Discover" hasDot />
            <FooterLink icon={<RiPulseLine />} label="Pulse" hasDot />
            <FooterLink icon={<RiBarChartLine />} label="PnL" />
          </div>

          {/* Group 3: Gradient Pill (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-[16px] flex-shrink-0">
            <Divider />
            <button className="hidden lg:flex flex-row h-[24px] gap-[4px] items-center hover:brightness-110 transition-all">
              <div className="relative">
                {/* Exact Gradient from your HTML */}
                <div
                  className="relative flex h-[20px] w-[40px] rounded-full opacity-30"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(62, 154, 0) 100%)",
                  }}
                ></div>
                {/* Icons Overlay */}
                <div className="absolute inset-[2px] bg-background rounded-full flex justify-center items-center gap-0">
                  {/* Using placeholders for the tiny pump/bonk/bags icons */}
                  <div className="w-[11px] h-[11px] rounded-full bg-gray-600 border border-background"></div>
                  <div className="w-[11px] h-[11px] rounded-full bg-orange-500 border border-background -ml-1"></div>
                  <div className="w-[11px] h-[11px] rounded-full bg-green-500 border border-background -ml-1"></div>
                </div>
              </div>
            </button>
            <Divider />
          </div>

          {/* Group 4: Tickers (BTC/ETH/SOL) */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <TickerItem
              icon="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
              label="$87.1K"
              color="text-[#F7931A]"
              hideOn="hidden 2xl:flex"
            />
            <TickerItem
              icon="https://cryptologos.cc/logos/ethereum-eth-logo.png"
              label="$2,935"
              color="text-[#497493]"
              hideOn="hidden 2xl:flex"
            />
            <TickerItem
              icon="https://cryptologos.cc/logos/solana-sol-logo.png"
              label="$123.28"
              color="text-[#14F195]"
              hideOn="hidden lg:flex"
            />
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex flex-row items-center gap-[8px] flex-shrink-0 justify-end">
          {/* Stats Group */}
          <div className="hidden 2xl:flex items-center gap-[4px]">
            {/* Pill Stat */}
            <button className="-mr-[8px] group flex items-center gap-[4px] h-[24px] px-2 rounded hover:bg-secondaryStroke/40 text-textTertiary transition-colors">
              <RiCapsuleFill className="text-[14px] group-hover:text-textSecondary" />
              <span className="text-[12px] font-normal group-hover:text-textSecondary">
                $50.7K
              </span>
            </button>

            {/* Gas Stat */}
            <div className="flex flex-row gap-[4px] h-[24px] items-center px-2">
              <RiGasStationLine className="text-textTertiary text-[16px]" />
              <span className="text-textTertiary text-[12px] font-normal">
                0.0<sub className="bottom-0">2</sub>4
              </span>
            </div>

            {/* Coin Stat */}
            <div className="flex flex-row gap-[4px] h-[24px] items-center px-2">
              <RiCoinLine className="text-textTertiary text-[16px]" />
              <span className="text-textTertiary text-[12px] font-normal">
                0.02
              </span>
            </div>
            <Divider />
          </div>

          {/* Connection Status */}
          <div className="flex flex-row h-[24px] xl:px-[8px] gap-[4px] items-center rounded-[4px] text-primaryGreen xl:bg-primaryGreen/20 cursor-default">
            <div className="bg-primaryGreen/20 w-[12px] h-[12px] rounded-full flex justify-center items-center">
              <div className="bg-primaryGreen w-[8px] h-[8px] rounded-full"></div>
            </div>
            <span className="hidden xl:flex text-[12px] font-medium">
              Connection is stable
            </span>
          </div>

          {/* Global Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-1 px-2 h-[24px] text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textSecondary transition-colors">
              <span>GLOBAL</span>
              <RiArrowDownSLine className="text-[14px]" />
            </button>
          </div>

          <Divider />

          {/* Tool Icons */}
          <div className="flex items-center gap-[8px] text-textSecondary">
            <IconButton icon={<RiLayoutTopLine />} />
            <IconButton icon={<RiNotification3Line />} />
            <IconButton icon={<RiPaletteLine />} />
          </div>

          <div className="hidden md:flex">
            <Divider />
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex flex-row gap-[16px] items-center">
            <a href="#" className="hover:opacity-80">
              <RiDiscordFill className="text-[16px]" />
            </a>
            <a href="#" className="hover:opacity-80">
              <RiTwitterXLine className="text-[16px]" />
            </a>
          </div>

          {/* Docs Link */}
          <a
            href="#"
            className="hidden md:flex flex-row gap-[2px] h-[24px] px-[8px] justify-start items-center rounded-[4px] hover:bg-white/5 transition-colors"
          >
            <RiArticleLine className="text-[16px]" />
            <span className="hidden lg:flex text-[12px] font-normal">Docs</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function Divider() {
  return (
    <div className="w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>
  );
}

function FooterLink({
  icon,
  label,
  hasDot,
}: {
  icon: React.ReactNode;
  label: string;
  hasDot?: boolean;
}) {
  return (
    <button className="group relative flex flex-row gap-[4px] h-[24px] px-[4px] justify-start items-center rounded-[4px] hover:bg-primaryStroke/60 transition-colors cursor-pointer border border-transparent hover:border-transparent">
      {hasDot && (
        <div className="absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full border border-background z-10"></div>
      )}
      <span className="text-[16px] text-textTertiary group-hover:text-textSecondary transition-colors">
        {icon}
      </span>
      <span className="text-textSecondary text-[12px] font-medium text-nowrap leading-[16px]">
        {label}
      </span>
    </button>
  );
}

function TickerItem({
  icon,
  label,
  color,
  hideOn,
}: {
  icon: string;
  label: string;
  color: string;
  hideOn: string;
}) {
  return (
    <button
      className={`${hideOn} ${color} flex flex-row flex-shrink-0 h-[24px] px-[0px] gap-[4px] justify-start items-center hover:brightness-110 transition-all`}
    >
      <img src={icon} className="w-[16px] h-[16px]" alt="coin" />
      <span className="text-[12px] font-normal">{label}</span>
    </button>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors text-textSecondary hover:bg-secondaryStroke/40">
      <span className="text-[16px]">{icon}</span>
    </button>
  );
}
