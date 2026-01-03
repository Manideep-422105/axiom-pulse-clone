import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Make sure this points to your new slice file location
import { setInitialTokens, updateTokenData, selectAllTokens, selectTokenIds } from "@/store/appSlice";
import { RootState } from "@/store/store";
import { TokenData } from "@/modules/pulse/components/molecules/TokenCard";

// --- 1. HELPER: Mock Data Generator ---
const tickers = ["PEPE", "BONK", "WIF", "POPCAT", "GIGA", "MICHI", "MOG", "TRUMP", "SLERF", "MYRO"];
const images = [
  "https://cryptologos.cc/logos/pepe-pepe-logo.png",
  "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
  "https://cryptologos.cc/logos/solana-sol-logo.png",
];
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateBadges = (): TokenData["badges"] => {
  const badges: TokenData["badges"] = [
    {
      type: "holders",
      label: `${Math.floor(Math.random() * 90) + 10}%`,
      color: Math.random() > 0.5 ? "green" : "red",
    },
  ];

  if (Math.random() > 0.3) {
    badges.push({
      type: "chef",
      label: "0%",
      subLabel: `${Math.floor(Math.random() * 59) + 1}m`,
      color: "green",
    });
  }

  if (Math.random() > 0.3) {
    badges.push({
      type: "sniper",
      label: `${Math.floor(Math.random() * 50)}%`,
      color: Math.random() > 0.7 ? "green" : "red",
    });
  }

  if (Math.random() > 0.5) badges.push({ type: "ghost", label: "5%", color: "green" });
  if (Math.random() > 0.5) badges.push({ type: "boxes", label: "0%", color: "green" });

  return badges;
};

// CRITICAL FIX: Ensure unique addresses for Entity Adapter
const generateMockToken = (id: number): TokenData & { status: string } => {
  const price = Math.random() * 0.01 + 0.0001;
  const mcRaw = price * 1000000000;
  const statuses = ["new", "final", "migrated"] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Create a genuinely unique address
  const uniqueAddress = `7LTp${id}${Math.random().toString(36).substring(7)}`;

  return {
    ticker: random(tickers),
    name: "Mock Token",
    image: random(images),
    address: uniqueAddress, // Used as ID
    timeAgo: `${Math.floor(Math.random() * 59) + 1}s`,
    price: price,
    volume: `$${(Math.random() * 500).toFixed(1)}K`,
    marketCap: `$${(mcRaw / 1000).toFixed(1)}K`,
    protocol: Math.random() > 0.7 ? "meteora" : "pump",
    holders: Math.floor(Math.random() * 500) + 50,
    topTraders: Math.floor(Math.random() * 20),
    trophies: Math.floor(Math.random() * 5),
    crowns: `0/${Math.floor(Math.random() * 5) + 1}`,
    views: Math.floor(Math.random() * 2000),
    curveProgress: parseFloat(Math.random().toFixed(3)),
    txCount: Math.floor(Math.random() * 500),
    hasQuill: Math.random() > 0.8,
    hasPill: Math.random() > 0.8,
    hasWebsite: Math.random() > 0.8,
    badges: generateBadges(),
    status: randomStatus,
  };
};

const formatCompact = (num: number, prefix = "") => {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return prefix + formatter.format(num);
};

// --- 3. MAIN HOOK ---
export const useTokenSocket = () => {
  const dispatch = useDispatch();
  
  // Use selectAllTokens to check if populated
  const allTokens = useSelector(selectAllTokens);
  
  // Use RootState to access the full store if needed, but selectTokenIds gives us IDs directly
  // However, inside the hook we need the full objects to calculate next state.
  // Since we have `allTokens` (array), we can pick from there.

  // A. INITIALIZATION
  useEffect(() => {
    if (allTokens.length === 0) {
      const initialBatch = Array.from({ length: 30 }).map((_, i) =>
        generateMockToken(i)
      );
      dispatch(setInitialTokens(initialBatch));
    }
  }, [dispatch, allTokens.length]);

  // B. LIVE SIMULATION
  useEffect(() => {
    if (allTokens.length === 0) return;

    const intervalId = setInterval(() => {
      // Pick random token from array
      const randomIndex = Math.floor(Math.random() * allTokens.length);
      const currentToken = allTokens[randomIndex];

      if (!currentToken) return;

      // Simulation Logic
      const volatility = 0.02;
      const direction = Math.random() > 0.45 ? 1 : -1;
      const change = 1 + Math.random() * volatility * direction;
      const newPrice = currentToken.price * change;

      const currentVolNum = parseFloat(currentToken.volume.replace(/[^0-9.]/g, "")) * 1000 || 10000;
      const newVolNum = currentVolNum + Math.random() * 500;

      const newMarketCap = formatCompact(newPrice * 1000000000, "$");
      const newVolume = formatCompact(newVolNum, "$");

      const currentTx = currentToken.txCount || 0;
      const newTxCount = currentTx + (Math.random() > 0.6 ? 1 : 0);

      const currentCurve = currentToken.curveProgress || 0;
      let newCurveProgress = currentCurve + 0.001;
      if (newCurveProgress > 1.0) newCurveProgress = 0.01;

      // DISPATCH UPDATE
      // Important: Use 'address' instead of 'ticker' because address is the Entity ID
      dispatch(
        updateTokenData({
          address: currentToken.address, 
          updates: {
            price: newPrice,
            marketCap: newMarketCap,
            volume: newVolume,
            txCount: newTxCount,
            curveProgress: parseFloat(newCurveProgress.toFixed(3)),
            holders: currentToken.holders + (Math.random() > 0.9 ? 1 : 0),
          },
        })
      );
    }, 200);

    return () => clearInterval(intervalId);
  }, [allTokens, dispatch]);
};