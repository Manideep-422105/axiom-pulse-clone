// modules/pulse/components/TokenBoard.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTokenSocket } from "@/hooks/useTokenSocket";
import TokenColumn from "./TokenColumn";
import SectionHeader from "./PulseHeader";

export default function TokenBoard() {
  // 1. Data Generation Hook
  useTokenSocket();

  // 2. Select Data
  const tokens = useSelector((state: RootState) => state.app.tokens);

  // 3. Filter Logic
  const newPairs = tokens.filter((t: any) => t.status === "new");
  const finalStretch = tokens.filter((t: any) => t.status === "final");
  const migrated = tokens.filter((t: any) => t.status === "migrated");

  return (
    // PIXEL PERFECT LAYOUT FIXES:
    // 1. Added py-[24px] (Vertical Padding)
    // 2. Added responsive px-[16px] lg:px-[24px]
    // 3. Added gap-[16px] to separate Header from Board exactly
    <div className="flex flex-col w-full h-full gap-[16px] py-[24px] px-[16px] lg:px-[24px] min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex-none w-full">
        <SectionHeader />
      </div>

      {/* Main Board Area */}
      {/* PIXEL PERFECT BORDER/RADIUS:
          1. rounded-[8px] sm:rounded-[4px] (Responsive Radius)
          2. Removed shadow-2xl (Not present in inspection)
      */}
      <div className="flex-1 min-h-0 w-full flex flex-row border border-primaryStroke bg-backgroundSecondary rounded-[8px] sm:rounded-[4px] divide-x divide-primaryStroke overflow-hidden">
        <TokenColumn title="New Pairs" tokens={newPairs} variant="new" />

        <TokenColumn
          title="Final Stretch"
          tokens={finalStretch}
          variant="final"
        />

        <TokenColumn title="Migrated" tokens={migrated} variant="migrated" />
      </div>
    </div>
  );
}
