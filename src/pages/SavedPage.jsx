export default function SavedPage() {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-center justify-center text-center py-20">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[48px] text-[#E84A27]">bookmark</span>
      </div>
      <h2 className="text-[20px] font-extrabold text-gray-900 mb-2">Bộ Sưu Tập Của Bạn</h2>
      <p className="text-[13px] text-gray-500 max-w-xs">
        Lưu các quán ăn yêu thích để tìm đường nhanh hơn lần sau. Bấm vào biểu tượng 🔖 tại bất kỳ quán nào để lưu vào đây.
      </p>
      <button className="mt-6 flex items-center gap-2 bg-[#E84A27] text-white px-6 py-2.5 rounded-full font-bold text-[13px] shadow-lg shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-105">
        <span className="material-symbols-outlined text-[18px]">explore</span>
        Khám phá quán ngay
      </button>
    </div>
  );
}
