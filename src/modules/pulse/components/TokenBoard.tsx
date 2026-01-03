"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { useTokenSocket } from "@/hooks/useTokenSocket";

import TokenColumn from "./TokenColumn";
import SectionHeader from "./PulseHeader";

export default function TokenBoard() {
  useTokenSocket();

  const tokens = useSelector((state: RootState) => state.app.tokens);

  const newPairs = tokens.filter((t: any) => t.status === "new");
  const finalStretch = tokens.filter((t: any) => t.status === "final");
  const migrated = tokens.filter((t: any) => t.status === "migrated");

  const [activeTab, setActiveTab] = useState<"new" | "final" | "migrated">(
    "new"
  );

  return (
    <div className="flex flex-col w-full h-full gap-[16px] py-[24px] px-[16px] lg:px-[24px] min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex-none w-full">
        <SectionHeader />
      </div>

      {/* ================= DESKTOP (LG+) ================= */}
      <div className="hidden lg:flex flex-1 min-h-0 w-full flex-row border border-primaryStroke bg-backgroundSecondary rounded-[8px] divide-x divide-primaryStroke overflow-hidden">
        <TokenColumn title="New Pairs" tokens={newPairs} variant="new" />
        <TokenColumn
          title="Final Stretch"
          tokens={finalStretch}
          variant="final"
        />
        <TokenColumn title="Migrated" tokens={migrated} variant="migrated" />
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="flex lg:hidden flex-col flex-1 min-h-0 w-full border border-primaryStroke bg-backgroundSecondary rounded-[8px] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-primaryStroke">
          {[
            { key: "new", label: "New Pairs" },
            { key: "final", label: "Final Stretch" },
            { key: "migrated", label: "Migrated" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 h-[44px] text-sm font-medium transition-colors
                ${
                  activeTab === tab.key
                    ? "text-primaryBlue border-b-2 border-primaryBlue"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Column */}
        <div className="flex-1 min-h-0">
          {activeTab === "new" && (
            <TokenColumn title="New Pairs" tokens={newPairs} variant="new" />
          )}
          {activeTab === "final" && (
            <TokenColumn
              title="Final Stretch"
              tokens={finalStretch}
              variant="final"
            />
          )}
          {activeTab === "migrated" && (
            <TokenColumn
              title="Migrated"
              tokens={migrated}
              variant="migrated"
            />
          )}
        </div>
      </div>
    </div>
  );
}
