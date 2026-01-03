import React, { useRef, useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertsModal({ isOpen, onClose }: AlertsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Positioning Wrapper: Absolute relative to the Volume Icon
    <div 
        ref={modalRef}
        className="absolute top-[40px] right-[-60px] sm:right-0 z-[9999] animate-in fade-in zoom-in-95 duration-100"
    >
      {/* FIX: Changed bg-backgroundTertiary to bg-[#121316] for solid background */}
      <div className="flex flex-col w-[360px] bg-[#121316] border border-secondaryStroke rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)]">
        
        {/* --- Header --- */}
        <div className="flex flex-row w-full min-h-[44px] h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke">
          <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
            Alerts
          </span>
          <button 
            onClick={onClose}
            className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out"
          >
            <RiCloseLine className="text-textSecondary text-[16px] group-hover:text-textPrimary" />
          </button>
        </div>

        {/* --- Content --- */}
        <div className="flex flex-col w-full h-full min-h-[0px] overflow-hidden">
          <audio></audio>
          
          {/* Mobile Header Duplicate (Hidden on SM) */}
          <div className="flex flex-row w-full h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke sm:hidden">
            <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
              Alerts
            </span>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto px-[16px]">
            <div className="flex flex-col flex-1 w-full py-[16px] px-[0px] pb-[20px] gap-[16px]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  
                  {/* Sound Alerts Toggle Row */}
                  <div 
                    className="group flex flex-row items-center justify-between h-[32px] w-full cursor-pointer"
                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  >
                    <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
                      Sound Alerts
                    </span>
                    
                    {/* Toggle Button */}
                    <button className={`relative rounded-full transition-all duration-200 ease-in-out overflow-hidden w-[52px] sm:w-[40px] h-[24px] sm:h-[20px] ${isSoundEnabled ? 'bg-primaryBlue group-hover:bg-primaryBlueHover' : 'bg-secondaryStroke group-hover:bg-textTertiary/40'}`}>
                      <div className="absolute top-[0px] -bottom-[1px] -right-[1px] -left-[1px] rounded-full z-[1] pointer-events-none border-black/10 border-[1px] transition-opacity duration-150"></div>
                      <div className="absolute -top-[1px] bottom-[0px] -right-[1px] -left-[1px] rounded-full z-[1] pointer-events-none border-white/5 border-[1px] transition-opacity duration-150"></div>
                      <div 
                        className={`absolute rounded-full bg-white transform transition-transform duration-200 ease-out top-[3px] sm:top-[2px] left-[2px] w-[18px] sm:w-[16px] h-[18px] sm:h-[16px] ${isSoundEnabled ? 'translate-x-[30px] sm:translate-x-[20px]' : 'translate-x-0'}`}
                      ></div>
                    </button>
                  </div>

                  <span className="text-textTertiary text-[12px] leading-[16px] font-normal">
                    Play sound alerts for Tokens in Pulse
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Footer (Desktop) --- */}
          <div className="border-t border-secondaryStroke/50 hidden sm:flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]">
            <div className="flex flex-row flex-1 justify-end items-center">
              <button 
                onClick={onClose}
                className="bg-primaryBlue flex flex-row flex-1 h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer"
              >
                <span className="text-[14px] font-bold text-background">Continue</span>
              </button>
            </div>
          </div>

          {/* --- Footer (Mobile) --- */}
          <div className="border-t border-secondaryStroke flex sm:hidden flex-row w-full h-[76px] gap-[20px] justify-end items-center p-[16px] pb-[20px] sticky bottom-0 bg-[#121316]">
            <button 
                onClick={onClose}
                className="w-full py-2 bg-primaryBlue text-background rounded-full text-[16px] font-bold active:scale-[0.96] active:opacity-[0.90] transition-all duration-[125ms] ease-out"
            >
              <span className="text-[16px] font-bold text-background">Continue</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}