import Image from "next/image";
import {
  Globe,
  Users,
  Search,
  BarChart3,
  Crown,
} from "lucide-react";

export type TokenRowProps = {
  logo: string;
  symbol: string;
  name: string;
  age: string;
  price: string;
  marketCap: string;
};

export default function TokenRow({
  logo,
  symbol,
  name,
  age,
  price,
  marketCap,
}: TokenRowProps) {
  return (
    <div
      className="
        flex items-center gap-3 
        bg-[#0c0f16]
        border border-gray-800 
        rounded-xl p-3
        hover:bg-[#101522]
        hover:border-gray-600
        transition-colors duration-300
        cursor-pointer
      "
    >
      {/* Left Image */}
      <div className="relative min-w-[52px] h-[52px]">
        <Image
          src={logo}
          alt={symbol}
          fill
          className="
            rounded-lg 
            border border-gray-700 
            object-cover
          "
        />

        {/* Online Status */}
        <span
          className="
            absolute -bottom-1 -right-1 
            h-4 w-4 rounded-full 
            border-2 border-[#0c0f16]
            bg-green-500
          "
        />
      </div>

      {/* Middle */}
      <div className="flex-1">
        {/* Title Row */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[15px]">
            {symbol}
          </span>

          <span className="text-gray-400 text-sm">
            {name}
          </span>

          {/* Copy icon placeholder */}
          <span className="w-4 h-4 rounded-sm bg-gray-700" />
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-2 text-[13px] mt-1 text-gray-300">
          <span className="text-green-400">{age}</span>

          <Globe size={16} className="opacity-80" />
          <Users size={16} className="opacity-80" />
          <Search size={16} className="opacity-80" />
          <BarChart3 size={16} className="opacity-80" />
          <Crown size={16} className="opacity-80 text-yellow-400" />
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-2">
          <Badge value="5%" positive />
          <Badge value="0%" positive />
          <Badge value="75%" />
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <div className="text-[17px] font-semibold">
          ${price}
        </div>

        <div className="text-sm text-blue-400">
          MC ${marketCap}
        </div>
      </div>
    </div>
  );
}

function Badge({ value, positive }: { value: string; positive?: boolean }) {
  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs border
        ${
          positive
            ? "border-green-700 text-green-400 bg-green-400/10"
            : "border-red-700 text-red-400 bg-red-400/10"
        }
      `}
    >
      {value}
    </span>
  );
}
