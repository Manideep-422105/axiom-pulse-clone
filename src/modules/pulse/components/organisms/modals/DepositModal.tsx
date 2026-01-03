import React, { useRef, useState, useCallback, memo } from "react";
import { RiCloseLine, RiFileCopyLine, RiCheckLine } from "react-icons/ri";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEPOSIT_ADDRESS = "CzqUmMKUY35ajKuFhg7irBj2c9ZKdaR8gYx6x7p8Cg7M";

// --- Sub-Component: Tab Button ---
const TabButton = memo(
  ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-row flex-1 p-[4px] h-[28px] justify-center items-center rounded-[8px] sm:rounded-[4px] transition-colors duration-150 ${
        isActive
          ? "bg-secondaryStroke"
          : "hover:bg-secondaryStroke/20 text-textTertiary"
      }`}
    >
      <span
        className={`text-[14px] leading-[20px] font-medium ${
          isActive ? "text-textPrimary" : "text-textTertiary"
        }`}
      >
        {label}
      </span>
    </button>
  )
);

TabButton.displayName = "TabButton";

// --- Main Component ---
const DepositModal = memo<DepositModalProps>(({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [copied, setCopied] = useState(false);

  // Close when clicking the backdrop
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Copy Logic
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="flex flex-col w-[364px] min-h-[480px] bg-backgroundTertiary border-[1px] border-secondaryStroke rounded-[4px] shadow-2xl"
        style={{ opacity: 1, transform: "none" }}
      >
        {/* --- Header --- */}
        <div className="flex flex-row w-full h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke">
          <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
            Exchange
          </span>
          <button
            type="button"
            onClick={onClose}
            className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out"
          >
            <RiCloseLine className="text-textSecondary text-[16px] group-hover:text-textPrimary" />
          </button>
        </div>

        {/* --- Tabs --- */}
        <div className="flex w-full p-[16px] pb-[0px]">
          <div className="border-secondaryStroke/50 border-[1px] flex flex-row w-full gap-[0px] p-[4px] justify-start items-center rounded-[8px]">
            {["Convert", "Deposit", "Buy"].map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* --- Body --- */}
        <div className="flex flex-col flex-1 w-full p-[16px] pb-[20px] gap-[16px] min-h-[200px]">
          <div className="flex flex-row w-full gap-[8px]">
            <div className="w-1/2">
              <div className="group border-secondaryStroke/50 border-[1px] flex flex-row w-full h-[32px] gap-[8px] px-[12px] rounded-[4px] justify-start items-center">
                <img
                  alt="SOL"
                  width="16"
                  height="16"
                  src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=025"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-textPrimary text-[12px] leading-[16px] font-normal flex-1 text-left">
                  Solana
                </span>
              </div>
            </div>
            <div className="flex-1 border-secondaryStroke/50 border-[1px] flex flex-row h-[32px] gap-[8px] px-[12px] rounded-[4px] justify-start items-center">
              <span className="text-textTertiary text-[12px] leading-[16px] font-normal flex-1">
                Balance:
              </span>
              <span className="text-textSecondary text-[12px] leading-[16px] font-normal">
                <span>0 </span>SOL
              </span>
            </div>
          </div>

          <span className="text-textTertiary text-[12px] leading-[16px] font-normal">
            Only deposit Solana through the Solana network for this address.
          </span>

          {/* QR Code Section */}
          <button
            onClick={handleCopy}
            className="relative border-secondaryStroke/50 border-[1px] flex flex-row w-full gap-[16px] p-[1px] pr-[16px] justify-start items-start rounded-[8px] hover:bg-secondaryStroke/20 hover:border-secondaryStroke/80 transition-all duration-[150ms] ease-in-out cursor-pointer text-left group"
          >
            <div className="relative min-w-[140px] min-h-[140px] bg-black rounded-[12px] p-[4px] flex items-center justify-center">
              <div className="bg-white p-2 rounded-[7px] w-full h-full">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${DEPOSIT_ADDRESS}`}
                  alt="QR"
                  className="w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="flex flex-col w-full justify-start items-start gap-[4px] pt-[12px] overflow-hidden">
              <span className="text-textTertiary text-[12px] leading-[16px] font-normal">
                Deposit Address
              </span>
              <div className="flex flex-row w-full justify-start items-start">
                <span className="text-textSecondary text-[12px] leading-[16px] font-normal break-all text-left w-full font-mono">
                  {DEPOSIT_ADDRESS}
                </span>
              </div>
            </div>
            <div className="absolute bottom-[8px] right-[8px] w-[22px] h-[22px] flex flex-row justify-center items-center rounded-[4px] text-textTertiary group-hover:text-textPrimary transition-colors">
              {copied ? (
                <RiCheckLine className="text-[16px] text-primaryGreen" />
              ) : (
                <RiFileCopyLine className="text-[16px]" />
              )}
            </div>
          </button>

          <span className="text-textSecondary text-[12px] leading-[16px] font-normal">
            Don't have any Solana?{" "}
            <span className="text-primaryBlue cursor-pointer hover:underline">
              Buy through Onramper.
            </span>
          </span>
        </div>

        {/* --- Footer --- */}
        <div className="border-t border-secondaryStroke/50 flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]">
          <button
            onClick={handleCopy}
            className={`flex flex-row flex-1 h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:brightness-110 transition-all duration-[150ms] cursor-pointer ${
              copied
                ? "bg-primaryGreen"
                : "bg-primaryBlue hover:bg-primaryBlue/80"
            }`}
          >
            <span className="text-[14px] font-bold text-background">
              {copied ? "Copied!" : "Copy Address"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

DepositModal.displayName = "DepositModal";

export default DepositModal;
