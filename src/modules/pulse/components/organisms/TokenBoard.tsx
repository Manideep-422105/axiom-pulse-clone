"use client";

import React, { useState, useMemo, memo } from "react";
import { useSelector } from "react-redux";
import { selectAllTokens } from "@/store/appSlice";
import { useTokenSocket } from "@/hooks/useTokenSocket";
import TokenColumn from "./TokenColumn";
import SectionHeader from "./PulseHeader";

type TabType = "new" | "final" | "migrated";

interface TabConfig {
  id: TabType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: "new", label: "New Pairs" },
  { id: "final", label: "Final Stretch" },
  { id: "migrated", label: "Migrated" },
];

const MobileTab = memo(
  ({
    id,
    label,
    isActive,
    onClick,
  }: {
    id: TabType;
    label: string;
    isActive: boolean;
    onClick: (id: TabType) => void;
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 pb-2 text-[14px] font-medium transition-colors border-b-2 ${
        isActive
          ? "border-primaryBlue text-textPrimary"
          : "border-transparent text-textTertiary hover:text-textSecondary"
      }`}
    >
      {label}
    </button>
  )
);

MobileTab.displayName = "MobileTab";

export default function TokenBoard() {
  useTokenSocket();
  const tokens = useSelector(selectAllTokens);
  const [activeTab, setActiveTab] = useState<TabType>("new");

  const isLoading = !tokens || tokens.length === 0;

  const { newPairs, finalStretch, migrated } = useMemo(
    () => ({
      newPairs: tokens.filter((t) => t.status === "new"),
      finalStretch: tokens.filter((t) => t.status === "final"),
      migrated: tokens.filter((t) => t.status === "migrated"),
    }),
    [tokens]
  );

  return (
    <div className="flex flex-col w-full h-full gap-[16px] py-[24px] px-[16px] lg:px-[24px] min-w-0 overflow-hidden">
      <div className="flex-none w-full">
        <SectionHeader />
      </div>

      <div className="flex xl:hidden flex-row justify-between items-center border-b border-primaryStroke pb-0 mb-[-16px] z-20 gap-4">
        {TABS.map((tab) => (
          <MobileTab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      <div className="flex-1 min-h-0 w-full flex flex-col xl:flex-row xl:border xl:border-primaryStroke bg-backgroundSecondary rounded-[8px] sm:rounded-[4px] xl:divide-x xl:divide-primaryStroke overflow-hidden">
        <div
          className={`${
            activeTab === "new" ? "flex" : "hidden"
          } xl:flex flex-1 min-h-0`}
        >
          <TokenColumn
            title="New Pairs"
            tokens={newPairs}
            variant="new"
            hideHeaderOnMobile={true}
            isLoading={isLoading}
          />
        </div>

        <div
          className={`${
            activeTab === "final" ? "flex" : "hidden"
          } xl:flex flex-1 min-h-0`}
        >
          <TokenColumn
            title="Final Stretch"
            tokens={finalStretch}
            variant="final"
            hideHeaderOnMobile={true}
            isLoading={isLoading}
          />
        </div>

        <div
          className={`${
            activeTab === "migrated" ? "flex" : "hidden"
          } xl:flex flex-1 min-h-0`}
        >
          <TokenColumn
            title="Migrated"
            tokens={migrated}
            variant="migrated"
            hideHeaderOnMobile={true}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}