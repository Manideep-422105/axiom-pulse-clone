export default function SectionHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Pulse</h1>

        <div className="flex gap-2">
          {/* Just placeholders */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
          <div className="w-8 h-8 rounded-full bg-yellow-500" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 transition">
          Display
        </button>
      </div>
    </div>
  );
}
