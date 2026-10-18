import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aiDishes } from "../data/places";

const moodCategories = [
  { id: "hot_broth", label: "Nước lèo nóng hổi", icon: "soup_kitchen", desc: "Phở, bún bò, hủ tiếu hầm xương" },
  { id: "quick_crisp", label: "Ăn nhanh giòn rụm", icon: "lunch_dining", desc: "Bánh mì pate, đồ nướng, gỏi cuốn" },
  { id: "healthy", label: "Thanh đạm giải ngấy", icon: "spa", desc: "Rau củ, salad, cuốn tôm thịt" },
  { id: "full_belly", label: "No bụng chắc dạ", icon: "rice_bowl", desc: "Cơm tấm, cơm văn phòng nhiều thịt" },
];

const budgetRanges = [
  { id: "budget_low", label: "Dưới 40.000đ", sub: "Bình dân tiết kiệm" },
  { id: "budget_mid", label: "40.000đ - 80.000đ", sub: "Phổ biến hợp túi tiền" },
  { id: "budget_high", label: "Trên 80.000đ", sub: "Thả ga thưởng thức" },
];

const distanceRanges = [
  { id: "dist_1", label: "< 1 km", sub: "Đi bộ 5 phút" },
  { id: "dist_3", label: "< 3 km", sub: "Xe máy 10 phút" },
  { id: "dist_far", label: "Bất kể khoảng cách", sub: "Miễn là quán đỉnh" },
];

const quickTasteTags = [
  "Cay nồng ấm bụng",
  "Nước lèo thanh ngọt",
  "Ăn một mình",
  "Tụ tập bạn bè",
  "Trời mưa lạnh",
  "Thịt nướng xém cạnh",
  "Không dầu mỡ",
];

