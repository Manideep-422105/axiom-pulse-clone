"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; 
import { setInitialTokens } from "@/store/appSlice"; 
import { useTokenSocket } from "@/hooks/useTokenSocket"; 

import TokenColumn from "./TokenColumn";
import { TokenData } from "./TokenCard";
import SectionHeader from "./PulseHeader";

// --- EXTENDED MOCK DATA (17 Items) ---
const generateMockTokens = (): TokenData[] => [
  // --- NEW PAIRS (Low Progress) ---
  {
    image: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    ticker: "PEPE",
    name: "Pepe The Frog",
    address: "8H7s...frog",
    timeAgo: "1m",
    price: 0.000042,
    progress: 12, 
    holders: 5400,
    topTraders: 15,
    trophies: 10,
    crowns: "2/6",
    views: 50000,
    badges: [{ type: "ghost", label: "5%", color: "red" }]
  },
  {
    image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    ticker: "DOGE2",
    name: "Doge Killer",
    address: "9K2a...kill",
    timeAgo: "5m",
    price: 0.0021,
    progress: 45, 
    holders: 1200,
    topTraders: 3,
    trophies: 1,
    crowns: "0/6",
    views: 1200,
    badges: [{ type: "sniper", label: "0%", color: "green" }]
  },
  {
    image: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    ticker: "FLOKI",
    name: "Floki Viking",
    address: "1J9x...boat",
    timeAgo: "10s",
    price: 0.000009,
    progress: 5, 
    holders: 50,
    topTraders: 0,
    trophies: 0,
    crowns: "0/6",
    views: 300,
    badges: [{ type: "chef", label: "DEV", color: "blue" }]
  },
  {
    image: "https://cryptologos.cc/logos/apecoin-ape-logo.png",
    ticker: "APE",
    name: "ApeCoin DAO",
    address: "Ap3...coin",
    timeAgo: "2s",
    price: 1.05,
    progress: 1, 
    holders: 10,
    topTraders: 0,
    trophies: 0,
    crowns: "0/6",
    views: 50,
    badges: []
  },
  {
    image: "https://cryptologos.cc/logos/render-token-rndr-logo.png",
    ticker: "RNDR",
    name: "Render Network",
    address: "Rnd...gpu",
    timeAgo: "15m",
    price: 7.80,
    progress: 35,
    holders: 850,
    topTraders: 5,
    trophies: 2,
    crowns: "1/6",
    views: 4500,
    badges: [{ type: "sniper", label: "5%", color: "green" }]
  },
  {
    image: "https://cryptologos.cc/logos/fantom-ftm-logo.png",
    ticker: "FTM",
    name: "Fantom Opera",
    address: "Ftm...opera",
    timeAgo: "30m",
    price: 0.65,
    progress: 60,
    holders: 2100,
    topTraders: 12,
    trophies: 5,
    crowns: "0/6",
    views: 8900,
    badges: [{ type: "ghost", label: "Hidden", color: "gray" }]
  },
  {
    image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    ticker: "OP",
    name: "Optimism",
    address: "Op...L2",
    timeAgo: "1h",
    price: 2.10,
    progress: 75,
    holders: 3500,
    topTraders: 25,
    trophies: 8,
    crowns: "2/6",
    views: 12000,
    badges: [{ type: "chef", label: "L2", color: "red" }]
  },

  // --- FINAL STRETCH (High Progress > 80%) ---
  {
    image: "https://cryptologos.cc/logos/bonk1-bonk-logo.png",
    ticker: "BONK",
    name: "Bonk Inu",
    address: "5H2z...bonk",
    timeAgo: "45m",
    price: 0.0245,
    progress: 88, 
    holders: 15400,
    topTraders: 120,
    trophies: 25,
    crowns: "6/6",
    views: 95000,
    badges: [{ type: "holders", label: "Top 1%", color: "green" }]
  },
  {
    image: "https://cryptologos.cc/logos/dogwifhat-wif-logo.png",
    ticker: "WIF",
    name: "Dog Wif Hat",
    address: "3B1c...hats",
    timeAgo: "1h",
    price: 2.45,
    progress: 95, 
    holders: 8000,
    topTraders: 55,
    trophies: 12,
    crowns: "4/6",
    views: 75000,
    badges: [{ type: "boxes", label: "Whale", color: "blue" }]
  },
  {
    image: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    ticker: "ARB",
    name: "Arbitrum One",
    address: "Arb...one",
    timeAgo: "2h",
    price: 1.05,
    progress: 82, 
    holders: 9000,
    topTraders: 80,
    trophies: 15,
    crowns: "3/6",
    views: 45000,
    badges: [{ type: "holders", label: "Whale", color: "blue" }]
  },
  {
    image: "https://cryptologos.cc/logos/sui-sui-logo.png",
    ticker: "SUI",
    name: "Sui Network",
    address: "Su1...water",
    timeAgo: "3h",
    price: 1.65,
    progress: 90,
    holders: 12000,
    topTraders: 100,
    trophies: 20,
    crowns: "4/6",
    views: 60000,
    badges: [{ type: "boxes", label: "Vc", color: "green" }]
  },
  {
    image: "https://cryptologos.cc/logos/sei-sei-logo.png",
    ticker: "SEI",
    name: "Sei Network",
    address: "Se1...fast",
    timeAgo: "4h",
    price: 0.55,
    progress: 98, 
    holders: 18000,
    topTraders: 150,
    trophies: 30,
    crowns: "5/6",
    views: 85000,
    badges: [{ type: "sniper", label: "Bot", color: "red" }]
  },

  // --- MIGRATED (100% Progress) ---
  {
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    ticker: "SOL",
    name: "Solana",
    address: "So11...1111",
    timeAgo: "4y",
    price: 145.20,
    progress: 100, 
    holders: 1000000,
    topTraders: 5000,
    trophies: 99,
    crowns: "6/6",
    views: 1000000,
    badges: [{ type: "holders", label: "L1", color: "gray" }]
  },
  {
    image: "https://cryptologos.cc/logos/jupiter-ag-jup-logo.png",
    ticker: "JUP",
    name: "Jupiter",
    address: "JUP...iter",
    timeAgo: "2mo",
    price: 1.10,
    progress: 100, 
    holders: 500000,
    topTraders: 2000,
    trophies: 50,
    crowns: "6/6",
    views: 800000,
    badges: [{ type: "chef", label: "DEX", color: "blue" }]
  },
  {
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    ticker: "ETH",
    name: "Ethereum",
    address: "0x...000",
    timeAgo: "8y",
    price: 3200.00,
    progress: 100,
    holders: 5000000,
    topTraders: 10000,
    trophies: 100,
    crowns: "6/6",
    views: 2000000,
    badges: [{ type: "holders", label: "OG", color: "blue" }]
  },
  {
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    ticker: "USDT",
    name: "Tether USD",
    address: "Trc...20",
    timeAgo: "6y",
    price: 1.00,
    progress: 100,
    holders: 8000000,
    topTraders: 2000,
    trophies: 50,
    crowns: "6/6",
    views: 500000,
    badges: [{ type: "chef", label: "Stable", color: "green" }]
  },
  {
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    ticker: "DOGE",
    name: "Dogecoin",
    address: "Doge...moon",
    timeAgo: "9y",
    price: 0.15,
    progress: 100,
    holders: 3000000,
    topTraders: 5000,
    trophies: 80,
    crowns: "6/6",
    views: 1500000,
    badges: [{ type: "ghost", label: "Elon", color: "red" }]
  }
];

