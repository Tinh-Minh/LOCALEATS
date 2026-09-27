import { useState } from "react";
import { aiDishes } from "../data/places";

const tasteOptions = {
  mood: ["Tâm trạng & Con thèm", "Thêm nước lóng ẩm stress", "Cắn ngập đôi xỉ vào", "Thành đạm rau củ giải ngay", "Ăn vặt dinh dưỡng phổ tầm chuyện"],
  budget: ["Ngân sách thực tế", "Trưa hè viên: 35.000đ", "Phở thôm: 35k – 70k", "Tuyển tỉ: 70k – 150k", "Thả ga: >150.000đ"],
  time: ["Thời tiết & Thời điểm", "Trưa hè nắng gắt (Chạo mây)", "Chiều mưa se lạnh (Cần món nóng)", "Cà chiếm sau 22:00", "Hợp mặt giao đãi / Nhóm"],
  distance: ["Khoảng cách & Bán kính", "1. Đổ bộ < 1km (3–5 phút)", "2. Xe máy 10–15 phút (< 4km)", "3. Ổn tô / xe hơi (< 10 phút)", "4. Bất chấp khoảng cách (Quán Top)"],
};

const quickTags = ["Cay kéo sợi tươi", "Ăn một mình", "Cần béo xào nhẹ", "Nước lèo hầm đậm đà", "Thanh đạm giải ngày", "Đậm đà cảm xúc", "Trắng mềm ngọt"];

