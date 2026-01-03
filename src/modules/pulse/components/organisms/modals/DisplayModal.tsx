import React, { useRef, useEffect, memo } from "react";
import {
  RiFlashlightFill,
  RiSunLine,
  RiSearchLine,
  RiHashtag,
  RiEyeLine,
  RiRectangleLine,
  RiLoader4Line,
  RiLayoutGridLine,
} from "react-icons/ri";

// --- Types ---

interface DisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickBuyButtonProps {
  label: string;
  iconSize: number;
  width: string;
  height: string;
  active?: boolean;
}

interface ToggleButtonProps {
  icon: React.ReactNode;
  label: string;
}

interface TabButtonProps {
  label: string;
  active?: boolean;
}

interface RowButtonProps {
  label: string;
  inactive?: boolean;
}

// --- Configuration Data ---

const ROW_GROUPS = [
  [
    { label: "Image Reuse", inactive: true },
    { label: "Market Cap" },
    { label: "Volume" },
    { label: "Fees" },
  ],
  [
    { label: "TX" },
    { label: "Socials" },
    { label: "Holders" },
    { label: "Pro Traders" },
    { label: "KOLs" },
  ],
  [
    { label: "Dev Migrations" },
    { label: "Dev Creations" },
    { label: "Recent Visitors" },
  ],
  [
    { label: "Top 10 Holders" },
    { label: "Dev Holding" },
    { label: "Tracked Dev" },
  ],
  [
    { label: "Funding Time" },
    { label: "Tax", inactive: true },
    { label: "Snipers" },
    { label: "Insiders" },
  ],
  [{ label: "Bundlers" }, { label: "Dex Paid" }],
];

// --- Sub-Components ---

const QuickBuyButton = memo<QuickBuyButtonProps>(
  ({ label, iconSize, width, height, active = false }) => (
    <button
      className={`flex-1 h-[52px] rounded-[4px] text-[12px] border border-secondaryStroke/50 font-medium transition-colors duration-150 ease-in-out ${
        active
          ? "bg-secondaryStroke text-textSecondary"
          : "bg-transparent hover:bg-secondaryStroke/40 text-textTertiary"
      }`}
    >
      <div className="flex flex-col gap-[4px] justify-start items-center">
        <div className="flex flex-row gap-[4px] h-[16px] justify-center items-end">
          <div
            className="bg-primaryBlue rounded-full flex flex-row gap-[1px] justify-center items-center"
            style={{ width, height, borderRadius: active ? "2px" : "9999px" }}
          >
            <RiFlashlightFill
              style={{ fontSize: `${iconSize}px` }}
              className="font-bold text-[#090909]"
            />
            <span
              style={{ fontSize: `${iconSize}px` }}
              className="font-bold text-[#090909]"
            >
              7
            </span>
          </div>
        </div>
        <span className="text-[12px]">{label}</span>
      </div>
    </button>
  )
);

QuickBuyButton.displayName = "QuickBuyButton";

const ToggleButton = memo<ToggleButtonProps>(({ icon, label }) => (
  <button className="flex items-center gap-[8px] px-[12px] hover:bg-secondaryStroke/60 rounded-[4px] transition-colors w-full text-left justify-start h-[36px] group duration-0">
    <span className="text-textSecondary text-[16px] group-hover:text-textPrimary transition-colors duration-125 ease-in-out">
      {icon}
    </span>
    <span className="text-[14px] text-textPrimary font-medium">{label}</span>
  </button>
));

ToggleButton.displayName = "ToggleButton";

const TabButton = memo<TabButtonProps>(({ label, active = false }) => (
  <button
    className={`text-nowrap flex flex-row h-[20px] px-[12px] gap-[4px] justify-center items-center rounded-full ${
      active
        ? "bg-secondaryStroke text-textPrimary"
        : "bg-secondary/80 text-textTertiary"
    }`}
  >
    <span className="text-[14px] font-medium">{label}</span>
  </button>
));

TabButton.displayName = "TabButton";

const RowButton = memo<RowButtonProps>(({ label, inactive = false }) => (
  <button
    className={`text-nowrap flex items-center gap-[8px] px-[7px] border rounded-[4px] text-left justify-start h-[28px] group transition-colors duration-75 ease-in ${
      inactive
        ? "border-secondaryStroke/50 hover:bg-secondaryStroke/30"
        : "border-secondaryStroke bg-secondaryStroke/60 hover:bg-secondaryStroke"
    }`}
  >
    <span
      className={`text-[12px] font-medium ${
        inactive ? "text-textTertiary" : "text-textSecondary"
      }`}
    >
      {label}
    </span>
  </button>
));

RowButton.displayName = "RowButton";

// --- Main Component ---