export default function TokenBoard() {
  const dispatch = useDispatch();
  
  // 1. Get the Big Bucket of data
  const tokens = useSelector((state: RootState) => state.app.tokens);

  useEffect(() => {
    const initialData = generateMockTokens();
    dispatch(setInitialTokens(initialData));
  }, [dispatch]);

  // Activate WebSocket for Price Updates
  useTokenSocket();

  // 2. THE LOGIC: Filter the single list into 3 separate lists
  const newPairs = tokens.filter(t => t.progress < 80);
  const finalStretch = tokens.filter(t => t.progress >= 80 && t.progress < 100);
  const migrated = tokens.filter(t => t.progress >= 100);

  return (
    // CHANGE: Layout structure for "Floating Panel"
    // flex-1: Fills the remaining vertical space
    // min-h-0: Essential for nested scrolling in flex containers
    // mb-[10px]: The exact gap between the board and the footer
    <div className="flex-1 min-h-0 w-full px-4 flex flex-col mb-[10px]">
      
      {/* Fixed Search Header */}
      <div className="flex-shrink-0">
        <SectionHeader />
      </div>

      {/* Scrollable Column Container */}
      <div className="flex-1 min-h-0 w-full flex flex-row border border-primaryStroke rounded-lg bg-backgroundSecondary divide-x divide-primaryStroke overflow-hidden shadow-2xl">
        
        {/* Column 1: Progress 0% - 79% */}
        <TokenColumn title="New Pairs" tokens={newPairs} />

        {/* Column 2: Progress 80% - 99% */}
        <TokenColumn title="Final Stretch" tokens={finalStretch} />

        {/* Column 3: Progress 100% */}
        <TokenColumn title="Migrated" tokens={migrated} />
        
      </div>
    </div>
  );
}