export default function AIPage() {
  const [prompt, setPrompt] = useState(`Trời mưa lạnh thèm tô phở bò sốt vang nóng hổi dưới 60!`);
  const [selectedTags, setSelectedTags] = useState(["Cần béo xào nhẹ", "Thanh đạm giải ngày"]);
  const [selectedMood, setSelectedMood] = useState("Cắn ngập đôi xỉ vào");
  const [aiStep, setAiStep] = useState(2.4);
  const [showResult, setShowResult] = useState(true);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter">
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* AI badge */}
        <div className="flex items-center gap-2 mb-3 animate-fadeIn">
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full animate-pulse">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI SMART SOMMELIER
          </div>
          <span className="text-gray-400 text-[11px]">•</span>
          <span className="text-orange-500 text-[11px] font-medium">Cô Vân Ẩm Thực Cà Nhân Hoa</span>
          <div className="ml-auto bg-orange-50 border border-orange-200 text-[#E84A27] text-[11px] font-bold px-2 py-0.5 rounded-full">
            AI {aiStep}
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight mb-1 animate-slideInUp">
          Hôm nay bạn muốn ăn gì?
        </h1>
        <h2 className="text-[28px] font-extrabold leading-tight mb-3 gradient-text-premium">
          Để AI LOCALEATS thấu hiểu khẩu vị của bạn!
        </h2>
        <p className="text-[13px] text-gray-600 mb-5 max-w-2xl">
          Khám phá bản đồ quán ngon thực tế theo từng cảm xúc, thời tiết thực tại và ngân sách trong tủi. Tự động đề xuất chỉ đường ngắn nhất và kênh Facebook chính thức của quán.
        </p>

        {/* AI prompt input */}
        <div className="glass-card border-2 border-orange-200 rounded-2xl p-4 mb-4 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#E84A27]">place</span>
            </div>
            <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-[13px] text-gray-800 font-medium border border-gray-200">
              {prompt}
            </div>
            <button className="text-[12px] text-gray-500 flex items-center gap-1 hover:text-[#E84A27] transition-colors whitespace-nowrap">
              Tâm trạng
            </button>
            <button
              onClick={() => setShowResult(true)}
              className="flex items-center gap-1.5 bg-[#E84A27] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-md shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-105 whitespace-nowrap btn-press glow-primary-hover"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Gợi Ý Tức Thì
            </button>
          </div>

          {/* Quick tag suggestions */}
          <div>
            <p className="text-[11px] text-gray-500 mb-2 font-medium">THỨ NAY:</p>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-[#E84A27] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#E84A27]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Taste Matrix */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 hover-lift animate-slideInUp" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[15px] text-gray-900">📊 Ma Trận Khẩu Vị & Cảm Xúc (Taste Matrix)</h3>
            <span className="text-[11px] text-gray-500">Đang quét 482 quán mở cửa tại Hà Nội / TP.HCM</span>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">Tinh chỉnh nhỏ các tiêu chí để AI lọc chuẩn sức 100% quán mở cửa của quán bạn</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(tasteOptions).map(([key, opts]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-[14px] text-[#E84A27]">
                    {key === "mood" ? "sentiment_satisfied" : key === "budget" ? "payments" : key === "time" ? "schedule" : "near_me"}
                  </span>
                  <span className="text-[11px] font-bold text-gray-700">{opts[0]}</span>
                </div>
                {opts.slice(1).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 py-1 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedMood === opt ? "border-[#E84A27] bg-[#E84A27]" : "border-gray-300 group-hover:border-[#E84A27]"
                      }`}
                      onClick={() => setSelectedMood(opt)}
                    >
                      {selectedMood === opt && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-[11px] text-gray-600">{opt}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* AI Results */}
        {showResult && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-[16px] text-gray-900 flex items-center gap-2">
                ✨ AI CHỌN TỰ ĐỘNG THEO THỜI ĐIỂM
              </h3>
              <span className="text-[13px] text-gray-500">Top 4 Món Chuẩn Vị Nhất Lúc Này</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500">U tiên: Gần nhất & Điểm hài lòng cao</span>
                <button className="text-[11px] text-[#E84A27] font-bold hover:underline">🔄 Làm mới đề xuất</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {aiDishes.map((dish) => (
                <div key={dish.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group hover-lift card-shine">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-b border-gray-100">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {dish.tag}
                    </span>
                    <button className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-orange-50">
                      <span className="material-symbols-outlined text-[14px] text-gray-500">bookmark</span>
                    </button>
                  </div>

                  <div className="flex gap-0">
                    {/* Image */}
                    <div className="relative w-36 h-36 shrink-0 overflow-hidden">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {dish.matchPct}% {dish.matchLabel}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-3">
                      <h4 className="font-bold text-[13px] text-gray-900 mb-0.5 line-clamp-2">{dish.name}</h4>
                      <p className="text-[11px] text-gray-500 mb-1.5">{dish.restaurant}</p>
                      <div className="flex items-center gap-2 text-[11px] mb-1">
                        <span className="text-yellow-500">⭐ {dish.rating}</span>
                        <span className="text-gray-400">({dish.reviews}+)</span>
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{dish.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="material-symbols-outlined text-[12px]">place</span>
                        {dish.distanceKm}km
                        <span className="material-symbols-outlined text-[12px]">two_wheeler</span>
                        {dish.bikeMin} phút xe máy
                      </div>
                    </div>
                  </div>

                  {/* AI reason */}
                  <div className="px-3 py-2 border-t border-gray-50">
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      <span className="text-[#E84A27] font-bold">⊙ Lý do AI chọn:</span> {dish.aiReason}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 px-3 pb-3 mt-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full bg-[#E84A27] text-white text-[11px] font-bold shadow-md hover:bg-[#c93d1f] transition-all hover:scale-[1.02] btn-press glow-primary-hover">
                      <span className="material-symbols-outlined text-[14px]">directions</span>
                      Chỉ đường ngay ({dish.distanceKm}km)
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 h-9 rounded-full border border-gray-200 text-gray-700 text-[11px] font-semibold hover:bg-gray-50 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">groups</span>
                      Facebook Quán
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Lucky spin */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-5 mb-8 hover-lift relative overflow-hidden animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">🎰</span>
                    <span className="bg-orange-100 text-[#E84A27] text-[10px] font-extrabold px-2 py-0.5 rounded-full">ĐỘC QUÀ ẨM THỰC TỨC THÌ</span>
                  </div>
                  <h3 className="text-[20px] font-extrabold text-gray-900">Vẫn chưa biết ăn gì?</h3>
                  <h4 className="text-[20px] font-extrabold text-[#E84A27]">Thử Vận May Giác!</h4>
                  <p className="text-[12px] text-gray-600 mt-2 max-w-sm">
                    Các cấu các ai có thể có đẩy chính xác nhất ý muốn "Hôm nay nên ăn gì được?". AI sẽ bé hoa ngẫu nhiên 1 món ăn được đánh giá làm truy hoa hơn 3 trong bán kính 3km quanh bạn.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div>
                      <span className="text-[22px] font-extrabold text-gray-900">5.200+</span>
                      <p className="text-[10px] text-gray-500">Lượt quay mỗi ngày</p>
                    </div>
                    <div>
                      <span className="text-[22px] font-extrabold text-gray-900">97.8%</span>
                      <p className="text-[10px] text-gray-500">Tỉ lệ thỏa sau khi thử</p>
                    </div>
                  </div>
                  <button className="mt-3 flex items-center gap-2 bg-[#E84A27] text-white px-5 py-2.5 rounded-full font-bold text-[13px] shadow-lg shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-105 animate-glow btn-press">
                    🎰 BỐC QUẺ MÓN ĂN NGAY!
                  </button>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-gray-500 font-medium">Kết Quả Bốc Quẻ Ngẫu Nhiên</span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Sắn sàng bắm quay</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 w-56">
                    <img
                      src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&q=80"
                      alt="lucky"
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <span className="text-[10px] text-[#E84A27] font-extrabold">Quẻ hôm nay số #59</span>
                      <p className="font-bold text-[12px] text-gray-900">Bánh Mì Chảo Bò Sốt Tiêu</p>
                      <p className="text-[10px] text-gray-500">Tiêm Bánh Mì Chiều Lương Đinh Cua Cách 1.2km</p>
                      <p className="text-[10px] text-gray-400 italic mt-1">"Hợp mệnh bao nhộn nay, sốt tiêu cay mặn, pate béo bùi, giòn rum chặm đủi!"</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 justify-end">
                    <button className="flex items-center gap-1 px-3 h-8 rounded-full bg-[#E84A27] text-white text-[11px] font-bold hover:bg-[#c93d1f] transition-all">
                      <span className="material-symbols-outlined text-[14px]">directions</span>
                      Chỉ đường tới quán ngay
                    </button>
                    <button className="flex items-center gap-1 px-3 h-8 rounded-full border border-gray-200 text-gray-700 text-[11px] font-semibold hover:bg-gray-50 transition-colors">
                      Đổi món khác
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Trends Pulse */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[16px] text-[#E84A27]">trending_up</span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">AI FOOD TRENDS PULSE</span>
              </div>
              <h3 className="font-extrabold text-[20px] text-gray-900 mb-1">Xu Hướng Vị Giác Bùng Nổ Tuần Này</h3>
              <p className="text-[12px] text-gray-500 mb-4">Dựa trên 45.000+ lượt tìm lúc check-in ẩm thực tiến bản đồ của cộng đồng LOCALEATS 7 ngày qua.</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { cat: "Trâu lâu đường phở", name: "Ga Nướng Sốt Phở Mai Cay Hàn Quốc", trend: "+85% Tuần này", desc: "Trào đường sắc sắt sắt điểm tại 30-23.5 Gb. Y5 Vòng hới-phố ma sốt phổ cay chuẩn tiếng đồng đài tuần ngày của ổng từ đầu...", nearby: 28, icon: "🥩" },
                  { cat: "Healthy & Detox", name: "Sinh Tố Mắc Hoa Quả & Sữa Chua Lắc", trend: "+120% Tuần này", desc: "Gộp quả từ 11:00 đến 23:00 tại cả, ổng sầu quả đất gĩ nhẹ mà niêu đất lộc cây nước từ đây ăn bản ngon nhất...", nearby: 42, icon: "🥤" },
                  { cat: "Lẩu & Âm thực", name: "Lẩu Riêu Cua Băp Bò Sườn Sụn Hà Nội", trend: "+44% Tuần này", desc: "Chuẩn VN định hướng ẩm thực điển hình phong phú đang được ưa chuộng lần xuất hiện đầu tháng...", nearby: 19, icon: "🍲" },
                ].map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover-lift card-shine">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[20px]">{t.icon}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{t.cat}</span>
                    </div>
                    <div className="text-green-600 font-bold text-[12px] mb-1">{t.trend}</div>
                    <h4 className="font-bold text-[13px] text-gray-900 mb-1 leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">{t.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-600">🍽️ {t.nearby} quán bán quanh bạn</span>
                    </div>
                    <button className="mt-2 w-full h-8 rounded-full border border-[#E84A27] text-[#E84A27] text-[11px] font-bold hover:bg-[#E84A27] hover:text-white transition-all flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">directions</span>
                      Tìm đồ gần nhất
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
