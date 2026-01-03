import React, { useRef, useEffect, memo } from "react";
import {
  RiCloseLine,
  RiInformationLine,
  RiResetLeftLine,
} from "react-icons/ri";

// --- Configuration ---

const ROW_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const MODIFIER_OPTIONS = ["Shift", "Ctrl", "Alt", "Win"];

// --- Types ---

interface HotkeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToggleButtonProps {
  active?: boolean;
}

interface KeyInputProps {
  value: string;
}

interface ModifierRowProps {
  label: string;
  activeKey: string;
}

// --- Sub-Components ---

const ToggleButton = memo<ToggleButtonProps>(({ active }) => (
  <button
    className={`relative rounded-full overflow-hidden w-[52px] sm:w-[40px] h-[24px] sm:h-[20px] transition-all duration-150 ease-in-out ${
      active
        ? "bg-primaryBlue group-hover:bg-primaryBlueHover"
        : "bg-secondaryStroke"
    }`}
  >
    <div className="absolute top-0 -bottom-[1px] -right-[1px] -left-[1px] rounded-full z-[1] pointer-events-none border-black/10 border-[1px]"></div>
    <div className="absolute -top-[1px] bottom-0 -right-[1px] -left-[1px] rounded-full z-[1] pointer-events-none border-white/5 border-[1px]"></div>
    <div
      className={`absolute rounded-full bg-white transform transition-transform duration-200 ease-out top-[3px] sm:top-[2px] left-[2px] w-[18px] sm:w-[16px] h-[18px] sm:h-[16px] ${
        active ? "translate-x-[30px] sm:translate-x-[20px]" : "translate-x-0"
      }`}
    ></div>
  </button>
));

ToggleButton.displayName = "ToggleButton";

const KeyInput = memo<KeyInputProps>(({ value }) => (
  <button
    type="button"
    className="flex items-center justify-center h-[32px] px-[12px] border-[1px] rounded-[4px] cursor-pointer transition-colors min-w-[72px] max-w-[72px] w-[72px] border-secondaryStroke hover:bg-primaryBlue/5 hover:border-primaryBlue"
  >
    <input
      readOnly
      className="bg-transparent outline-none text-textPrimary text-[12px] leading-[16px] font-normal text-center cursor-pointer w-full"
      placeholder="Click to set"
      type="text"
      value={value}
    />
  </button>
));

KeyInput.displayName = "KeyInput";

const ModifierRow = memo<ModifierRowProps>(({ label, activeKey }) => (
  <div className="flex flex-row items-center justify-between w-full min-h-[32px]">
    <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
      {label}
    </span>
    <div className="flex flex-row gap-[8px] items-center">
      {MODIFIER_OPTIONS.map((k) => {
        const isActive = k === activeKey;
        return (
          <button
            key={k}
            type="button"
            className={`flex items-center justify-center h-[32px] px-[12px] border-[1px] rounded-[4px] cursor-pointer transition-colors ${
              isActive
                ? "border-primaryBlue bg-primaryBlue/10 text-primaryBlue"
                : "border-secondaryStroke bg-backgroundTertiary hover:bg-secondaryStroke/20 hover:border-secondaryStroke/80 text-textSecondary"
            }`}
          >
            <span className="text-[12px] leading-[16px] font-medium">{k}</span>
          </button>
        );
      })}
    </div>
  </div>
));

ModifierRow.displayName = "ModifierRow";

// --- Main Component ---

const HotkeysModal = memo<HotkeysModalProps>(({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute top-[40px] right-[-100px] sm:right-[-60px] md:right-0 z-[9999] flex flex-col w-[452px] max-h-[85vh] bg-[#121316] border-[1px] border-secondaryStroke rounded-[4px] shadow-dropdown animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="flex flex-row w-full h-[44px] min-h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke">
        <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
          Pulse Hotkeys
        </span>
        <button
          onClick={onClose}
          type="button"
          className="group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out"
        >
          <RiCloseLine className="text-textSecondary text-[16px] group-hover:text-textPrimary" />
        </button>
      </div>

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <div className="border-b border-secondaryStroke flex flex-col w-full p-[16px] gap-[16px]">
          <div className="flex flex-col w-full gap-[8px]">
            <div className="group flex flex-row items-center justify-between h-[32px] w-full cursor-pointer">
              <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
                Hotkeys
              </span>
              <ToggleButton active />
            </div>
            <span className="text-textTertiary text-[12px] leading-[16px] font-normal">
              Quick buy tokens with custom hotkeys
            </span>
          </div>

          <div className="flex flex-col w-full gap-[8px]">
            <div className="group flex flex-row items-center justify-between h-[32px] w-full cursor-pointer">
              <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
                Pause live feed on Hover
              </span>
              <ToggleButton active />
            </div>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex flex-row gap-[6px] w-full justify-start items-center bg-secondaryStroke/50 rounded-[4px] p-[8px]">
              <RiInformationLine className="text-[13px] text-textSecondary" />
              <span className="text-[12px] text-textSecondary">
                Combine the Pause + Modifier + Row keys to buy tokens
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-[8px]">
            <div className="flex flex-row items-center justify-between h-[32px] w-full">
              <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
                Pause Key
              </span>
              <KeyInput value="Space" />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full p-[16px] pb-[20px] gap-[16px]">
          <div className="flex flex-col gap-[12px] p-[12px] rounded-[8px] border border-secondaryStroke/50">
            <span className="text-textPrimary text-[13px] leading-[18px] font-medium">
              Table Modifier Keys
            </span>
            <div className="flex flex-col gap-[12px]">
              <ModifierRow label="New Pairs" activeKey="Shift" />
              <ModifierRow label="Final Stretch" activeKey="Ctrl" />
              <ModifierRow label="Migrated" activeKey="Alt" />
            </div>
          </div>

          <div className="flex flex-col gap-[12px] p-[12px] rounded-[8px] border border-secondaryStroke/50">
            <span className="text-textPrimary text-[13px] leading-[18px] font-medium">
              Row Keys
            </span>
            <div className="flex flex-col gap-[12px]">
              {ROW_KEYS.map((key, idx) => (
                <div
                  key={key}
                  className="flex flex-row items-center justify-between h-[32px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <span className="text-textSecondary font-medium text-[14px] sm:text-[12px] leading-[16px]">
                      Row {idx === 9 ? 10 : idx + 1}
                    </span>
                  </div>
                  <KeyInput value={key} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-secondaryStroke/50 flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]">
        <div className="flex flex-row flex-1 justify-start items-center">
          <button
            type="button"
            className="group bg-transparent flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:brightness-110 transition-all duration-[150ms] cursor-pointer"
          >
            <RiResetLeftLine className="text-[14px] text-textTertiary group-hover:text-textSecondary" />
            <span className="text-[14px] font-medium text-textSecondary">
              Reset
            </span>
          </button>
        </div>
        <div className="flex flex-row flex-1 justify-end items-center">
          <button
            onClick={onClose}
            type="button"
            className="bg-primaryBlue flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer"
          >
            <span className="text-[14px] font-bold text-background">Done</span>
          </button>
        </div>
      </div>
    </div>
  );
});

HotkeysModal.displayName = "HotkeysModal";

export default HotkeysModal;
