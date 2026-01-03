import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenData } from "@/modules/pulse/components/TokenCard"; // Ensure this matches your TokenCard file path

interface AppState {
  initialized: boolean;
  tokens: TokenData[];
}

const initialState: AppState = {
  initialized: true,
  tokens: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // 1. Set Initial Data (unchanged)
    setInitialTokens: (state, action: PayloadAction<TokenData[]>) => {
      state.tokens = action.payload;
    },

    // 2. GENERIC Update Action (Replaces updateTokenPrice)
    // allowing you to update price, volume, holders, or any other field dynamically
    updateTokenData: (state, action: PayloadAction<{ ticker: string; updates: Partial<TokenData> }>) => {
      const { ticker, updates } = action.payload;
      const index = state.tokens.findIndex((t) => t.ticker === ticker);
      
      if (index !== -1) {
        // Efficiently merge the new partial data into the existing token
        state.tokens[index] = {
          ...state.tokens[index],
          ...updates,
        };
      }
    },
  },
});

export const { setInitialTokens, updateTokenData } = appSlice.actions;
export default appSlice.reducer;