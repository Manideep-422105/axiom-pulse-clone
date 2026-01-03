import React, { useState, useMemo } from "react";

import TokenCard, { TokenData } from "./TokenCard";
import ColumnHeader from "./ColumnHeader";

export interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  variant?: "new" | "final" | "migrated";
}

export default function TokenColumn({
  title,
  tokens,
  variant,
}: TokenColumnProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;

    const q = searchQuery.toLowerCase();
    return tokens.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.ticker.toLowerCase().includes(q)
    );
  }, [tokens, searchQuery]);

  return (
    <div className="flex flex-col h-full w-full min-w-0">
      {/* Header */}
      <ColumnHeader
        title={title}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        {filteredTokens.map((token, idx) => (
          <TokenCard key={idx} data={token} variant={variant} />
        ))}

        {filteredTokens.length === 0 && (
          <div className="flex items-center justify-center h-40 text-textTertiary text-sm">
            {searchQuery ? "No matches found" : "No pairs found"}
          </div>
        )}
      </div>
    </div>
  );
}
