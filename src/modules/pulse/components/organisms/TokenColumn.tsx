import React, { useState, useMemo, memo } from "react";
import TokenCard, { TokenData } from "../molecules/TokenCard";
import TokenCardSkeleton from "../molecules/TokenCardSkeleton";
import ColumnHeader from "../molecules/ColumnHeader";

export interface TokenColumnProps {
  title: string;
  tokens: TokenData[];
  variant?: "new" | "final" | "migrated";
  hideHeaderOnMobile?: boolean;
  isLoading?: boolean;
}

const Skeletons = memo(() => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <TokenCardSkeleton key={i} />
    ))}
  </>
));

Skeletons.displayName = "Skeletons";

const EmptyState = memo(({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-40 text-textTertiary text-sm">
    <span>{message}</span>
  </div>
));

EmptyState.displayName = "EmptyState";

const TokenColumn = memo<TokenColumnProps>(
  ({ title, tokens, variant, hideHeaderOnMobile, isLoading }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTokens = useMemo(() => {
      if (!searchQuery) return tokens;
      const lowerQuery = searchQuery.toLowerCase();
      return tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(lowerQuery) ||
          token.ticker.toLowerCase().includes(lowerQuery)
      );
    }, [tokens, searchQuery]);

    return (
      <div className="flex flex-col h-full w-full flex-1 min-w-0">
        <div className={`${hideHeaderOnMobile ? "hidden xl:block" : "block"}`}>
          <ColumnHeader
            title={title}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
          {isLoading ? (
            <Skeletons />
          ) : (
            <>
              {filteredTokens.map((token) => (
                <TokenCard key={token.address} data={token} variant={variant} />
              ))}

              {filteredTokens.length === 0 && (
                <EmptyState
                  message={searchQuery ? "No matches found" : "No pairs found"}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

TokenColumn.displayName = "TokenColumn";

export default TokenColumn;
