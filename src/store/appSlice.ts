import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
import { TokenData } from "@/modules/pulse/components/molecules/TokenCard";
import { RootState } from "@/store/store";

const tokensAdapter = createEntityAdapter({
  selectId: (token: TokenData) => token.address,
});

const appSlice = createSlice({
  name: "app",
  initialState: tokensAdapter.getInitialState({
    initialized: false,
  }),
  reducers: {
    setInitialTokens: (state, action: PayloadAction<TokenData[]>) => {
      tokensAdapter.setAll(state, action.payload);
      state.initialized = true;
    },
    updateTokenData: (
      state,
      action: PayloadAction<{ address: string; updates: Partial<TokenData> }>
    ) => {
      const { address, updates } = action.payload;
      tokensAdapter.updateOne(state, { id: address, changes: updates });
    },
    addToken: tokensAdapter.addOne,
    removeToken: tokensAdapter.removeOne,
  },
});

export const { 
  selectAll: selectAllTokens,
  selectById: selectTokenById,
  selectIds: selectTokenIds
} = tokensAdapter.getSelectors<RootState>((state) => state.app);

export const { setInitialTokens, updateTokenData, addToken, removeToken } = appSlice.actions;
export default appSlice.reducer;