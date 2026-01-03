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
    <div className="hidden sm:block w-full h-[36px] min-h-[36px] border-t border-primaryStroke bg-background text-textSecondary select-none z-50">
      <div className="flex flex-row w-full h-full px-[24px] justify-between items-center gap-[16px] overflow-hidden">
        
        {/* --- LEFT SECTION --- */}
        <div className="flex flex-row items-center gap-[16px] min-w-0 overflow-x-auto scrollbar-hide h-full">
          
          {/* Group 1: Preset & Wallet Dropdown */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            {/* Preset Button */}
            <span className="contents">
              <button className="flex items-center gap-[4px] h-[24px] px-[8px] bg-primaryBlue/20 text-primaryBlue rounded-[4px] hover:bg-primaryBlue/25 transition-colors duration-150 cursor-pointer">
                <RiListSettingsLine className="text-[16px]" />
                <span className="text-[12px] font-semibold">PRESET 1</span>
              </button>
            </span>

            {/* Wallet Dropdown */}
            <div className="relative flex">
              <div className="w-full">
                <button className="group border border-primaryStroke flex flex-row h-[24px] pl-[8px] pr-[5px] gap-[6px] justify-start items-center rounded-full hover:bg-primaryStroke/60 transition-colors duration-125 cursor-pointer">
                  <div className="flex flex-row gap-[4px] justify-start items-center">
                    <RiWalletLine className="text-[14px] text-textTertiary group-hover:text-textSecondary transition-colors duration-125" />
                    <span className="text-[12px] font-medium text-textTertiary group-hover:text-textSecondary transition-colors duration-125">1</span>
                  </div>
                  <div className="flex flex-row gap-[4px] justify-start items-center">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-[14px] h-[14px]" alt="SOL" />
                    <span className="text-[12px] font-medium text-textSecondary">0</span>
                  </div>
                  <RiArrowDownSLine className="text-[14px] text-textSecondary group-hover:text-textPrimary transition-colors duration-150" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>

          {/* Group 2: Navigation Icons (With Tooltips implicitly handled by hover structure) */}
          <div className="flex items-center gap-[8px] flex-shrink-0">
            <button className="-mr-[4px] min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/40 rounded-[4px] transition-colors duration-125">
              <RiSettings3Line className="text-[14px]" />
            </button>

            <FooterLink icon={<RiWallet3Line />} label="Wallet" hasDot />
            <FooterLink icon={<RiTwitterXLine />} label="Twitter" hasDot />
            <FooterLink icon={<RiCompass3Line />} label="Discover" hasDot />
            <FooterLink icon={<RiPulseLine />} label="Pulse" hasDot />
            <FooterLink icon={<RiBarChartLine />} label="PnL" />
          </div>

          {/* Group 3: Gradient Pill */}
          <div className="hidden lg:flex w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>
          <span className="contents">
            <button className="hidden lg:flex flex-row h-[24px] px-[0px] gap-[4px] justify-start items-center hover:brightness-110 transition-all duration-125">
              <div className="relative">
                <div 
                  className="relative flex flex-row h-[20px] px-[4px] gap-[4px] justify-start items-center rounded-full opacity-30 w-[40px]"
                  style={{ background: "linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(75, 188, 207) 100%)" }}
                ></div>
                <div className="absolute inset-[2px] bg-background rounded-full flex gap-[0px] justify-center items-center">
                   {/* Placeholders for small icons */}
                   <div className="w-[11px] h-[11px] bg-gray-500 rounded-full border border-background"></div>
                   <div className="w-[11px] h-[11px] bg-orange-500 rounded-full border border-background -ml-1"></div>
                   <div className="w-[11px] h-[11px] bg-blue-400 rounded-full border border-background -ml-1"></div>
                </div>
              </div>
            </button>
          </span>
          <div className="hidden lg:flex w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>

          {/* Group 4: Tickers */}
          <div className="flex flex-1 flex-row w-full gap-[8px] justify-start items-center">
            <TickerItem icon="https://cryptologos.cc/logos/bitcoin-btc-logo.png" label="$89.7K" color="text-[#F7931A]" hideOn="hidden 2xl:flex" />
            <TickerItem icon="https://cryptologos.cc/logos/ethereum-eth-logo.png" label="$3095" color="text-[#497493]" hideOn="hidden 2xl:flex" />
            <TickerItem icon="https://cryptologos.cc/logos/solana-sol-logo.png" label="$130.64" color="text-[#14F195]" hideOn="hidden lg:flex" />
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex flex-row items-center gap-[8px] flex-shrink-0 justify-end">
          
          {/* Stats Group (2xl+) */}
          <div className="hidden 2xl:flex flex-row gap-[8px] justify-end items-center">
             <span className="contents">
               <button className="-mr-[8px] group flex items-center gap-[4px] h-[24px] px-2 text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textTertiary transition-colors duration-150">
                 <RiCapsuleFill className="text-[14px] group-hover:text-textSecondary" />
                 <span className="text-textTertiary text-[12px] font-normal group-hover:text-textSecondary">$53.7K</span>
               </button>
             </span>
             <div className="hidden 2xl:flex flex-row gap-[4px] justify-start items-center">
                <RiGasStationLine className="text-textTertiary text-[16px]" />
                <span className="text-textTertiary text-[12px] font-normal">0.0<sub>2</sub>26</span>
             </div>
             <div className="hidden 2xl:flex flex-row gap-[4px] justify-start items-center">
                <RiCoinLine className="text-textTertiary text-[16px]" />
                <span className="text-textTertiary text-[12px] font-normal">0.0<sub>2</sub>34</span>
             </div>
             <div className="hidden 2xl:flex w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>
          </div>

          {/* Connection Status */}
          <div className="flex flex-row h-[24px] xl:px-[8px] gap-[4px] justify-start items-center rounded-[4px] text-primaryGreen xl:bg-primaryGreen/20">
            <div className="flex flex-row gap-[4px] justify-start items-center">
              <div className="bg-primaryGreen/20 w-[12px] h-[12px] rounded-full flex flex-row gap-[4px] justify-center items-center">
                <div className="bg-primaryGreen w-[8px] h-[8px] rounded-full"></div>
              </div>
            </div>
            <span className="hidden xl:flex text-[12px] font-medium">Connection is stable</span>
          </div>

          {/* Global Dropdown */}
          <div className="relative flex">
            <div className="w-full">
              <button className="flex items-center gap-1 px-2 h-[24px] text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textSecondary transition-colors duration-150">
                <span>GLOBAL</span>
                <RiArrowDownSLine className="text-[14px]" />
              </button>
            </div>
          </div>

          <div className="w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>

          {/* Tool Icons */}
          <div className="text-textSecondary flex flex-row gap-[8px] justify-start items-center">
            <IconButton icon={<RiLayoutTopLine />} />
            <IconButton icon={<RiNotification3Line />} />
            <IconButton icon={<RiPaletteLine />} />
          </div>

          {/* Socials & Docs */}
          <div className="text-textSecondary flex flex-row gap-[8px] justify-start items-center">
            <div className="hidden md:flex w-[1px] h-[20px] bg-primaryStroke flex-shrink-0"></div>
            <div className="hidden md:flex flex-row gap-[16px] justify-start items-center">
              <a href="#" className="hover:opacity-80"><RiDiscordFill className="text-[16px]" /></a>
              <a href="#" className="hover:opacity-80"><RiTwitterXLine className="text-[16px]" /></a>
            </div>
            <a href="#" className="hidden md:flex flex-row gap-[2px] h-[24px] px-[8px] justify-start items-center rounded-[4px] hover:bg-white/5">
              <RiArticleLine className="text-[16px]" />
              <span className="hidden lg:flex text-[12px] font-normal">Docs</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

// Updated FooterLink matching inspection exactly
function FooterLink({ icon, label, hasDot }: { icon: React.ReactNode, label: string, hasDot?: boolean }) {
  return (
    <span className="contents">
      <button className="group relative flex flex-row gap-[4px] h-[24px] px-[4px] justify-start items-center rounded-[4px] cursor-pointer hover:border-transparent border-[1px] border-transparent hover:bg-primaryStroke/60 transition-colors">
        {hasDot && (
          <div className="border-[1px] border-solid border-background absolute top-[-1px] right-[-3px] w-[7px] h-[7px] bg-red-500 rounded-full"></div>
        )}
        <span className="text-[16px] text-textTertiary hover:text-textSecondary transition-colors group-hover:text-textSecondary">
          {icon}
        </span>
        <span className="text-textSecondary text-[12px] leading-[16px] font-medium text-nowrap">
          {label}
        </span>
      </button>
    </span>
  );
}

function TickerItem({ icon, label, color, hideOn }: { icon: string, label: string, color: string, hideOn: string }) {
  return (
    <span className="contents">
      <button className={`${hideOn} ${color} flex flex-row flex-shrink-0 h-[24px] px-[0px] gap-[2px] justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out`}>
        <img alt="coin" width="16" height="16" src={icon} />
        <span className="text-[12px] font-normal">{label}</span>
      </button>
    </span>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="contents">
      <button className="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] transition-colors duration-150 ease-in-out text-textSecondary hover:bg-secondaryStroke/40">
        <span className="text-[16px]">{icon}</span>
      </button>
    </span>
  );
}