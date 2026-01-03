import React from "react";
import { RiFileCopyLine, RiArrowLeftRightLine } from "react-icons/ri";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 1. FIXED BACKDROP: Blurs the screen and handles outside clicks */}
      <div 
        className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose} 
      />

      {/* 2. MODAL CONTENT: Positioned relative to the Wallet Button */}
      <div className="absolute top-[40px] right-0 z-[9999]">
        <div 
          className="flex flex-col w-[264px] bg-backgroundTertiary border-[1px] border-secondaryStroke rounded-[4px] shadow-xl origin-top-right animate-in fade-in zoom-in-95 duration-100"
          style={{ opacity: 1, transform: "translateY(4px)" }}
        >
          
          {/* --- Section 1: Total Value --- */}
          <div className="border-secondaryStroke border-b-[1px] flex flex-row justify-start items-center">
            <div className="flex flex-col gap-[4px] p-[16px] w-full items-start">
              
              {/* Header Row: Label + Copy Buttons */}
              <div className="flex flex-row w-full h-[24px] gap-[4px] justify-between items-center">
                <div className="flex flex-row gap-[4px] items-center w-full">
                  <span className="contents">
                    <div className="flex flex-row gap-[4px] items-center flex-1">
                      <span className="inline-block text-textSecondary text-[12px] leading-[16px] font-normal tracking-[-0.02em] border-b border-dashed border-b-textTertiary/20 hover:border-b-textTertiary transition-colors duration-150 mr-[8px] cursor-help">
                        Total Value
                      </span>
                    </div>
                  </span>
                  
                  {/* Copy Solana */}
                  <button className="group flex flex-row gap-[4px] px-[4px] h-[24px] items-center rounded-[4px] hover:bg-primaryStroke/60 transition-colors">
                    <RiFileCopyLine className="text-[14px] text-textTertiary group-hover:text-textSecondary" />
                    <span className="text-textSecondary text-[12px] leading-[16px] font-normal">Solana</span>
                  </button>
                  
                  {/* Copy Perps */}
                  <button className="group flex flex-row gap-[4px] px-[4px] h-[24px] items-center rounded-[4px] hover:bg-primaryStroke/60 transition-colors">
                    <RiFileCopyLine className="text-[14px] text-textTertiary group-hover:text-textSecondary" />
                    <span className="text-textSecondary text-[12px] leading-[16px] font-normal">Perps</span>
                  </button>
                </div>
              </div>

              {/* Value Amount */}
              <div className="flex flex-row items-center gap-[4px]">
                <span className="text-textPrimary text-[18px] leading-[24px] font-normal">$0</span>
              </div>
            </div>
          </div>

          {/* --- Section 2: Assets Row --- */}
          <div className="group border-secondaryStroke/50 h-[48px] border-b-[1px] flex flex-row justify-start items-center hover:bg-secondaryStroke/40 cursor-pointer transition-colors">
            <div className="flex flex-row gap-[0px] p-[16px] w-full justify-between items-start">
              
              {/* SOL Asset */}
              <div className="flex flex-row gap-[4px] h-[24px] justify-center items-center">
                <img 
                  alt="SOL" 
                  width="18" 
                  height="18" 
                  src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025" 
                />
                <span className="text-textPrimary text-[16px] leading-[21px] font-medium">0</span>
              </div>

              {/* Arrow Icon */}
              <div className="flex flex-row gap-[4px] h-[24px] justify-center items-center">
                <RiArrowLeftRightLine className="text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
              </div>

              {/* USDC Asset */}
              <div className="flex flex-row gap-[4px] h-[24px] justify-center items-center">
                <div className="flex w-[18px] h-[18px] justify-center items-center">
                  <img 
                    alt="USDC" 
                    width="20" 
                    height="20" 
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025" 
                  />
                </div>
                <span className="text-textPrimary text-[16px] leading-[21px] font-medium">0</span>
              </div>

            </div>
          </div>

          {/* --- Section 3: Action Buttons --- */}
          <div className="border-secondaryStroke/0 border-b-[1px] flex flex-row p-[16px] pb-[20px] gap-[16px] justify-start items-center">
            <button className="bg-primaryBlue flex-1 h-[28px] px-[12px] flex flex-row justify-center items-center rounded-full hover:bg-primaryBlueHover transition-colors">
              <span className="text-background text-[12px] leading-[16px] font-bold">Deposit</span>
            </button>
            <button className="bg-secondaryStroke flex-1 h-[28px] px-[12px] flex flex-row justify-center items-center rounded-full hover:bg-secondaryStroke/80 transition-colors">
              <span className="text-textPrimary text-[12px] leading-[16px] font-bold">Withdraw</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}