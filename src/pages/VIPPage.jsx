import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vipRestaurants } from "../data/places";

const filterCategories = [
  { id: "all", label: "Tất cả đối tác", icon: "stars" },
  { id: "discount", label: "Giảm 20% - 50%", icon: "percent" },
  { id: "gift", label: "Tặng món / Đồ uống", icon: "redeem" },
  { id: "hotpot", label: "Lẩu & Nướng", icon: "local_fire_department" },
  { id: "vietnam", label: "Món Việt truyền thống", icon: "restaurant" },
];

export default function VIPPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedVoucher, setCopiedVoucher] = useState(null);

  const copyVoucher = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedVoucher(code);
    setTimeout(() => setCopiedVoucher(null), 2000);
  };

  const filteredRestaurants = vipRestaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "discount") return r.offer.includes("Giảm") || r.offer.includes("%");
    if (activeFilter === "gift") return r.offer.includes("Tặng") || r.offer.includes("Miễn phí");
    if (activeFilter === "hotpot") return r.category.includes("Lẩu") || r.category.includes("Nhậu");
    if (activeFilter === "vietnam") return r.category.includes("Phở") || r.category.includes("Cơm") || r.category.includes("Việt");
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-16">
      {/* Thông báo minh bạch bản chất ứng dụng */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-3">
        <span className="material-symbols-outlined text-amber-600 text-[18px]">verified_user</span>
        <p className="text-[12px] text-amber-900 leading-snug flex-1">
          <strong className="font-bold">ĐẶC QUYỀN TRỰC TIẾP TẠI BÀN:</strong> LOCALEATS là nền tảng bản đồ & dẫn đường ẩm thực. Mã ưu đãi được lưu vào máy và <strong>xuất trình trực tiếp cho nhân viên thu ngân</strong> khi bạn dùng bữa tại quán, hoàn toàn không qua trung gian.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                VIP GASTRONOMY
              </span>
              <span className="text-[12px] text-gray-500 font-medium">Bảo chứng bởi TasteMaker Sài Gòn</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Quán Được Tài Trợ & <span className="gradient-text-premium">Ưu Đãi VIP</span>
            </h1>
            <p className="text-[13px] text-gray-600 mt-1.5 max-w-2xl leading-relaxed">
              Các đối tác ẩm thực chất lượng cao mang tới đặc quyền độc quyền: giảm giá tới 50%, tặng món khai vị & ưu tiên vị trí đẹp cho thành viên LOCALEATS.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 bg-white border border-orange-100 shadow-sm rounded-2xl p-3.5 shrink-0">
            <div className="text-center px-2">
              <div className="text-[18px] font-extrabold text-[#E84A27]">{vipRestaurants.length}</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Đối tác Vàng</div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center px-2">
              <div className="text-[18px] font-extrabold text-amber-600">Lên đến 50%</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Ưu đãi tại bàn</div>
            </div>
          </div>
        </div>

        {/* Ví Voucher Trực Tiếp Trong Ngày */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 animate-slideInUp">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-[#E84A27] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
              </span>
              <div>
                <h3 className="font-extrabold text-[15px] text-gray-900 leading-none">Mã Ưu Đãi VIP Áp Dụng Ngay</h3>
                <p className="text-[11px] text-gray-500 mt-1">Lưu mã vào máy và đưa màn hình cho thu ngân khi thanh toán</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#E84A27] bg-red-50 border border-red-100 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              Hiệu lực hôm nay
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              {
                code: "LOCALEATS50K",
                title: "GIẢM 50.000đ TIỀN MẶT",
                condition: "Áp dụng hóa đơn từ 200.000đ",
                typeBadge: "Giảm tiền mặt",
                theme: "border-[#E84A27]/40 bg-gradient-to-br from-orange-50/60 to-white",
              },
              {
                code: "CHECKIN30K",
                title: "CHECK-IN GIẢM NGAY 30K",
                condition: "Khi mở bản đồ LOCALEATS tại quán",
                typeBadge: "Dùng tại bàn",
                theme: "border-blue-300 bg-gradient-to-br from-blue-50/60 to-white",
              },
              {
                code: "CRAFTBEER2X",
                title: "TẶNG 2 ĐỒ UỐNG ĐẶC BIỆT",
                condition: "Bàn từ 2 người dùng bữa tối",
                typeBadge: "Tặng món",
                theme: "border-amber-300 bg-gradient-to-br from-amber-50/60 to-white",
              },
            ].map((v) => {
              const isCopied = copiedVoucher === v.code;
              return (
                <div
                  key={v.code}
                  className={`border-2 border-dashed rounded-xl p-3.5 flex flex-col justify-between transition-all hover:shadow-md ${v.theme}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-extrabold text-[#E84A27] uppercase tracking-wide bg-white px-2 py-0.5 rounded border border-orange-100">
                        {v.typeBadge}
                      </span>
                      <code className="text-[12px] font-black text-gray-800 tracking-wider font-mono">{v.code}</code>
                    </div>
                    <div className="font-extrabold text-[13px] text-gray-900 leading-tight mb-1">{v.title}</div>
                    <p className="text-[11px] text-gray-500 mb-3">{v.condition}</p>
                  </div>

                  <button
                    onClick={() => copyVoucher(v.code)}
                    className={`w-full flex items-center justify-center gap-1.5 h-8 rounded-full text-[11px] font-bold transition-all shadow-sm ${
                      isCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-[#E84A27] hover:bg-[#c93d1f] text-white"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {isCopied ? "check" : "content_copy"}
                    </span>
                    {isCopied ? "Đã lưu mã vào máy" : "Lưu mã để xuất trình"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thanh tìm kiếm & Phân loại danh mục */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 gap-2.5 h-11 shadow-sm focus-within:border-[#E84A27] transition-colors">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 text-[13px] outline-none text-gray-800 placeholder-gray-400 font-medium"
              placeholder="Tìm quán tài trợ theo tên quán, món ăn hoặc địa chỉ..."
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {filterCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`flex items-center gap-1.5 h-11 px-4 rounded-full text-[12px] font-bold whitespace-nowrap transition-all shadow-sm ${
                  activeFilter === c.id
                    ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                    : "bg-white text-gray-700 hover:bg-orange-50/50 border border-gray-200"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Danh sách các Quán Đối tác VIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
          {filteredRestaurants.map((r) => {
            const isVoucherCopied = copiedVoucher === r.voucher;
            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Ảnh đại diện & Huy hiệu */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tier đối tác */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-900 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-500 text-[14px]">stars</span>
                    {r.partnerTier}
                  </div>

                  {/* Giờ mở cửa */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {r.status}
                  </div>

                  {/* Tiêu đề ngắn trên ảnh */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-orange-200 uppercase tracking-wide">
                      {r.category}
                    </span>
                    <h3 className="font-extrabold text-[16px] leading-snug drop-shadow-sm truncate">
                      {r.name}
                    </h3>
                  </div>
                </div>

                {/* Thông tin & Ưu đãi */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Đánh giá & khoảng cách */}
                    <div className="flex items-center justify-between text-[12px] text-gray-600 mb-3 pb-2.5 border-b border-gray-100">
                      <div className="flex items-center gap-1 font-bold text-gray-900">
                        <span className="text-amber-500 text-[14px]">★</span>
                        <span>{r.rating}</span>
                        <span className="text-gray-400 font-normal">({r.reviews?.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span className="material-symbols-outlined text-[15px] text-[#E84A27]">distance</span>
                        <span className="font-semibold">{r.distanceKm} km</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mb-3 line-clamp-1">
                      <span className="material-symbols-outlined text-[14px] text-gray-400 shrink-0">location_on</span>
                      {r.address}
                    </p>

                    {/* Card ưu đãi nổi bật */}
                    <div className="bg-orange-50/80 border border-orange-200/80 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-1 text-[10px] font-black text-[#E84A27] uppercase tracking-wider mb-1">
                        <span className="material-symbols-outlined text-[14px]">card_giftcard</span>
                        Đặc quyền thành viên:
                      </div>
                      <p className="text-[12px] font-bold text-gray-800 leading-snug">
                        {r.offer}
                      </p>
                      {r.voucherDesc && (
                        <p className="text-[10px] text-gray-500 mt-1 italic">{r.voucherDesc}</p>
                      )}
                    </div>
                  </div>

                  {/* Hành động: Lấy mã voucher & Chỉ đường */}
                  <div className="pt-1 flex flex-col gap-2">
                    {r.voucher && (
                      <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200/80">
                        <div className="flex-1 px-2">
                          <div className="text-[9px] font-semibold text-gray-400 uppercase">Mã xuất trình</div>
                          <code className="text-[12px] font-black text-gray-800 font-mono">{r.voucher}</code>
                        </div>
                        <button
                          onClick={() => copyVoucher(r.voucher)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isVoucherCopied
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-gray-700 hover:text-[#E84A27] border border-gray-200 shadow-sm"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isVoucherCopied ? "check" : "content_copy"}
                          </span>
                          {isVoucherCopied ? "Đã chép" : "Sao chép"}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => navigate('/', { state: { selectedPlaceId: r.id } })}
                      className="w-full flex items-center justify-center gap-2 h-9 rounded-full bg-[#E84A27] text-white text-[12px] font-bold hover:bg-[#c93d1f] shadow-md shadow-[#E84A27]/20 transition-all hover:scale-[1.01]"
                    >
                      <span className="material-symbols-outlined text-[16px]">near_me</span>
                      Chỉ đường tới quán ngay
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">store_mall_directory</span>
            <p className="font-bold text-gray-700 text-base">Không tìm thấy quán nào phù hợp</p>
            <p className="text-gray-500 text-[12px] mt-1">Hãy thử xóa bộ lọc tìm kiếm hoặc từ khóa của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}
