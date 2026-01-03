import React, { useRef, useEffect, useState, memo } from "react";
import {
  RiCloseLine,
  RiGasStationLine,
  RiCoinLine,
  RiInformationLine,
  RiShieldLine,
  RiShieldCheckLine,
} from "react-icons/ri";

// --- Types ---

interface SnipeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputBoxProps {
  label: string;
  placeholder: string;
  suffix?: string;
  icon: React.ReactNode;
}

interface MevButtonProps {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

// --- Sub-Components ---

const InputBox = memo<InputBoxProps>(({ label, placeholder, suffix, icon }) => (
  <div className="border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text">
    <div className="bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px]">
      <div className="relative flex flex-row w-full h-full items-center justify-center">
        <input
          placeholder={placeholder}
          className="w-[calc(100%-20px)] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center align-middle bg-transparent"
          type="text"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-[0px] text-textTertiary text-[14px] w-[20px]">
            {suffix}
          </span>
        )}
      </div>
    </div>
    <div className="flex flex-row w-full h-[24px] justify-center items-center">
      {icon}
      <span className="text-textTertiary text-[12px] leading-[16px] font-normal">
        {label}
      </span>
    </div>
  </div>
));

InputBox.displayName = "InputBox";

const MevButton = memo<MevButtonProps>(({ label, active, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 h-[24px] rounded-[4px] transition-colors ${
      active
        ? "bg-primaryBlue/15 text-primaryBlue"
        : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
    }`}
  >
    <div className="flex flex-row justify-center items-center gap-[2px]">
      {icon}
      <span className="text-[12px] font-medium">{label}</span>
    </div>
  </button>
));

MevButton.displayName = "MevButton";

// --- Main Component ---

const SnipeSettingsModal = memo<SnipeSettingsModalProps>(
  ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [mevMode, setMevMode] = useState<"off" | "reduced" | "secure">("off");

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        ref={modalRef}
        className="absolute top-[40px] right-[-80px] sm:right-0 z-[9999] animate-in fade-in zoom-in-95 duration-100"
      >
        <div className="flex flex-col w-[380px] bg-[#121316] border border-secondaryStroke rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)]">
          {/* --- Header --- */}
          <div className="flex flex-row w-full h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke">
            <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
              Snipe Settings
            </span>
            <button
              onClick={onClose}
              className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out"
            >
              <RiCloseLine className="text-textSecondary text-[16px] group-hover:text-textPrimary" />
            </button>
          </div>

          {/* --- Content --- */}
          <div className="flex flex-col flex-1 p-[16px] gap-[16px]">
            {/* Row 1: Inputs */}
            <div className="flex flex-row w-full gap-[16px] justify-start items-center">
              <div className="flex flex-row flex-1 gap-[16px] justify-start items-center">
                <InputBox
                  label="SLIPPAGE"
                  placeholder="0.0"
                  suffix="%"
                  icon={
                    <img
                      alt="Slippage"
                      width="12"
                      height="12"
                      src="https://cryptologos.cc/logos/solana-sol-logo.png"
                      className="mr-[4px] opacity-50 grayscale"
                      loading="lazy"
                      decoding="async"
                    />
                  }
                />
                <InputBox
                  label="PRIORITY"
                  placeholder="0.0"
                  icon={
                    <RiGasStationLine className="text-textTertiary text-[12px] mr-[4px]" />
                  }
                />
                <InputBox
                  label="BRIBE"
                  placeholder="0.0"
                  icon={
                    <RiCoinLine className="text-textTertiary text-[12px] mr-[4px]" />
                  }
                />
              </div>
            </div>

            {/* Row 2: MEV Mode */}
            <div className="flex flex-row w-full justify-start items-center gap-[16px]">
              <div className="flex flex-row w-full h-[32px] gap-[16px] max-w-[100px] min-w-[100px] justify-start items-center">
                <div className="flex flex-row h-[32px] gap-[4px] justify-start items-center">
                  <h3 className="text-textPrimary text-[12px] font-medium">
                    MEV Mode
                  </h3>
                  <RiInformationLine className="text-textTertiary text-[14px]" />
                </div>
              </div>

              <div className="border border-secondaryStroke/50 flex flex-row w-full gap-[1px] rounded-[8px] p-[4px]">
                <MevButton
                  label="Off"
                  active={mevMode === "off"}
                  onClick={() => setMevMode("off")}
                  icon={
                    <RiShieldLine
                      className={
                        mevMode === "off"
                          ? "text-primaryBlue text-[10px]"
                          : "text-textTertiary text-[12px]"
                      }
                    />
                  }
                />
                <MevButton
                  label="Reduced"
                  active={mevMode === "reduced"}
                  onClick={() => setMevMode("reduced")}
                  icon={
                    <RiShieldCheckLine
                      className={
                        mevMode === "reduced"
                          ? "text-primaryBlue text-[10px]"
                          : "text-textTertiary text-[12px]"
                      }
                    />
                  }
                />
                <MevButton
                  label="Secure"
                  active={mevMode === "secure"}
                  onClick={() => setMevMode("secure")}
                  icon={
                    <RiShieldCheckLine
                      className={
                        mevMode === "secure"
                          ? "text-primaryBlue text-[10px]"
                          : "text-textTertiary text-[12px]"
                      }
                    />
                  }
                />
              </div>
            </div>

            {/* Row 3: RPC Input */}
            <div className="flex flex-row w-full gap-[16px] justify-start items-center">
              <div className="relative overflow-hidden border-secondaryStroke hover:border-textPrimary/10 focus-within:border-textPrimary/10 hover:bg-primaryStroke/10 focus-within:bg-primaryStroke/10 font-normal border-[1px] flex flex-row w-full h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full transition-colors">
                <span className="flex-shrink-0 text-[14px] text-textTertiary font-medium">
                  RPC
                </span>
                <input
                  placeholder="https://a...e.com"
                  className="flex-1 min-w-0 text-[14px] text-textPrimary placeholder:text-textTertiary font-normal outline-none bg-transparent"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="border-t border-secondaryStroke/50 flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]">
            <div className="flex flex-row flex-1 justify-end items-center">
              <button
                onClick={onClose}
                className="flex-1 bg-primaryBlue flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer"
              >
                <span className="text-[14px] font-bold text-background">
                  Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SnipeSettingsModal.displayName = "SnipeSettingsModal";

export default SnipeSettingsModal;
