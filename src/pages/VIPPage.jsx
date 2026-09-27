import { useState } from "react";
import { vipRestaurants } from "../data/places";

const filterTabs = ["Tất cả ưu đãi", "Giảm 30% – 50%", "Tặng món độc quyền", "Ưu đãi dùng tại quán", "Quán có C…"];

export default function VIPPage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [copiedVoucher, setCopiedVoucher] = useState(null);

  const copyVoucher = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedVoucher(code);
    setTimeout(() => setCopiedVoucher(null), 2000);
  };

  const spotlightRestaurants = vipRestaurants.slice(0, 2);
  const listRestaurants = vipRestaurants.slice(2);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter">
      {/* Warning banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2 flex items-center gap-3">
        <span className="material-symbols-outlined text-[16px] text-yellow-600">warning</span>
        <p className="text-[12px] text-gray-700 flex-1">
          <strong>LƯU Ý:</strong> LOCALEATS là nền tảng bản đồ khám phá & chỉ đường trực tiếp tới quán ăn. Chúng tôi không nhận đặt món, không trung gian thanh toán và không nhận giao hàng. Mọi voucher ưu đãi được xuất trình và áp dụng trực tiếp tại quầy thu ngân của quán.
        </p>
        <button className="text-[12px] text-[#E84A27] font-bold whitespace-nowrap hover:underline">
          Áp dụng tại quán →
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* VIP Pass header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
            VIP GASTRONOMY PASS
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Bảo chứng đặc quyền bởi TasteMaker
          </div>
        </div>

        <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight mb-1 animate-fadeIn">
          Đặc Quyền Hội Viên &{" "}
          <span className="gradient-text-premium">Quán Tài Trợ Nổi Bật</span>
        </h1>
        <p className="text-[13px] text-gray-600 mb-4 max-w-2xl">
          Khám phá các nhà hàng cao cấp, quán ăn được yêu thích nhất tuần kèm voucher giảm giá tới 50% dành riêng cho thành viên LOCALEATS VIP. Tận hưởng hướng vị đỉnh cao cùng dịch vụ ưu đãi để bạn giữ chỗ ưu tiên.
        </p>

        {/* Search & filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 gap-2 h-10 shadow-sm">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
            <input className="bg-transparent flex-1 text-[13px] outline-none placeholder-gray-400" placeholder="Tìm quán tài trợ theo tên, quận huyện, hoặc loại món ăn..." />
            <span className="material-symbols-outlined text-gray-400 text-[18px] cursor-pointer">tune</span>
          </div>
          <button className="flex items-center gap-1.5 h-10 px-4 rounded-full border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Lọc theo ngân sách / Món ăn
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-bold whitespace-nowrap transition-all shadow-sm ${
                activeFilter === i
                  ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {i === 0 && "🎁"} {i === 1 && "%"} {i === 2 && "🍽️"} {i === 3 && "🏪"} {i === 4 && "🅿️"} {tab}
            </button>
          ))}
        </div>

        {/* Daily VIP Vouchers */}
        <div className="glass-card rounded-2xl shadow-sm border border-gray-100 p-5 mb-6 hover-lift animate-slideInUp">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">🎟️</span>
              <h3 className="font-bold text-[15px] text-gray-900">Ví Voucher VIP Trong Ngày</h3>
              <p className="text-[12px] text-gray-500">Nhập mã để sao chép & tự động áp dụng tại quầy thanh toán khi gọi món / thanh toán.</p>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[14px] text-[#E84A27]">timer</span>
              <span className="text-[#E84A27] text-[11px] font-bold">Hết hạn sau: 06h 42m</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { code: "LOCALEATS50K", title: "ƯU ĐÃI VIP TIỀN MẶT", desc: "Giảm 50.000đ cho đơn từ 200.000đ tại quán", type: "money" },
              { code: "CHECKIN30K", title: "ƯU ĐÃI DÙNG TẠI QUÁN CHECKIN30K", desc: "Giảm 30.000đ trực tiếp trên hoá đơn từ 150.000đ", type: "checkin" },
              { code: "COMBOBEER", title: "TẶNG COMBO ĐỒ UỐNG COMBOBEER", desc: "Tặng 2 lon Craft Beer khi dùng bữa tại bàn", type: "gift" },
            ].map((v) => (
              <div
                key={v.code}
                className={`border-2 border-dashed rounded-xl p-4 ${
                  v.type === "money"
                    ? "border-[#E84A27] bg-red-50"
                    : v.type === "checkin"
                    ? "border-blue-300 bg-blue-50"
                    : "border-yellow-400 bg-yellow-50"
                }`}
              >
                <p className="text-[10px] font-extrabold text-gray-600 uppercase mb-1">{v.title}</p>
                <p className="text-[11px] text-gray-700 mb-3">{v.desc}</p>
                <button
                  onClick={() => copyVoucher(v.code)}
                  className={`w-full flex items-center justify-center gap-1.5 h-8 rounded-full text-[11px] font-bold transition-all ${
                    copiedVoucher === v.code
                      ? "bg-green-500 text-white"
                      : v.type === "money"
                      ? "bg-[#E84A27] text-white hover:bg-[#c93d1f]"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {copiedVoucher === v.code ? (
                    <><span className="material-symbols-outlined text-[14px]">check</span> Đã lưu mã!</>
                  ) : (
                    <><span className="material-symbols-outlined text-[14px]">content_copy</span> Lưu mã</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight partners */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[15px] text-gray-900">⭐ Spotlight Đối Tác Vàng Tuần Này</h3>
            <button className="text-[12px] text-[#E84A27] font-semibold flex items-center gap-1 hover:underline">
              Xem tất cả 18 đối tác vàng →
            </button>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">Các thương hiệu uy tín được bình chọn cao nhất bởi cộng đồng sành ăn Sài Gòn</p>

          <div className="grid grid-cols-2 gap-4">
            {spotlightRestaurants.map((r, i) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group hover-lift card-shine">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-3 left-3 text-white text-[10px] font-extrabold px-2 py-1 rounded-full ${i === 0 ? "bg-yellow-500" : "bg-purple-500"}`}>
                    {r.partnerTier}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    {r.status}
                  </div>
                  <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-[16px] text-[#E84A27]">favorite</span>
                  </button>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-[14px] text-gray-900 mb-0.5">{r.name}</h4>
                  <p className="text-[11px] text-gray-500 mb-1">{r.category}</p>
                  <div className="flex items-center gap-2 text-[12px] mb-3">
                    <span className="text-yellow-400">⭐ {r.rating}</span>
                    <span className="text-gray-400">({r.reviews?.toLocaleString()} đánh giá)</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">📍 {r.address} (cách {r.distanceKm}km)</span>
                  </div>

                  {/* Offer */}
                  <div className="bg-orange-50 rounded-xl p-3 mb-3">
                    <p className="text-[11px] font-bold text-[#E84A27] mb-1">🎁 ĐẶC QUYỀN XUẤT TRÌNH TẠI QUÁN HÔM NAY</p>
                    <p className="text-[11px] text-gray-700">{r.offer}</p>
                    {r.voucher && (
                      <p className="text-[11px] text-gray-500 mt-1 italic">{r.voucher}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-full bg-[#E84A27] text-white text-[11px] font-bold shadow-md hover:bg-[#c93d1f] transition-all hover:scale-[1.02] btn-press glow-primary-hover">
                      <span className="material-symbols-outlined text-[14px]">loyalty</span>
                      Lấy mã ưu đãi ngay
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 h-9 rounded-full border border-gray-200 text-gray-700 text-[11px] font-semibold hover:bg-gray-50 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">directions</span>
                      Xem bản đồ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP restaurant list */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[15px] text-gray-900">📋 Danh Sách Quán Tài Trợ Khuyến Mãi Bùng Nổ</h3>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500">Sắp xếp:</span>
              <select className="text-[12px] font-semibold text-gray-700 border border-gray-200 rounded-full px-3 py-1 outline-none bg-white">
                <option>Ưu đãi nhiều nhất</option>
                <option>Gần nhất</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
          <p className="text-[12px] text-gray-500 mb-4">Lựa chọn hàng đầu cho trẻ gia đình, gặp gỡ đối tác và tụ hợp bạn bè.</p>

          <div className="grid grid-cols-3 gap-4">
            {listRestaurants.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group hover-lift card-shine">
                <div className="relative h-36 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Discount badge */}
                  <div className="absolute top-2 left-2 bg-[#E84A27] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {r.offer.startsWith("Giảm") ? r.offer.split(" ").slice(0, 2).join(" ") : r.offer.split(" ").slice(0, 2).join(" ")}
                  </div>
                  <div className="absolute top-2 right-2 bg-orange-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    SPONSORED VIP
                  </div>
                  <button className="absolute bottom-2 right-2 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-[14px] text-gray-500">bookmark</span>
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-[10px] text-gray-500 font-medium mb-0.5">{r.category}</p>
                  <h4 className="font-bold text-[12px] text-gray-900 mb-0.5 line-clamp-1">{r.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] mb-1">
                    <span className="text-yellow-400">⭐ {r.rating}</span>
                    <span className="text-gray-400">({(r.reviews / 1000).toFixed(1)}k)</span>
                  </div>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mb-2">
                    <span className="material-symbols-outlined text-[12px]">place</span>
                    {r.address} ({r.distanceKm}km)
                  </p>

                  {/* Voucher */}
                  {r.voucher && (
                    <div className="flex items-center gap-2 mb-2">
                      <code className="flex-1 bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-lg">{r.voucher}</code>
                      <button
                        onClick={() => copyVoucher(r.voucher)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${
                          copiedVoucher === r.voucher
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-[#E84A27] hover:text-white"
                        }`}
                      >
                        {copiedVoucher === r.voucher ? "✓" : "Copy"}
                      </button>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-500 mb-2">{r.voucherDesc}</p>

                  <div className="flex gap-1.5">
                    <button className="flex-1 flex items-center justify-center gap-1 h-8 rounded-full bg-[#E84A27] text-white text-[10px] font-bold hover:bg-[#c93d1f] transition-all hover:scale-[1.02] shadow-sm">
                      <span className="material-symbols-outlined text-[13px]">loyalty</span>
                      Lưu ưu đãi
                    </button>
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <span className="material-symbols-outlined text-[14px] text-gray-600">directions</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Commitment section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover-lift animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[18px] text-green-500">verified</span>
            <h3 className="font-bold text-[14px] text-gray-800">QUY CHUẨN KIỂM ĐỊNH NGHIÊM NGẶT</h3>
          </div>
          <h4 className="font-extrabold text-[20px] text-gray-900 mb-4">Cam Kết Dịch Vụ Đối Tác VIP</h4>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: "verified_user", title: "Vệ sinh an toàn tuyệt đối", desc: "Chứng nhận an toàn thực phẩm kiểm định, nguyên liệu tươi sạch bảo nguồn gốc chuẩn quốc tế." },
              { icon: "loyalty", title: "Giữ bàn ưu tiên VIP", desc: "Luôn dành sẵn vị trí đẹp nhất, ưu tiên bàn khách VIP và không cần xếp hàng chờ đợi vào giờ cao điểm." },
              { icon: "restaurant_menu", title: "Món ăn đúng hình 100%", desc: "Định lượng, nguyên liệu và cách bày trí chính xác theo đúng thỏa thuận bổ trợ bổ sung tài trợ tại LOCALEATS." },
              { icon: "undo", title: "Hoàn tiền nếu không hài lòng", desc: "Hỗ trợ xử lý khiếu nại trong 15 phút, hoàn ngay tiền nếu không trải nghiệm đúng ưu đãi xuất trình." },
            ].map((c) => (
              <div key={c.title} className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-[22px] text-[#E84A27]">{c.icon}</span>
                </div>
                <h5 className="font-bold text-[13px] text-gray-900 mb-1.5">{c.title}</h5>
                <p className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
