import React, { useState, useMemo } from "react";
import TokenCard, { TokenData } from "../molecules/TokenCard";
import TokenCardSkeleton from "../molecules/TokenCardSkeleton"; // <--- Import
import ColumnHeader from "../molecules/ColumnHeader";

export interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  variant?: "new" | "final" | "migrated"; 
  hideHeaderOnMobile?: boolean; 
  isLoading?: boolean; // <--- Add Prop
}

export default function TokenColumn({ title, tokens, variant, hideHeaderOnMobile, isLoading }: TokenColumnProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;
    const lowerQuery = searchQuery.toLowerCase();
    return tokens.filter((token) => 
      token.name.toLowerCase().includes(lowerQuery) || 
      token.ticker.toLowerCase().includes(lowerQuery)
    );
  }, [tokens, searchQuery]);

  return (
    <div className="flex flex-col h-full w-full flex-1 min-w-0">
      
      {/* Header */}
      <div className={`${hideHeaderOnMobile ? 'hidden xl:block' : 'block'}`}>
        <ColumnHeader 
          title={title} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        
        {/* LOADING STATE */}
        {isLoading ? (
          // Render 6 Skeletons while loading
          Array.from({ length: 6 }).map((_, i) => (
            <TokenCardSkeleton key={i} />
          ))
        ) : (
          // DATA STATE
          <>
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
          </>
        )}
      </div>
    </div>
  );
}