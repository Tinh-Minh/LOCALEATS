import { useState } from "react";

export default function MerchantReviewsTab({ currentPlace }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [translatedReviews, setTranslatedReviews] = useState({});
  const [repliedStatus, setRepliedStatus] = useState({});

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleTranslation = (id) => {
    setTranslatedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSendReply = (reviewerName, id) => {
    setRepliedStatus((prev) => ({ ...prev, [id]: true }));
    showToast(`Đã gửi phản hồi chính thức tới thực khách ${reviewerName}!`);
  };

  const reviews = [
    {
      id: 1,
      name: "Hoàng Nam",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      badge: "Food Blogger • Top 1% Hà Nội",
      badgeClass: "bg-[#FFDCC2] text-[#8F4E00]",
      time: "Dùng bữa: 20:15 hôm qua",
      gpsSeat: "GPS Bàn VIP 02",
      rating: 5.0,
      content:
        "“Quán lẩu chân ái mới ở phố Hoàn Kiếm! Nồi lẩu thảo mộc nghi ngút khói đậm đà thanh mát đúng vị xưa, thịt bò ta tươi dầy nhúng tới đâu mềm ngọt tới đó chứ không hề bị khô hay mỏng dính như nhiều nơi khác. Nước chấm nấm truffle thơm lừng chấm cùng nấm mối đen cực cuốn. Nhất định sẽ dẫn gia đình quay lại tuần tới!”",
      photos: [
        "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=400&q=80",
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
      ],
      aiDraft:
        "“Dạ Bếp Trưởng Hà Nội cảm ơn anh Hoàng Nam đã ghé thẩm vị và dành lời khen quý báu cho nồi nước dùng thảo mộc gia truyền cùng thăn bò tươi sáng nay! Nhà hàng đã note ngay vào sổ tay để chuẩn bị sẵn góc bàn view cửa sổ yên tĩnh nhất đón gia đình anh vào tuần tới ạ. Kính chúc anh luôn dồi dào cảm hứng ẩm thực!”",
      categories: ["photos", "vip"],
    },
    {
      id: 2,
      name: "David Harrison",
      initials: "DH",
      badge: "Du khách từ Vương Quốc Anh • London",
      badgeClass: "bg-[#B1F0CE] text-[#002114]",
      time: "Dùng bữa: 2 ngày trước",
      gpsSeat: "GPS Bàn 08 (Tầng 2)",
      rating: 5.0,
      content:
        "“Best mushroom & beef herbal hotpot in Hanoi Old Quarter! The herbal broth is unbelievable, so pure and balanced. Staff helped us cook and demonstrated Vietnamese food culture with great English. Outstanding hospitality!”",
      translatedContent:
        "“Món lẩu thảo mộc bò & nấm ngon nhất ở Phố Cổ Hà Nội! Nước dùng thảo mộc thật sự khó tin, rất thanh khiết và cân bằng. Nhân viên hỗ trợ chúng tôi nhúng lẩu và giới thiệu văn hóa ẩm thực Việt Nam bằng tiếng Anh rất lưu loát. Lòng hiếu khách tuyệt vời!”",
      isEnglish: true,
      aiDraft:
        "“Dear David, thank you so much for your wonderful words! It was our true pleasure to introduce you to traditional Hanoi herbal hotpot and our hospitality culture. We wish you an unforgettable adventure exploring Vietnam! Warmest regards from Bếp Trưởng Hà Nội team.”",
      categories: ["tourist"],
    },
    {
      id: 3,
      name: "Nguyễn Thu Thủy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
      badge: "Gia đình 6 người • Đặt bàn trước",
      badgeClass: "bg-[#FEEADC] text-[#231A11]",
      time: "Dùng bữa: 3 ngày trước",
      gpsSeat: "GPS Phòng Hoa Sen",
      rating: 4.8,
      content:
        "“Cả nhà mình đi ăn mừng sinh nhật ông bà. Quán hỗ trợ trang trí hoa tươi và xếp phòng riêng rất chu đáo. Nước lẩu gà nấm ngọt đậm đà, không bị gắt bột ngọt. Điểm cộng lớn là bảo vệ dắt xe ô tô nhiệt tình vào bãi đỗ số 54.”",
      aiDraft:
        "“Dạ cảm ơn chị Thủy và gia đình đã tin tưởng chọn Bếp Trưởng cho ngày vui sinh nhật ông bà ạ! Kính chúc ông bà luôn dồi dào sức khỏe và mong sớm được đón tiếp đại gia đình mình lần tới!”",
      categories: ["vip"],
    },
  ];

  const filteredReviews =
    activeFilter === "all"
      ? reviews
      : activeFilter === "unreplied"
      ? reviews.filter((r) => !repliedStatus[r.id])
      : reviews.filter((r) => r.categories.includes(activeFilter));

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1]">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E8] text-[#DE3618] text-xs font-bold border border-[#F2DFD1]">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              100% Xác thực định vị GPS tại bàn
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
              Huy hiệu 'Chủ quán lắng nghe'
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#231A11] tracking-tight mt-1">
            Đánh giá &amp; Cảm nhận thực khách
          </h1>
          <p className="text-xs text-[#5C403A]">
            Lắng nghe ẩm thực thời gian thực, quản lý danh tiếng và tương tác tức thời với công nghệ AI.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => showToast("Báo cáo phân tích cảm xúc thực khách tuần qua đã sẵn sàng tải về", "info")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF8F5] text-[#231A11] text-xs font-bold shadow-sm border border-[#F2DFD1] transition-all"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Xuất báo cáo PDF
          </button>
          <button
            type="button"
            onClick={() => showToast("AI đã duyệt và soạn sẵn phản hồi lịch sự cho toàn bộ nhận xét mới!", "success")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            AI tự động gợi ý phản hồi
          </button>
        </div>
      </div>

      {/* Reputation Scoreboard Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
        {/* Primary Rating Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Chỉ số danh tiếng</span>
            <span className="material-symbols-outlined text-[#FD9013] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              hotel_class
            </span>
          </div>
          <div className="my-5 flex items-baseline gap-3">
            <span className="text-4xl lg:text-5xl font-black text-[#DE3618] tracking-tight">4.9</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-[#FD9013]">
                {[1, 2, 3, 4].map((s) => (
                  <span key={s} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star_half
                </span>
              </div>
              <span className="text-xs text-[#5C403A]">Trên thang chuẩn 5.0 sao</span>
            </div>
          </div>
          <div className="pt-3 bg-[#FFF8F5] rounded-2xl p-3 flex items-center justify-between border border-[#F2DFD1]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2C694E] text-xl">verified_user</span>
              <span className="text-xs font-bold text-[#231A11]">384 Lượt thực tế</span>
            </div>
            <span className="text-[11px] text-[#2C694E] bg-[#B1F0CE] px-2.5 py-0.5 rounded-full font-bold">
              +18 tuần này
            </span>
          </div>
        </div>

        {/* Positive Breakdown Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Tỷ lệ hài lòng thực khách</span>
            <span className="text-base font-bold text-[#2C694E]">98.4%</span>
          </div>
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#231A11] font-semibold w-10">5 sao</span>
              <div className="flex-1 h-2 rounded-full bg-[#F8E5D6] overflow-hidden">
                <div className="h-full bg-[#DE3618] rounded-full" style={{ width: "84%" }} />
              </div>
              <span className="text-xs text-[#5C403A] w-8 text-right font-medium">84%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#231A11] font-semibold w-10">4 sao</span>
              <div className="flex-1 h-2 rounded-full bg-[#F8E5D6] overflow-hidden">
                <div className="h-full bg-[#FD9013] rounded-full" style={{ width: "14%" }} />
              </div>
              <span className="text-xs text-[#5C403A] w-8 text-right font-medium">14%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#231A11] font-semibold w-10">3 sao</span>
              <div className="flex-1 h-2 rounded-full bg-[#F8E5D6] overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: "2%" }} />
              </div>
              <span className="text-xs text-[#5C403A] w-8 text-right font-medium">2%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#231A11] font-semibold w-10">1-2★</span>
              <div className="flex-1 h-2 rounded-full bg-[#F8E5D6] overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-xs text-[#5C403A] w-8 text-right font-medium">0%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5C403A]">
            <span className="material-symbols-outlined text-[#2C694E] text-base">sentiment_very_satisfied</span>
            <span>Không có đánh giá tiêu cực (1-2 sao) trong 90 ngày</span>
          </div>
        </div>

        {/* Merchant Responsiveness Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Tương tác quán</span>
            <span className="inline-flex items-center gap-1 text-[#2C694E] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2C694E]" />
              Siêu nhanh
            </span>
          </div>
          <div className="flex items-center gap-6 my-2">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#F8E5D6]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                <path className="text-[#2C694E]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="96, 100" strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <span className="absolute text-base font-extrabold text-[#231A11]">96%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-extrabold text-[#231A11]">~15 Phút</span>
              <span className="text-xs text-[#5C403A]">Thời gian phản hồi bình quân thực tế</span>
            </div>
          </div>
          <div className="bg-[#FFF8F5] p-3 rounded-2xl flex items-center justify-between border border-[#F2DFD1]">
            <span className="text-xs text-[#231A11]">Chỉ còn 4 phản hồi cần xử lý</span>
            <button
              type="button"
              onClick={() => setActiveFilter("unreplied")}
              className="text-xs text-[#DE3618] font-bold hover:underline"
            >
              Giải quyết ngay →
            </button>
          </div>
        </div>
      </div>

      {/* AI Sentiment & Taste Insights */}
      <div className="bg-[#FFF8F5] rounded-3xl p-6 lg:p-7 shadow-sm border border-[#F2DFD1] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DE3618] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl">neurology</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#231A11]">
                Trợ lý AI Phân tích Vị giác &amp; Cảm xúc thực khách
              </h2>
              <p className="text-xs text-[#5C403A]">
                Trích xuất từ 384 bài nhận xét bằng mô hình xử lý ngôn ngữ ẩm thực địa phương
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#231A11] text-xs font-semibold shadow-xs border border-[#F2DFD1]">
            <span className="material-symbols-outlined text-[#8F4E00] text-sm">schedule</span> Cập nhật 10 phút trước
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Praise Attributes */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="text-xs text-[#5C403A] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#2C694E] text-base">thumb_up</span>
              Top hương vị &amp; dịch vụ được khen ngợi nhiều nhất
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Nước lẩu thảo mộc", desc: "Vị ngọt thanh tự nhiên, thơm sâm", count: "142 lượt" },
                { name: "Thịt bò tươi dầy", desc: "Thái đúng thớ, ngọt mềm không dai", count: "98 lượt" },
                { name: "Không gian phố cổ", desc: "Ấm cúng, đèn vàng dịu mắt", count: "85 lượt" },
                { name: "Nhân viên & Bảo vệ", desc: "Dắt xe chu đáo, mời nước niềm nở", count: "76 lượt" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl flex items-start justify-between shadow-xs border border-[#F2DFD1]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#231A11]">{item.name}</span>
                    <span className="text-[11px] text-[#5C403A]">{item.desc}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFF1E8] text-[#DE3618] text-[11px] font-bold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning / Improvement Notice */}
          <div className="lg:col-span-5 bg-white p-4.5 rounded-2xl shadow-xs border border-[#F2DFD1] flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8F4E00]">
                <span className="material-symbols-outlined text-xl">crisis_alert</span>
                <span className="text-xs font-bold">Khuyến nghị vận hành từ AI</span>
              </div>
              <p className="text-xs text-[#231A11] leading-relaxed">
                Khung giờ <strong className="text-[#DE3618]">19:30 thứ Bảy</strong> khách phản ánh chờ xếp bàn hơi lâu (~10-15 phút).
              </p>
              <div className="bg-[#FFF8F5] p-3 rounded-xl flex items-start gap-2 border border-[#F2DFD1]">
                <span className="material-symbols-outlined text-[#8F4E00] text-base mt-0.5">tips_and_updates</span>
                <p className="text-[11px] text-[#5C403A]">
                  <strong>Hành động gợi ý:</strong> Kích hoạt thông báo <strong>"Đặt bàn trước để giữ chỗ"</strong> trên app và tặng 1 phần trà quất thanh nhiệt cho khách đặt trước.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast("Đã bật tính năng khuyến khích đặt bàn tự động vào giờ cao điểm", "success")}
              className="mt-3 w-full py-2 rounded-xl bg-[#FFF1E8] hover:bg-[#DE3618] hover:text-white text-[#231A11] text-xs font-bold border border-[#F2DFD1] transition-all text-center"
            >
              Áp dụng khuyến nghị ngay
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Tất cả (384)" },
            { id: "photos", label: "Có ảnh món ăn (156)", icon: "photo_camera" },
            { id: "tourist", label: "Khách quốc tế (64)", icon: "flight" },
            { id: "vip", label: "Khách quen VIP (88)", icon: "military_tech" },
            { id: "unreplied", label: "Chưa phản hồi (4)", icon: "mark_email_unread" },
          ].map((btn) => {
            const active = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  active
                    ? "bg-[#DE3618] text-white shadow-md shadow-[#DE3618]/25"
                    : "bg-white text-[#5C403A] hover:bg-[#FFF8F5] border border-[#F2DFD1]"
                }`}
              >
                {btn.icon && <span className="material-symbols-outlined text-base">{btn.icon}</span>}
                {btn.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5C403A]">Sắp xếp:</span>
          <select className="bg-white text-[#231A11] text-xs font-semibold rounded-xl px-3 py-1.5 outline-none border border-[#F2DFD1] shadow-xs cursor-pointer">
            <option>Mới nhất trước</option>
            <option>Đánh giá cao nhất</option>
            <option>Cần phản hồi gấp</option>
          </select>
        </div>
      </div>

      {/* Review Feed Cards */}
      <div className="flex flex-col gap-6">
        {filteredReviews.map((r) => (
          <article
            key={r.id}
            className="bg-white rounded-3xl p-6 lg:p-7 shadow-sm border border-[#F2DFD1] flex flex-col gap-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {r.avatar ? (
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-[#F2DFD1]" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#FFDCC2] text-[#8F4E00] flex items-center justify-center font-bold text-base">
                    {r.initials}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#231A11]">{r.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.badgeClass}`}>
                      {r.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5C403A]">
                    <span>{r.time}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-[#2C694E] font-medium">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                        pin_drop
                      </span>
                      {r.gpsSeat}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F2DFD1]">
                  <div className="flex text-[#FD9013]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[#231A11] font-bold ml-1">{r.rating.toFixed(1)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast(`Đã ghim nhận xét của ${r.name} lên đầu gian hàng!`, "info")}
                  className="p-2 rounded-full bg-[#FFF8F5] hover:bg-[#FEEADC] text-[#5C403A] border border-[#F2DFD1] transition-colors"
                  title="Ghim lên đầu trang"
                >
                  <span className="material-symbols-outlined text-base">push_pin</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#231A11] leading-relaxed">{r.content}</p>

            {/* Bilingual Translation Toggle */}
            {r.isEnglish && (
              <div className="flex flex-col gap-2">
                {translatedReviews[r.id] && (
                  <div className="p-3.5 bg-[#FFF8F5] rounded-2xl text-xs text-[#5C403A] leading-relaxed border border-[#F2DFD1] animate-fadeIn">
                    <strong className="text-[#231A11] block mb-1">Bản dịch tự động:</strong>
                    {r.translatedContent}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => toggleTranslation(r.id)}
                  className="self-start inline-flex items-center gap-1 text-xs text-[#DE3618] font-bold hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">translate</span>
                  <span>{translatedReviews[r.id] ? "Ẩn bản dịch Tiếng Việt" : "Dịch tự động sang Tiếng Việt"}</span>
                </button>
              </div>
            )}

            {/* Photo attachments */}
            {r.photos && r.photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {r.photos.map((photo, pIdx) => (
                  <div key={pIdx} className="h-32 rounded-2xl overflow-hidden relative group cursor-pointer border border-[#F2DFD1]">
                    <img
                      src={photo}
                      alt="Ảnh thực khách chụp"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* AI Assistant Action Box */}
            <div className="bg-[#FFF8F5] rounded-2xl p-4.5 flex flex-col gap-3 border border-[#F2DFD1]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#DE3618] text-lg">magic_button</span>
                  <span className="text-xs font-bold text-[#231A11]">
                    {r.isEnglish
                      ? "Gợi ý phản hồi chuẩn Tiếng Anh bản xứ (AI Bilingual)"
                      : "Phản hồi gợi ý bởi AI (Dựa trên giọng điệu mộc mạc, hiếu khách)"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Đã làm mới câu trả lời khác từ AI!")}
                  className="text-xs text-[#DE3618] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">autorenew</span> Đổi câu khác
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl text-xs text-[#231A11] leading-relaxed border border-[#F2DFD1] shadow-xs">
                {r.aiDraft}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSendReply(r.name, r.id)}
                    className="px-5 py-2 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    {repliedStatus[r.id] ? "Đã gửi phản hồi" : "Duyệt & Gửi phản hồi"}
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Mở trình chỉnh sửa nội dung phản hồi", "info")}
                    className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-[#231A11] text-xs font-semibold border border-[#F2DFD1] transition-all"
                  >
                    Chỉnh sửa lời thoại
                  </button>
                </div>
                <span className="text-[11px] text-[#5C403A] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#2C694E]">check_circle</span>
                  Thực khách nhận thông báo qua SMS &amp; App
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

