import React, { useState, useMemo } from "react";
import TokenCard, { TokenData } from "./TokenCard";
import ColumnHeader from "./ColumnHeader";

export interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  variant?: "new" | "final" | "migrated"; 
}

export default function TokenColumn({ title, tokens, variant }: TokenColumnProps) {
  // 1. Local State for Search
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Filter Logic (Memoized for performance)
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;
    
    const lowerQuery = searchQuery.toLowerCase();
    
    return tokens.filter((token) => 
      token.name.toLowerCase().includes(lowerQuery) || 
      token.ticker.toLowerCase().includes(lowerQuery)
    );
  }, [tokens, searchQuery]);

  return (
    <div className="flex flex-col h-full min-w-[320px] flex-1">
      {/* Header Section with Search Props passed down */}
      <ColumnHeader 
        title={title} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        
        {/* Render FILTERED tokens instead of raw tokens */}
        {filteredTokens.map((token, idx) => (
          <TokenCard 
            key={idx} 
            data={token} 
            variant={variant} 
          />
        ))}

        {/* Empty State */}
        {filteredTokens.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-textTertiary text-sm">
            <span>
              {searchQuery ? "No matches found" : "No pairs found"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}