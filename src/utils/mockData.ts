import { TokenData } from "@/modules/pulse/components/TokenCard";

// --- 1. ASSETS & NAMES ---
const tokenImages = [
  "https://cryptologos.cc/logos/pepe-pepe-logo.png",
  "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
  "https://cryptologos.cc/logos/dogwifhat-wif-logo.png",
  "https://cryptologos.cc/logos/solana-sol-logo.png",
  "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
  "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
  "https://cryptologos.cc/logos/apecoin-ape-logo.png",
  "https://cryptologos.cc/logos/render-token-rndr-logo.png",
  "https://cryptologos.cc/logos/fantom-ftm-logo.png",
  "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  "https://cryptologos.cc/logos/sui-sui-logo.png",
  "https://cryptologos.cc/logos/sei-sei-logo.png",
  "https://cryptologos.cc/logos/jupiter-ag-jup-logo.png",
  "https://cryptologos.cc/logos/tether-usdt-logo.png",
  "https://cryptologos.cc/logos/dogecoin-doge-logo.png"
];

const newNames = ["BabyPepe", "ElonMars", "SafeMoon2", "CatWifHat", "DogeKiller", "RugCheck", "BasedGod", "PepeGPT", "MatrixInu", "YOLO"];
const finalNames = ["GigaChad", "MogCoin", "Retardio", "PopCat", "Michi", "Slerf", "Myro", "Ponke", "Billy", "TrumpCoin"];
const migratedNames = ["WIF", "BONK", "PEPE", "SOL", "JUP", "RAY", "PYTH", "ORCA", "WEN", "BOME"];

// --- 2. HELPERS ---
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateBadges = (status: string): TokenData["badges"] => {
  const badges: TokenData["badges"] = [];
  
  // Logic: Migrated tokens usually have "Holders" or "Blue" badges
  if (status === "migrated") {
    badges.push({ type: "holders", label: "Top 1%", color: "blue" });
    if (Math.random() > 0.5) badges.push({ type: "chef", label: "DEX", color: "green" });
    return badges;
  }

  // Logic: New tokens have risky/volatile badges
  if (status === "new") {
    badges.push({ type: "holders", label: `${Math.floor(Math.random() * 50)}%`, color: "red" });
    if (Math.random() > 0.6) badges.push({ type: "sniper", label: "Bot", color: "red" });
    if (Math.random() > 0.7) badges.push({ type: "ghost", label: "New", color: "green" });
    return badges;
  }

  // Logic: Final tokens are mixed
  badges.push({ type: "boxes", label: "Whale", color: "green" });
  if (Math.random() > 0.5) badges.push({ type: "holders", label: "Distr", color: "green" });
  
  return badges;
};

// --- 3. GENERATOR ---
export const generateMockToken = (id: number): TokenData & { status: string } => {
  // Cycle through statuses to ensure we have data for ALL columns
  const statuses: Array<"new" | "final" | "migrated"> = ["new", "final", "migrated"];
  const status = statuses[id % 3]; // Ensures even distribution (0=new, 1=final, 2=migrated...)

  let name = "";
  let ticker = "";
  let price = 0;
  let mc = 0;
  let timeAgo = "";
  let protocol: "pump" | "meteora" | "std" = "pump";

  // Customize stats based on Status Category
  if (status === "new") {
    name = random(newNames);
    ticker = name.toUpperCase().substring(0, 4);
    price = Math.random() * 0.0001;
    mc = Math.random() * 15000; // $0 - $15k
    timeAgo = `${Math.floor(Math.random() * 59) + 1}s`;
    protocol = "pump";
  } else if (status === "final") {
    name = random(finalNames);
    ticker = name.toUpperCase().substring(0, 4);
    price = Math.random() * 0.001;
    mc = 30000 + Math.random() * 30000; // $30k - $60k
    timeAgo = `${Math.floor(Math.random() * 59) + 1}m`;
    protocol = Math.random() > 0.5 ? "meteora" : "pump";
  } else {
    name = random(migratedNames);
    ticker = name;
    price = Math.random() * 10 + 0.1;
    mc = 100000 + Math.random() * 5000000; // $100k+
    timeAgo = `${Math.floor(Math.random() * 20) + 1}d`;
    protocol = "std";
  }

  return {
    image: random(tokenImages),
    ticker: ticker,
    name: name,
    address: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    timeAgo: timeAgo,
    
    price: price,
    volume: `$${(mc / 5).toFixed(1)}K`, // Approx volume relative to MC
    marketCap: `$${(mc / 1000).toFixed(1)}K`,
    
    protocol: protocol,
    
    holders: Math.floor(mc / 10), // More MC = More holders
    topTraders: Math.floor(Math.random() * 20),
    trophies: Math.floor(Math.random() * 10),
    crowns: `0/${Math.floor(Math.random() * 3) + 1}`,
    views: Math.floor(Math.random() * 5000) + 100,
    
    curveProgress: status === "migrated" ? 1.0 : parseFloat(Math.random().toFixed(3)),
    txCount: Math.floor(Math.random() * 500) + 10,

    hasQuill: Math.random() > 0.7,
    hasPill: protocol === "pump",
    hasWebsite: Math.random() > 0.5,

    badges: generateBadges(status),
    status: status, // Vital for the column filtering!
  };
};