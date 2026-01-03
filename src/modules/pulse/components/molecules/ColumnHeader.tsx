import React, { memo } from "react";
import { RiFlashlightFill, RiEqualizer3Line } from "react-icons/ri";

interface ColumnHeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const PRESET_OPTIONS = ["P1", "P2", "P3"];

const SearchInput = memo(({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
  <div className="border border-primaryStroke flex items-center h-[28px] pl-[9px] pr-[6px] gap-2 rounded-full max-w-[200px] hover:bg-primaryStroke/35">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by ticker or name"
      className="flex-1 min-w-0 text-[12px] bg-transparent outline-none text-textPrimary placeholder:text-textTertiary"
    />
  </div>
));

SearchInput.displayName = "SearchInput";

const FilterPill = memo(() => (
  <div className="hidden lg:block">
    <div className="border border-primaryStroke flex items-center h-[28px] pl-2 pr-2 gap-2 rounded-full hover:bg-primaryStroke/35">
      <RiFlashlightFill className="text-textTertiary text-[14px]" />
      <input
        placeholder="0.0"
        className="w-[32px] text-[12px] bg-transparent outline-none text-textPrimary placeholder:text-textTertiary"
      />
      <img
        src="https://cryptologos.cc/logos/solana-sol-logo.png"
        alt="SOL"
        className="w-3.5 h-3.5"
        loading="lazy"
        decoding="async"
      />
      <div className="border-l border-primaryStroke flex gap-1 pl-1">
        {PRESET_OPTIONS.map((p) => (
          <button
            key={p}
            className="w-[22px] h-[22px] text-[12px] rounded hover:bg-primaryStroke/60 text-textSecondary"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  </div>
));

FilterPill.displayName = "FilterPill";

const SettingsButton = memo(() => (
  <button className="w-[24px] h-[24px] flex items-center justify-center rounded hover:bg-primaryStroke/30">
    <RiEqualizer3Line className="text-textSecondary text-[16px]" />
  </button>
));

SettingsButton.displayName = "SettingsButton";

const ColumnHeader = memo<ColumnHeaderProps>(({ title, searchQuery, onSearchChange }) => {
  return (
    <div className="hidden sm:flex sticky top-0 z-30 flex-row w-full gap-3 min-h-[48px] justify-end items-center pr-3 pl-1 lg:pl-3 border-b border-primaryStroke bg-backgroundSecondary">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-textPrimary text-[16px] font-medium">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <FilterPill />
        <SettingsButton />
      </div>
    </div>
  );
});

ColumnHeader.displayName = "ColumnHeader";

export default ColumnHeader;