"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTokenSocket } from "@/hooks/useTokenSocket";
import TokenColumn from "./TokenColumn";
import SectionHeader from "./PulseHeader";
import { RiSearch2Line, RiEqualizer3Line } from "react-icons/ri";

export default function TokenBoard() {
  useTokenSocket();
  const tokens = useSelector((state: RootState) => state.app.tokens);

  // Simple loading check: If no tokens, we are likely loading
  // You can also add a specific loading state from Redux if you have one
  const isLoading = !tokens || tokens.length === 0;

  const newPairs = tokens.filter((t: any) => t.status === "new");
  const finalStretch = tokens.filter((t: any) => t.status === "final");
  const migrated = tokens.filter((t: any) => t.status === "migrated");

  const [activeTab, setActiveTab] = useState<"new" | "final" | "migrated">("new");

  return (
    <div className="flex flex-col w-full h-full gap-[16px] py-[24px] px-[16px] lg:px-[24px] min-w-0 overflow-hidden">
      
      <div className="flex-none w-full">
        <SectionHeader />
      </div>

      {/* Mobile Tabs (unchanged) ... */}
      <div className="flex xl:hidden flex-row justify-between items-center border-b border-primaryStroke pb-2 mb-[-16px] z-20">
         {/* ... (Your existing tab code) ... */}
      </div>

      <div className="flex-1 min-h-0 w-full flex flex-col xl:flex-row xl:border xl:border-primaryStroke bg-backgroundSecondary rounded-[8px] sm:rounded-[4px] xl:divide-x xl:divide-primaryStroke overflow-hidden">
        
        {/* Pass isLoading to each column */}
        <div className={`${activeTab === 'new' ? 'flex' : 'hidden'} xl:flex flex-1 min-h-0`}>
          <TokenColumn 
            title="New Pairs" 
            tokens={newPairs} 
            variant="new" 
            hideHeaderOnMobile={true} 
            isLoading={isLoading} // <--- Pass here
          />
        </div>

        <div className={`${activeTab === 'final' ? 'flex' : 'hidden'} xl:flex flex-1 min-h-0`}>
          <TokenColumn 
            title="Final Stretch" 
            tokens={finalStretch} 
            variant="final" 
            hideHeaderOnMobile={true}
            isLoading={isLoading} // <--- Pass here
          />
        </div>

        <div className={`${activeTab === 'migrated' ? 'flex' : 'hidden'} xl:flex flex-1 min-h-0`}>
          <TokenColumn 
            title="Migrated" 
            tokens={migrated} 
            variant="migrated" 
            hideHeaderOnMobile={true}
            isLoading={isLoading} // <--- Pass here
          />
        </div>
        
      </div>
    </div>
  );
}