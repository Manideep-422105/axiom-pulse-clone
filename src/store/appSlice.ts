import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenData } from "@/modules/pulse/components/TokenCard"; // Adjust path if needed

interface AppState {
  initialized: boolean;
  // We store tokens here. In a real app, you might separate this into a 'marketSlice'
  tokens: TokenData[]; 
}

const initialState: AppState = {
  initialized: true,
  tokens: [], // Initial empty state
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Action to load initial data (fetched from API)
    setInitialTokens: (state, action: PayloadAction<TokenData[]>) => {
      state.tokens = action.payload;
    },
    // Action to update a SINGLE token's price (Efficient update)
    updateTokenPrice: (state, action: PayloadAction<{ ticker: string; newPrice: number; newProgress?: number }>) => {
      const { ticker, newPrice, newProgress } = action.payload;
      const token = state.tokens.find((t) => t.ticker === ticker);
      if (token) {
        token.price = newPrice;
        if (newProgress !== undefined) {
          token.progress = newProgress;
        }
      }
    },
  },
});

export const { setInitialTokens, updateTokenPrice } = appSlice.actions;
export default appSlice.reducer;