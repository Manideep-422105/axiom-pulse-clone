import TokenRow from "./TokenRow";

type Props = {
  title: string;
};

export default function TokenList({ title }: Props) {
  return (
    <div className="bg-[#0f1119] border border-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>

        <input
          placeholder="Search by ticker or name"
          className="bg-black/40 border border-gray-700 text-sm px-3 py-1.5 rounded-lg outline-none focus:border-gray-500"
        />
      </div>

      <div className="space-y-3">
        <TokenRow
          logo="https://i.pravatar.cc/300"
          symbol="TEST"
          name="Sample Token"
          age="5s"
          price="170"
          marketCap="3.9K"
        />

        <TokenRow
          logo="https://i.pravatar.cc/301"
          symbol="CODED"
          name="Test Coin"
          age="11s"
          price="11000"
          marketCap="43.2K"
        />

        <TokenRow
          logo="https://i.pravatar.cc/302"
          symbol="VELO"
          name="Velo"
          age="7m"
          price="10000"
          marketCap="262K"
        />
      </div>
    </div>
  );
}
