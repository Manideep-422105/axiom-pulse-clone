import React from "react";
import TokenCard, { TokenData } from "./TokenCard";
import ColumnHeader from "./ColumnHeader";

export interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  // ADDED: Accept the variant prop
  variant?: "new" | "final" | "migrated"; 
}

export default function TokenColumn({ title, tokens, variant }: TokenColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-[320px] flex-1">
      {/* Header Section */}
      <ColumnHeader title={title} />

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        
        {tokens.map((token, idx) => (
          <TokenCard 
            key={idx} 
            data={token} 
            // ADDED: Pass the variant down to the card
            variant={variant} 
          />
        ))}

        {/* Empty State */}
        {tokens.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-textTertiary text-sm">
            <span>No pairs found</span>
          </div>
        )}
      </div>
    </div>
  );
}