import React from "react";
import Header from "../../components/organisms/Header";
import { SubHeader } from "./components/molecules/SubHeader";
import TokenBoard from "./components/organisms/TokenBoard";
import Footer from "../../components/organisms/Footer";

export default function PulsePage() {
  return (
    <div className="flex flex-col w-full h-screen supports-[height:100dvh]:h-[100dvh] bg-[#0b0d12] text-white overflow-hidden">
      <div className="flex-shrink-0">
        <Header />
        <SubHeader />
      </div>

      <main className="flex-1 min-h-0 w-full relative">
        <TokenBoard />
      </main>

      <div className="flex-shrink-0 z-50">
        <Footer />
      </div>
    </div>
  );
}