const DisplayModal = memo<DisplayModalProps>(({ isOpen, onClose }) => {
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
      className="absolute top-[42px] left-0 z-[9999] shadow-dropdown bg-[#121316] border-[1px] border-secondaryStroke rounded-[4px] origin-top-left animate-in fade-in zoom-in-95 duration-100"
    >
      <div
        className="flex flex-col min-w-[344px] overflow-hidden h-full"
        style={{ maxHeight: "434.2px" }}
      >
        <div className="flex flex-col gap-[12px] px-[16px] py-[16px] flex-shrink-0">
          <span className="text-textSecondary text-[12px]">Metrics</span>
          <div className="flex flex-row gap-[8px]">
            <button className="flex-1 h-[52px] rounded-[4px] text-[12px] text-textSecondary border border-secondaryStroke/50 font-medium transition-colors duration-150 ease-in-out bg-transparent hover:bg-secondaryStroke/40">
              <div className="flex flex-col gap-[4px] justify-start items-center">
                <div className="flex flex-row gap-[4px] h-[16px] justify-start items-center text-textTertiary">
                  <span>MC</span>
                  <span className="text-[12px] font-medium">77K</span>
                </div>
                <span className="text-[12px] text-textTertiary">Small</span>
              </div>
            </button>
            <button className="flex-1 h-[52px] rounded-[4px] text-[12px] text-textSecondary border border-secondaryStroke/50 font-medium transition-colors duration-150 ease-in-out bg-secondaryStroke">
              <div className="flex flex-col gap-[4px] justify-start items-center">
                <div className="flex flex-row gap-[4px] h-[16px] justify-end items-center text-textSecondary">
                  <span className="text-[12px] pt-[4px]">MC</span>
                  <span className="text-[16px] font-medium">77K</span>
                </div>
                <span className="text-[12px] text-textSecondary">Large</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[12px] px-[16px] flex-shrink-0">
          <span className="text-textSecondary text-[12px]">Quick Buy</span>
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row gap-[8px]">
              <QuickBuyButton
                label="Small"
                iconSize={6}
                width="20px"
                height="8px"
              />
              <QuickBuyButton
                label="Large"
                iconSize={7}
                width="24px"
                height="10px"
              />
              <QuickBuyButton
                label="Mega"
                iconSize={7}
                width="32px"
                height="14px"
                active
              />
              <button className="flex-1 h-[52px] rounded-[4px] text-[12px] text-textSecondary border border-secondaryStroke/50 font-medium transition-colors duration-150 ease-in-out bg-transparent hover:bg-secondaryStroke/40">
                <div className="flex flex-col gap-[4px] justify-start items-center">
                  <div className="flex flex-row gap-[4px] h-[16px] justify-center items-end">
                    <div className="relative w-[40px] h-[18px] rounded-[1px] flex flex-row gap-[1px] justify-center items-center bg-textTertiary/20 overflow-hidden">
                      <div
                        className="absolute w-[24px] h-[12px] bottom-0 right-0 translate-x-1 translate-y-1 rounded-full opacity-10 z-10"
                        style={{
                          background:
                            "radial-gradient(circle, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 70%)",
                        }}
                      ></div>
                      <RiFlashlightFill className="text-[8px] font-bold text-primaryBlueHover" />
                      <span className="text-[8px] font-bold text-primaryBlueHover">
                        7
                      </span>
                    </div>
                  </div>
                  <span className="text-[12px] text-textTertiary">Ultra</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <ToggleButton icon={<RiSunLine />} label="Grey" />
          </div>
        </div>

        <div className="flex flex-row gap-[8px] px-[16px] mt-[8px] w-full h-[36px] justify-start items-center border-b border-secondaryStroke pb-[3px] flex-shrink-0">
          <TabButton label="Layout" active />
          <TabButton label="Metrics" />
          <TabButton label="Row" />
          <TabButton label="Extras" />
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[0px] py-[16px] min-h-0">
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[8px] px-[16px]">
              <ToggleButton icon={<RiSearchLine />} label="Hide Search Bar" />
              <ToggleButton icon={<RiHashtag />} label="No Decimals" />
              <ToggleButton icon={<RiEyeLine />} label="Show Hidden Tokens" />
              <div className="pl-[12px] pr-0">
                <ToggleButton icon={<RiEyeLine />} label="Unhide on Migrated" />
              </div>
              <ToggleButton icon={<RiRectangleLine />} label="Circle Images" />
              <ToggleButton icon={<RiLoader4Line />} label="Progress Bar" />
              <ToggleButton icon={<RiLayoutGridLine />} label="Spaced Tables" />
            </div>
          </div>

          <div className="h-[1px] bg-secondaryStroke/50 my-[16px]"></div>

          <div className="flex flex-col gap-[12px] px-[16px]">
            <span className="text-[12px] text-textSecondary">
              Customize rows
            </span>
            <div className="flex flex-col gap-[8px]">
              {ROW_GROUPS.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-row gap-[8px]">
                  {group.map((btn) => (
                    <RowButton
                      key={btn.label}
                      label={btn.label}
                      inactive={btn.inactive}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DisplayModal.displayName = "DisplayModal";

export default DisplayModal;
