import Header from "./components/Header";
import SectionHeader from "./components/SectionHeader";
import TokenList from "./components/TokenList";
import { SubHeader } from "./components/SubHeader";
export default function PulsePage() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      
      <Header />
      <SubHeader />
      <div className="px-6 py-4">
        {/* Page Header */}
        <SectionHeader />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          <TokenList title="New Pairs" />
          <TokenList title="Final Stretch" />
          <TokenList title="Migrated" />
        </div>
      </div>
    </div>
  );
}
