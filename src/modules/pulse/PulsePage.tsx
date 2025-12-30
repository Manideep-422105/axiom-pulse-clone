import Header from "./components/Header";
import TokenList from "./components/TokenList";
import { SubHeader } from "./components/SubHeader";
import TokenColumn from "./components/TokenColumn";
import TokenBoard from "./components/TokenBoard";
import Footer from "./components/Footer";
export default function PulsePage() {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      <Header />
      <SubHeader />
      <TokenBoard />
      <Footer />
    </div>
  );
}
