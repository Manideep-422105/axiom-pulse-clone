import Header from "./components/Header";
import { SubHeader } from "./components/SubHeader";
import TokenBoard from "./components/TokenBoard";
import Footer from "./components/Footer";

export default function PulsePage() {
  return (
    // CHANGE 1: h-screen (locks height) and flex-col
    <div className="h-screen w-full bg-[#0b0d12] text-white flex flex-col overflow-hidden">
      
      {/* Header & SubHeader stay at top */}
      <div className="flex-shrink-0">
        <Header />
        <SubHeader />
      </div>

      {/* TokenBoard takes all remaining space */}
      <TokenBoard />

      {/* Footer stays at bottom (flex-shrink-0 prevents it from squishing) */}
      <div className="flex-shrink-0 z-50">
        <Footer />
      </div>
      
    </div>
  );
}