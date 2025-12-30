import React from "react";
import TokenColumn from "./TokenColumn";
import { TokenData } from "./TokenCard";
import SectionHeader from "./PulseHeader";
// MOCK DATA GENERATOR (Just for display purposes)
const mockTokens: TokenData[] = [
  {
    image: "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/2N8hBrBqnV2fWPHQPm7UQhQNDmfKASjfRvSDQBc4pump.webp",
    ticker: "A.P.U.",
    name: "Administrative Performance Unit",
    address: "2N8h...pump",
    timeAgo: "15s",
    holders: 1,
    topTraders: 1,
    trophies: 0,
    crowns: "0/6",
    views: 1,
    badges: [
       { type: "holders", label: "0%", color: "green" },
       { type: "chef", label: "DS", subLabel: "4h", color: "blue" },
       { type: "sniper", label: "0%", color: "green" },
       { type: "ghost", label: "0%", color: "green" },
       { type: "boxes", label: "0%", color: "green" },
    ]
  },
  // Add more mock items...
];

export default function TokenBoard() {
  return (
    <div className="w-full h-[calc(100vh-140px)] px-4 pb-4">
      <SectionHeader />

      {/* THE JOINED CONTAINER:
         1. border border-primaryStroke -> Outer border
         2. rounded-lg -> Rounded corners for the whole block
         3. divide-x -> Creates the vertical lines between columns
         4. bg-backgroundSecondary -> Dark background
      */}
      <div className="w-full h-full flex flex-row border border-primaryStroke rounded-lg bg-backgroundSecondary divide-x divide-primaryStroke overflow-hidden shadow-2xl">
        {/* Column 1: New Pairs */}
        <TokenColumn title="New Pairs" tokens={mockTokens} />

        {/* Column 2: Final Stretch */}
        <TokenColumn title="Final Stretch" tokens={mockTokens} />

        {/* Column 3: Migrated */}
        <TokenColumn title="Migrated" tokens={mockTokens} />
      </div>
    </div>
  );
}
