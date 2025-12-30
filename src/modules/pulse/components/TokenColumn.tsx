import React from "react";
import TokenCard, { TokenData } from "./TokenCard";
import ColumnHeader from "./ColumnHeader";

// 1. DEFINE AND EXPORT THE INTERFACE HERE
export interface TokenColumnProps {
  title: string;
  tokens: TokenData[]; 
}

export default function TokenColumn({ title, tokens }: TokenColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-[320px] flex-1">
      
      {/* 2. Header Section */}
      <ColumnHeader title={title} />

      {/* 3. Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primaryStroke scrollbar-track-transparent">
        {tokens.map((token, idx) => (
           <TokenCard key={idx} data={token} />
        ))}
        
        {/* Empty State / Loading Placeholder */}
        {tokens.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-textTertiary text-sm">
             <span>No pairs found</span>
          </div>
        )}
      </div>
    </div>
  );
}