export default function AIPage() {
  const navigate = useNavigate();
  const [promptText, setPromptText] = useState("Trời mưa thèm tô phở bò sốt vang nóng hổi ấm bụng!");
  const [selectedMood, setSelectedMood] = useState("hot_broth");
  const [selectedBudget, setSelectedBudget] = useState("budget_mid");
  const [selectedDistance, setSelectedDistance] = useState("dist_3");
  const [activeTags, setActiveTags] = useState(["Cay nồng ấm bụng", "Trời mưa lạnh"]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Vòng quay may mắn / bốc quẻ ngẫu nhiên
  const [luckyDish, setLuckyDish] = useState(aiDishes[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  const handleLuckySpin = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * aiDishes.length);
      setLuckyDish(aiDishes[randomIndex]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-16">
      {/* Top Banner AI Smart Sommelier */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 border-b border-orange-200/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">smart_toy</span>
            AI SOMMELIER 2.0
          </span>
          <span className="text-[12px] text-gray-700 hidden sm:inline">
            Tự động gợi ý chuẩn xác theo tâm trạng, túi tiền và thời tiết hiện tại
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#E84A27] bg-white px-2.5 py-0.5 rounded-full border border-orange-100 shadow-sm">
          Đang quét quán mở cửa quanh bạn
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tiêu đề chính */}
        <div className="mb-6 animate-fadeIn">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Hôm Nay Bạn Muốn Ăn Gì? <span className="gradient-text-premium">Để AI Gợi Ý</span>
          </h1>
          <p className="text-[13px] text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Chọn cảm xúc hoặc nhập trực tiếp mong muốn của bạn. AI sẽ phân tích dữ liệu quán ăn đang mở cửa trong bán kính gần nhất để đưa ra lựa chọn hoàn hảo.
          </p>
        </div>

        {/* Khung Nhập Prompt & Tag nhanh */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 sm:p-5 mb-8 animate-slideInUp">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 gap-2 focus-within:border-[#E84A27] focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-[#E84A27] text-[20px]">psychology</span>
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Ví dụ: Đang stress cần món gì cay cay nóng hổi dưới 50k..."
                className="bg-transparent flex-1 text-[13px] font-medium text-gray-900 outline-none placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-[#E84A27] text-white text-[12px] font-bold hover:bg-[#c93d1f] shadow-md shadow-[#E84A27]/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isGenerating ? "autorenew" : "magic_button"}
              </span>
              {isGenerating ? "Đang phân tích..." : "Gợi ý ngay"}
            </button>
          </div>

          {/* Quick taste tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 mr-1 uppercase">Thẻ khẩu vị:</span>
            {quickTasteTags.map((tag) => {
              const isSelected = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                    isSelected
                      ? "bg-[#E84A27] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#E84A27]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Tiêu chí định hướng AI (Tâm trạng - Ngân sách - Bán kính) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 animate-slideInUp">
          {/* 1. Tâm trạng & Con thèm */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-extrabold text-[14px]">
                <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#E84A27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
                </span>
                1. Tâm trạng & Khẩu vị
              </div>
              <div className="space-y-2">
                {moodCategories.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                      selectedMood === m.id
                        ? "border-[#E84A27] bg-orange-50/60 text-[#E84A27]"
                        : "border-gray-100 hover:border-gray-200 text-gray-700 bg-gray-50/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[12px]">{m.label}</div>
                      <div className="text-[10px] text-gray-400 truncate">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Ngân sách thực tế */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-extrabold text-[14px]">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                </span>
                2. Mức giá mong muốn
              </div>
              <div className="space-y-2">
                {budgetRanges.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedBudget === b.id
                        ? "border-emerald-600 bg-emerald-50/60 text-emerald-800"
                        : "border-gray-100 hover:border-gray-200 text-gray-700 bg-gray-50/50"
                    }`}
                  >
                    <div className="font-extrabold text-[13px]">{b.label}</div>
                    <div className="text-[10px] text-gray-400">{b.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Khoảng cách & Di chuyển */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-extrabold text-[14px]">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                </span>
                3. Bán kính di chuyển
              </div>
              <div className="space-y-2">
                {distanceRanges.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistance(d.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedDistance === d.id
                        ? "border-blue-600 bg-blue-50/60 text-blue-800"
                        : "border-gray-100 hover:border-gray-200 text-gray-700 bg-gray-50/50"
                    }`}
                  >
                    <div className="font-extrabold text-[13px]">{d.label}</div>
                    <div className="text-[10px] text-gray-400">{d.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Kết quả AI Gợi Ý (Món ngon chuẩn vị nhất) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E84A27] text-[22px]">auto_awesome</span>
              <h2 className="text-[18px] font-extrabold text-gray-900">
                Gợi Ý Đỉnh Cao Khớp Khẩu Vị Nhất
              </h2>
            </div>
            <span className="text-[11px] text-gray-500 font-semibold">Tự động ưu tiên quán đang mở</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {aiDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar với Tag & Match % */}
                  <div className="p-3 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {dish.tag}
                    </span>
                    <span className="text-[11px] font-black text-[#E84A27]">
                      {dish.matchPct}% {dish.matchLabel}
                    </span>
                  </div>

                  <div className="p-4 flex gap-4">
                    {/* Ảnh món */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform"
                    />

                    {/* Chi tiết món & quán */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-[15px] text-gray-900 group-hover:text-[#E84A27] transition-colors leading-snug truncate">
                        {dish.name}
                      </h3>
                      <p className="text-[12px] font-bold text-gray-700 mt-0.5">{dish.restaurant}</p>
                      
                      <div className="flex items-center gap-2 text-[12px] mt-2">
                        <span className="font-black text-[#E84A27]">{dish.price}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-amber-500 font-bold">★ {dish.rating}</span>
                        <span className="text-gray-400 text-[11px]">({dish.reviews})</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-2">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px] text-[#E84A27]">distance</span>
                          {dish.distanceKm} km
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px] text-blue-600">two_wheeler</span>
                          {dish.bikeMin} phút
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lý do AI gợi ý */}
                  <div className="mx-4 mb-3 p-2.5 bg-orange-50/60 border border-orange-100 rounded-xl text-[11px] text-gray-700 leading-relaxed">
                    <strong className="text-[#E84A27] font-bold">💡 Lý do AI chọn: </strong>
                    {dish.aiReason}
                  </div>
                </div>

                {/* Nút chỉ đường */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate('/', { state: { selectedPlaceId: dish.placeId } })}
                    className="w-full flex items-center justify-center gap-2 h-9 rounded-full bg-[#E84A27] text-white text-[12px] font-bold hover:bg-[#c93d1f] shadow-md shadow-[#E84A27]/20 transition-all hover:scale-[1.01]"
                  >
                    <span className="material-symbols-outlined text-[16px]">near_me</span>
                    Chỉ đường tới quán ngay ({dish.distanceKm} km)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tính Năng Thú Vị: Bốc Quẻ Ẩm Thực (Lucky Decision) */}
        <div className="bg-gradient-to-br from-orange-500/10 via-amber-400/10 to-white border border-orange-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-orange-100 text-[#E84A27] text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 uppercase">
              🎲 Không cần nghĩ ngợi
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Bốc Quẻ Vị Giác: Ăn Gì Để Vũ Trụ Lo!
            </h2>
            <p className="text-[12px] text-gray-600 mt-1 max-w-lg leading-relaxed">
              Bạn mất hơn 15 phút mà vẫn chưa chốt được ăn gì? Nhấn bốc quẻ ngay để AI chọn ngẫu nhiên một món ngon có điểm đánh giá từ 4.5 sao trở lên trong khu vực của bạn.
            </p>

            <button
              onClick={handleLuckySpin}
              disabled={isSpinning}
              className="mt-4 flex items-center gap-2 bg-[#E84A27] text-white font-black text-[13px] px-6 py-2.5 rounded-full shadow-lg shadow-[#E84A27]/25 hover:bg-[#c93d1f] transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSpinning ? "casino" : "casino"}
              </span>
              {isSpinning ? "Đang quay số..." : "BỐC QUẺ NGẪU NHIÊN"}
            </button>
          </div>

          {/* Quẻ hiển thị kết quả */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 shadow-md w-full md:w-80 shrink-0">
            <div className="text-[10px] font-black text-[#E84A27] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Quẻ trúng hôm nay</span>
              <span className="text-gray-400 font-normal">Cách bạn {luckyDish.distanceKm} km</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={luckyDish.image}
                alt={luckyDish.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="font-black text-[14px] text-gray-900 truncate">{luckyDish.name}</div>
                <div className="text-[11px] text-gray-600 truncate">{luckyDish.restaurant}</div>
                <div className="text-[11px] font-bold text-[#E84A27] mt-1">{luckyDish.price}</div>
              </div>
            </div>

            <button
              onClick={() => navigate('/', { state: { selectedPlaceId: luckyDish.placeId } })}
              className="w-full flex items-center justify-center gap-1.5 h-8 rounded-full bg-gray-900 text-white text-[11px] font-bold hover:bg-[#E84A27] transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">directions</span>
              Đi ăn quán này ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
