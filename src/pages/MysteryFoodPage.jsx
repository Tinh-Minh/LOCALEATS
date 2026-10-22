import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

// Thử thách ẩm thực thú vị
const FOOD_CHALLENGES = [
  {
    id: "ch-1",
    title: "Càn Quét Phở Sài Gòn",
    desc: "Khám phá 3 quán phở lâu đời nhất quận 1 và quận 3",
    icon: "ramen_dining",
    color: "from-orange-500 to-amber-500",
    progress: 2,
    total: 3,
    reward: "Huy hiệu Vua Phở & Voucher 20%",
    places: [1, 4, 11],
  },
  {
    id: "ch-2",
    title: "Bậc Thầy Ăn Đêm",
    desc: "Thưởng thức ốc và lẩu mở sau 23:00 đêm tại các con hẻm nổi tiếng",
    icon: "nightlife",
    color: "from-purple-600 to-indigo-600",
    progress: 1,
    total: 4,
    reward: "Huy hiệu Cú Đêm & Tặng 1 phần tráng miệng",
    places: [3, 9, 13, 14],
  },
  {
    id: "ch-3",
    title: "Vòng Quanh Bánh Mì",
    desc: "Thử 3 tiệm bánh mì trứ danh: Huỳnh Hoa, Bánh Mì Chảo, Bánh Mì Heo Quay",
    icon: "bakery_dining",
    color: "from-red-500 to-pink-500",
    progress: 3,
    total: 3,
    completed: true,
    reward: "Đã mở khóa: Danh hiệu Thổ Địa Bánh Mì 👑",
    places: [2, 7, 8],
  },
];

export default function MysteryFoodPage() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [filterMood, setFilterMood] = useState("all");

  // Bốc ngẫu nhiên quán ăn
  const handleSpinWheel = () => {
    setIsSpinning(true);
    setSelectedResult(null);

    let candidates = places;
    if (filterMood === "cheap") candidates = places.filter((p) => p.price.includes("35.") || p.price.includes("40.") || p.price.includes("55."));
    if (filterMood === "hot") candidates = places.filter((p) => p.hot);
    if (filterMood === "late") candidates = places.filter((p) => p.closeAt === "23:00" || p.closeAt === "24/24" || p.closeAt >= "22:30");

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * candidates.length);
      setSelectedResult(candidates[randomIdx]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-20">
      {/* Banner đầu trang */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-[#E84A27] text-white px-4 sm:px-6 py-6 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-[14px]">casino</span>
              TÍNH NĂNG ĐỘC QUYỀN MỚI
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Hôm Nay Ăn Gì? & Thử Thách Foodie 🎲
            </h1>
            <p className="text-[12px] sm:text-[13px] text-white/90 mt-1 max-w-xl leading-relaxed">
              Không biết ăn gì? Hãy để chiếc hộp bí ẩn chọn ngẫu nhiên quán ngon chuẩn vị hoặc tham gia các thử thách săn huy hiệu ẩm thực!
            </p>
          </div>

          <div className="flex gap-2">
            <span className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
              <span className="block text-xl font-black">15+</span>
              <span className="text-[10px] text-white/80">Quán tuyển chọn</span>
            </span>
            <span className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
              <span className="block text-xl font-black">3</span>
              <span className="text-[10px] text-white/80">Thử thách</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-8">
        {/* Phần 1: Chiếc hộp bí ẩn "Hôm nay ăn gì?" */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E84A27] to-amber-400 text-white flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30 mb-3">
              🎰
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Vòng Quay Bí Ẩn: Trị Bệnh &quot;Ăn Gì Cũng Được&quot;
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
              Bấm nút để quay ngẫu nhiên 1 quán ăn ngon quanh bạn, có chỉ đường và thực đơn kèm theo!
            </p>

            {/* Filter nhanh */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 my-4">
              {[
                { id: "all", label: "Tất cả món" },
                { id: "hot", label: "🔥 Đang Hot trend" },
                { id: "cheap", label: "💰 Bình dân tiết kiệm" },
                { id: "late", label: "🌙 Quán mở đêm" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterMood(f.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                    filterMood === f.id
                      ? "bg-[#E84A27] text-white shadow-md shadow-orange-500/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Khung kết quả quay */}
            <div className="w-full max-w-md min-h-[140px] bg-gradient-to-br from-orange-50/70 to-amber-50/40 border-2 border-dashed border-orange-200 rounded-2xl p-4 flex flex-col items-center justify-center transition-all mb-4">
              {isSpinning ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <span className="material-symbols-outlined text-3xl text-[#E84A27] animate-spin">
                    autorenew
                  </span>
                  <span className="text-xs font-bold text-gray-700 animate-pulse">
                    Đang tìm quán ăn định mệnh cho bạn...
                  </span>
                </div>
              ) : selectedResult ? (
                <div className="w-full flex items-center gap-3.5 animate-scaleIn text-left">
                  <img
                    src={selectedResult.image}
                    alt={selectedResult.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-md border border-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black bg-[#E84A27] text-white px-2 py-0.2 rounded-full uppercase">
                        {selectedResult.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500">
                        ⭐ {selectedResult.rating}
                      </span>
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-gray-900 truncate mt-0.5">
                      {selectedResult.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate">{selectedResult.address}</p>
                    <p className="text-[11px] text-[#E84A27] font-bold truncate mt-0.5">
                      {selectedResult.specialty}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm font-bold text-gray-700">Chưa quay quán nào</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Bấm nút bên dưới để bắt đầu quay ngay!</p>
                </div>
              )}
            </div>

            {/* Các nút bấm hành động */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full max-w-md">
              <button
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className="flex-1 min-w-[150px] h-11 bg-gradient-to-r from-[#E84A27] to-[#FF6B35] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">casino</span>
                {isSpinning ? "Đang chọn..." : selectedResult ? "Quay quán khác" : "Quay ngẫu nhiên"}
              </button>

              {selectedResult && (
                <button
                  onClick={() => navigate("/", { state: { selectedPlaceId: selectedResult.id, autoFly: true } })}
                  className="h-11 px-4 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">near_me</span>
                  Xem trên bản đồ
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Phần 2: Thử thách ẩm thực Foodie Quests */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E84A27]">military_tech</span>
                Thử Thách Ăn Uống & Săn Huy Hiệu
              </h2>
              <p className="text-xs text-gray-500">Hoàn thành các trạm dừng để nhận voucher và đặc quyền VIP</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FOOD_CHALLENGES.map((ch) => (
              <div
                key={ch.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${ch.color} text-white flex items-center justify-center shadow-md`}>
                      <span className="material-symbols-outlined text-[20px]">{ch.icon}</span>
                    </span>
                    {ch.completed ? (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span> Đã đạt
                      </span>
                    ) : (
                      <span className="text-[11px] font-extrabold text-gray-500">
                        {ch.progress}/{ch.total} trạm
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{ch.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r ${ch.color}`}
                      style={{ width: `${(ch.progress / ch.total) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5 font-semibold">
                    <span className="material-symbols-outlined text-[13px] text-amber-600 shrink-0">card_giftcard</span>
                    <span className="truncate">{ch.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
