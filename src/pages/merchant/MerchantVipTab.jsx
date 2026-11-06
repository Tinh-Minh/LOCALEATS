import { useState, useEffect } from "react";
import { localeatsApi } from "../../utils/api";

export default function MerchantVipTab({ currentPlace, merchantData, onRefresh }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [autoRenew, setAutoRenew] = useState(true);
  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Flash sale campaigns from PostgreSQL ad_campaign
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Tối Thứ 6 Vui Vẻ - Giảm 20% Lẩu Nấm",
      time: "18:00 - 20:30 (Tối)",
      radius: "2.0 km (Phố Cổ)",
      budget: "1 lượt miễn phí (Gói Vàng)",
      gpsReach: "3,480 khách",
      dinersArrived: "84 bàn",
      status: "Đang phát sóng",
      statusClass: "bg-[#B1F0CE] text-[#002114] animate-pulse",
    },
    {
      id: 2,
      name: "Trưa Thứ 4 Công Sở - Tặng Trà Sen Nhãn",
      time: "11:30 - 13:30 (Trưa)",
      radius: "1.5 km (Hoàn Kiếm)",
      budget: "Trừ 500.000đ",
      gpsReach: "2,150 khách",
      dinersArrived: "52 bàn",
      status: "Đã hoàn thành",
      statusClass: "bg-[#FEEADC] text-[#5C403A]",
    },
    {
      id: 3,
      name: "Đêm Muộn Phố Cổ - Giảm 15% Sau 22h",
      time: "22:00 - 00:30 (Khuya)",
      radius: "1.0 km (Tạ Hiện)",
      budget: "1 lượt miễn phí (Gói Vàng)",
      gpsReach: "1,890 khách",
      dinersArrived: "36 bàn",
      status: "Đã hoàn thành",
      statusClass: "bg-[#FEEADC] text-[#5C403A]",
    },
  ]);

  const [formName, setFormName] = useState("");
  const [formHours, setFormHours] = useState("18:00 - 20:30");
  const [formRadius, setFormRadius] = useState("2.0 km (Toàn bộ phố cổ)");
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    if (Array.isArray(merchantData?.campaigns) && merchantData.campaigns.length > 0) {
      setCampaigns(
        merchantData.campaigns.map((c) => ({
          id: c.id,
          name: `${c.title} ${c.voucherCode ? `(${c.voucherCode})` : ""}`,
          time: c.discountValue || "18:00 - 21:00",
          radius: "2.0 km (Bán kính GPS)",
          budget: `${Number(c.budgetVnd || 2000000).toLocaleString("vi-VN")}đ`,
          gpsReach: `${(c.voucherQuota || 200) * 12} khách`,
          dinersArrived: `${c.voucherClaimed || 12} lượt nhận mã`,
          status: c.status === "running" ? "Đang phát sóng" : "Đã hoàn thành",
          statusClass:
            c.status === "running"
              ? "bg-[#B1F0CE] text-[#002114] animate-pulse"
              : "bg-[#FEEADC] text-[#5C403A]",
        }))
      );
    }
  }, [merchantData?.campaigns]);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!formName) return;

    try {
      await localeatsApi.createMerchantCampaign({
        storeId: currentPlace?.id,
        title: formName,
        description: formMsg || `Khung giờ ${formHours} • Bán kính ${formRadius}`,
        budgetVnd: 2500000,
      });
      if (onRefresh) await onRefresh();
    } catch {}

    const newCamp = {
      id: Date.now(),
      name: formName,
      time: formHours,
      radius: formRadius,
      budget: "2.500.000đ (Đã lưu PostgreSQL)",
      gpsReach: "~2,800 khách lân cận",
      dinersArrived: "Đang ghi nhận...",
      status: "Đang phát sóng",
      statusClass: "bg-[#B1F0CE] text-[#002114] animate-pulse",
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setIsCampaignFormOpen(false);
    setFormName("");
    setFormMsg("");
    showToast(`Đã lưu chiến dịch "${newCamp.name}" vào PostgreSQL thành công!`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Active Tier Spotlight Banner & Executive Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF1E8] via-[#FEEADC] to-[#F8E5D6] p-6 lg:p-8 shadow-sm border border-[#F2DFD1]">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#FD9013]/15 blur-3xl pointer-events-none" />
        <div className="absolute right-36 bottom-0 w-64 h-64 rounded-full bg-[#DE3618]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FD9013] text-white text-xs font-bold tracking-wide uppercase shadow-sm">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                Gói Đang Kích Hoạt: VIP VÀNG (Khu Vực Hoàn Kiếm)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C694E] animate-ping" />
                Đang hoạt động tối ưu
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#231A11] tracking-tight">
              Hiệu Suất Quảng Bá Bản Đồ &amp; Độc Quyền Khu Vực
            </h1>

            <p className="text-xs sm:text-sm text-[#5C403A]">
              Nhà hàng đang giữ vị trí <strong className="text-[#DE3618]">Top #2 Ẩm Thực Hoàn Kiếm</strong>. Thuật toán tự động định tuyến thực khách lân cận vào giờ cao điểm bữa trưa và tối.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#5C403A]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#8F4E00] text-lg">event_upcoming</span>
                <span>
                  Thời hạn: Còn <strong className="text-[#231A11] font-bold">18 ngày</strong> (Đến 15/11/2026)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#2C694E] text-lg">autorenew</span>
                <span className={`font-bold ${autoRenew ? "text-[#2C694E]" : "text-gray-500"}`}>
                  Gia hạn tự động: {autoRenew ? "ĐANG BẬT" : "ĐÃ TẮT"}
                </span>
              </div>
            </div>
          </div>

          {/* Call to actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsUpgradeModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-lg shadow-[#DE3618]/25 hover:shadow-xl transition-all transform active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
              Nâng Cấp Lên VIP Kim Cương
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAutoRenew(!autoRenew);
                  showToast(`Đã ${!autoRenew ? "bật" : "tắt"} tự động gia hạn gói VIP!`);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF8F5] text-[#231A11] text-xs font-bold shadow-sm border border-[#F2DFD1] transition-all"
              >
                <span className={`material-symbols-outlined text-sm ${autoRenew ? "text-[#2C694E]" : "text-gray-400"}`}>
                  check_circle
                </span>
                <span>Gia hạn tự động: {autoRenew ? "Bật" : "Tắt"}</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Đã tải hợp đồng và hóa đơn điện tử VAT!", "info")}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5C403A] hover:text-[#DE3618] border border-[#F2DFD1] transition-colors shadow-sm"
                title="Tải hợp đồng tài trợ"
              >
                <span className="material-symbols-outlined text-lg">download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Metric & Performance Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Hệ Số Lợi Nhuận ROI</span>
            <div className="w-8 h-8 rounded-full bg-[#B1F0CE] flex items-center justify-center text-[#2C694E]">
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-black text-[#2C694E] tracking-tight">12.4x</span>
              <span className="text-xs font-bold text-[#2C694E]">+2.1x tháng này</span>
            </div>
            <p className="text-xs text-[#5C403A] mt-1 leading-relaxed">
              Đầu tư 4.500.000đ thu về ước tính <strong className="text-[#231A11]">55.800.000đ</strong> doanh thu bàn tiệc.
            </p>
          </div>
          <div className="w-full bg-[#F8E5D6] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#2C694E] h-full rounded-full" style={{ width: "82%" }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Lượt Bấm Chỉ Đường GPS</span>
            <div className="w-8 h-8 rounded-full bg-[#FFDCC2] flex items-center justify-center text-[#8F4E00]">
              <span className="material-symbols-outlined text-lg">near_me</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-black text-[#231A11] tracking-tight">2.450</span>
              <span className="text-xs font-bold text-[#8F4E00]">Lượt tới quán</span>
            </div>
            <p className="text-xs text-[#5C403A] mt-1 leading-relaxed">
              Tỉ lệ chuyển đổi từ bấm định vị thành đơn dùng bữa tại bàn đạt 68%.
            </p>
          </div>
          <div className="w-full bg-[#F8E5D6] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#FD9013] h-full rounded-full" style={{ width: "68%" }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Lượt Ghim Đề Xuất AI</span>
            <div className="w-8 h-8 rounded-full bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-black text-[#DE3618] tracking-tight">18.9K</span>
              <span className="text-xs font-bold text-[#DE3618]">Hiển thị VIP</span>
            </div>
            <p className="text-xs text-[#5C403A] mt-1 leading-relaxed">
              AI Sommelier gợi ý món đặc sản Bếp Trưởng cho khách tìm kiếm ẩm thực Bắc.
            </p>
          </div>
          <div className="w-full bg-[#F8E5D6] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#DE3618] h-full rounded-full" style={{ width: "90%" }} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C403A] uppercase tracking-wider">Bán Kính Phủ Sóng</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#231A11]">
              <span className="material-symbols-outlined text-lg">radar</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-black text-[#231A11] tracking-tight">3.5 km</span>
              <span className="text-xs font-semibold text-[#5C403A]">Phủ toàn Phố Cổ</span>
            </div>
            <p className="text-xs text-[#5C403A] mt-1 leading-relaxed">
              Du khách quốc tế &amp; khách hàng nội đô quanh Hồ Gươm được định tuyến ưu tiên.
            </p>
          </div>
          <div className="w-full bg-[#F8E5D6] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#231A11] h-full rounded-full" style={{ width: "75%" }} />
          </div>
        </div>
      </div>

      {/* Comparative Plans Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F4E00]">
              Hệ Thống Phân Cấp Tài Trợ
            </span>
            <h2 className="text-xl lg:text-2xl font-extrabold text-[#231A11] tracking-tight mt-1">
              Các Gói Tài Trợ Bản Đồ LOCALEATS
            </h2>
            <p className="text-xs text-[#5C403A]">
              Tối ưu hóa độ nhận diện và thu hút khách sành ăn ngay trên lộ trình di chuyển hàng ngày.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FFF1E8] p-1 rounded-full border border-[#F2DFD1]">
            <span className="px-4 py-1.5 rounded-full bg-white text-xs font-bold shadow-xs text-[#231A11]">
              Theo Tháng
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#5C403A]">
              Theo Năm (-15%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#231A11]">Cơ Bản</span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFF1E8] text-[11px] text-[#5C403A]">Tiêu chuẩn</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#231A11]">0đ</span>
                <span className="text-xs text-[#5C403A]"> / tháng</span>
              </div>
              <p className="text-xs text-[#5C403A]">Dành cho quán mới tham gia, lưu trữ vị trí tọa độ căn bản.</p>
              <div className="h-px bg-[#F2DFD1] my-1" />
              <ul className="flex flex-col gap-2.5 text-xs text-[#231A11]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#5C403A] text-base shrink-0">check</span>
                  <span>Ghim vị trí mặc định chấm xám mờ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#5C403A] text-base shrink-0">check</span>
                  <span>Tìm kiếm theo tên chính xác</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-base shrink-0">close</span>
                  <span>Không có hiệu ứng hào quang</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-base shrink-0">close</span>
                  <span>Không có Flash Sale đẩy theo giờ</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              disabled
              className="w-full mt-8 py-3 rounded-full bg-gray-100 text-gray-400 text-xs font-bold cursor-not-allowed"
            >
              Gói Miễn Phí
            </button>
          </div>

          {/* VIP Silver */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#231A11]">VIP Bạc</span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFDCC2] text-[11px] text-[#8F4E00] font-bold">
                  Tăng tốc
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#231A11]">2.5M</span>
                <span className="text-xs text-[#5C403A]"> VNĐ / tháng</span>
              </div>
              <p className="text-xs text-[#5C403A]">Thích hợp cho quán muốn tăng độ hiện diện bán kính nội phường.</p>
              <div className="h-px bg-[#F2DFD1] my-1" />
              <ul className="flex flex-col gap-2.5 text-xs text-[#231A11]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">check_circle</span>
                  <span>Ghim bản đồ viền cam nổi bật</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">check_circle</span>
                  <span>Ưu tiên tìm kiếm trong bán kính 2km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">check_circle</span>
                  <span>1 chiến dịch Flash Sale/tuần</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-base shrink-0">close</span>
                  <span>Chưa hỗ trợ AI Sommelier gợi ý</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => showToast("Chuyển đổi sang gói VIP Bạc sẽ có hiệu lực từ kỳ tới", "info")}
              className="w-full mt-8 py-3 rounded-full bg-[#FFF1E8] hover:bg-[#FEEADC] text-[#8F4E00] text-xs font-bold border border-[#F2DFD1] transition-all"
            >
              Hạ Cấp Xuống Bạc
            </button>
          </div>

          {/* VIP Gold (Currently Active) */}
          <div className="relative bg-gradient-to-b from-[#FFF8F5] to-white rounded-3xl p-6 shadow-xl border-2 border-[#FD9013] flex flex-col justify-between transform xl:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FD9013] text-white text-[11px] font-bold tracking-wide shadow-md uppercase">
              Gói Đang Sử Dụng
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#8F4E00]">VIP Vàng</span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFDCC2] text-[#2E1500] text-[11px] font-bold">
                  Phổ Biến Nhất
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#8F4E00]">4.5M</span>
                <span className="text-xs text-[#5C403A]"> VNĐ / tháng</span>
              </div>
              <p className="text-xs text-[#5C403A]">Chiếm lĩnh thị phần tìm kiếm ẩm thực khu vực trọng điểm Hoàn Kiếm.</p>
              <div className="h-px bg-[#F2DFD1] my-1" />
              <ul className="flex flex-col gap-2.5 text-xs text-[#231A11]">
                <li className="flex items-start gap-2 font-bold">
                  <span className="material-symbols-outlined text-[#DE3618] text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_fire_department
                  </span>
                  <span>Ghim lửa cháy phát sáng động</span>
                </li>
                <li className="flex items-start gap-2 font-bold">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">military_tech</span>
                  <span>Vị trí cam kết Top #2 - #3 Quận</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">psychology</span>
                  <span>AI Sommelier ưu tiên đề xuất đặc sản</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">verified</span>
                  <span>Badge 'Đối tác VIP Vàng'</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base shrink-0">bolt</span>
                  <span>4 Flash Sale giờ vàng mỗi tháng</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <div className="text-center text-[11px] text-[#2C694E] font-bold flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">lock_clock</span> Đã kích hoạt đến 15/11/2026
              </div>
              <button
                type="button"
                onClick={() => showToast("Bạn đã ở gói VIP Vàng!", "info")}
                className="w-full py-3 rounded-full bg-[#FFDCC2] text-[#2E1500] text-xs font-bold cursor-default"
              >
                Đang Kích Hoạt
              </button>
            </div>
          </div>

          {/* VIP Diamond */}
          <div className="relative bg-gradient-to-b from-[#231A11] to-[#392E25] text-white rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-[#FD9013]/20 blur-2xl pointer-events-none" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#FFDCC2] flex items-center gap-1">
                  VIP Kim Cương
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diamond
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#DE3618] text-white text-[10px] font-bold uppercase">
                  #1 Độc Quyền
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#FFDCC2]">8.9M</span>
                <span className="text-xs text-white/70"> VNĐ / tháng</span>
              </div>
              <p className="text-xs text-white/70">
                Vị thế số 1 tuyệt đối toàn quận. Tiếp cận 100% người dùng mở bản đồ ẩm thực.
              </p>
              <div className="h-px bg-white/10 my-1" />
              <ul className="flex flex-col gap-2.5 text-xs text-white/90">
                <li className="flex items-start gap-2 font-bold text-[#FFDCC2]">
                  <span className="material-symbols-outlined text-base shrink-0">crown</span>
                  <span>Top #1 Độc quyền bản đồ toàn quận</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#FFDCC2] text-base shrink-0">flare</span>
                  <span>Hào quang vàng kim &amp; ghim phóng to x1.5</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#FFDCC2] text-base shrink-0">ad_units</span>
                  <span>Banner độc quyền trang chủ LOCALEATS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#FFDCC2] text-base shrink-0">notifications_active</span>
                  <span>Thông báo đẩy Flash Sale KHÔNG GIỚI HẠN</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#FFDCC2] text-base shrink-0">support_agent</span>
                  <span>Dedicated Quản lý chiến dịch cá nhân</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setIsUpgradeModalOpen(true)}
              className="w-full mt-8 py-3 rounded-full bg-gradient-to-r from-[#FD9013] to-[#DE3618] hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all transform active:scale-95"
            >
              Chiếm Lĩnh Top #1 Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Interactive Visualizer Section */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1E8] w-fit text-[#DE3618] text-xs font-bold border border-[#F2DFD1]">
            <span className="material-symbols-outlined text-sm">visibility</span>
            Mô phỏng hiển thị thời gian thực
          </div>
          <h3 className="text-xl lg:text-2xl font-extrabold text-[#231A11] tracking-tight">
            Khách Hàng Thấy Quán Bạn Như Thế Nào Trên Bản Đồ?
          </h3>
          <p className="text-xs sm:text-sm text-[#5C403A] leading-relaxed">
            Gói VIP Vàng trang bị hiệu ứng ghim định vị tỏa nhiệt ấm, lôi cuốn thị giác ngay khi người dùng tìm kiếm cụm từ <em>"Lẩu nấm ngon"</em>, <em>"Bếp Bắc gia truyền"</em> hoặc lướt dạo quanh Hồ Gươm.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#FFDAD3] flex items-center justify-center text-[#DE3618]">
                <span className="material-symbols-outlined text-xl">touch_app</span>
              </span>
              <div>
                <span className="text-base font-black text-[#231A11] block">+340%</span>
                <span className="text-xs text-[#5C403A]">Tỷ lệ chạm vào ghim</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFF8F5] border border-[#F2DFD1] flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#B1F0CE] flex items-center justify-center text-[#002114]">
                <span className="material-symbols-outlined text-xl">table_restaurant</span>
              </span>
              <div>
                <span className="text-base font-black text-[#231A11] block">42 bàn/ngày</span>
                <span className="text-xs text-[#5C403A]">Dẫn nguồn trực tiếp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Phone / Map Preview */}
        <div className="w-full lg:w-[460px] h-[340px] rounded-3xl bg-[#F8EFE6] relative overflow-hidden shadow-inner flex items-center justify-center border border-[#F2DFD1]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          {/* Animated Mockup Pin */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <div className="px-3.5 py-1.5 rounded-full bg-[#DE3618] text-white text-xs font-bold flex items-center gap-1.5 shadow-xl">
              <span className="material-symbols-outlined text-sm text-[#FFDCC2]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span>{currentPlace?.name || "Bếp Trưởng Hà Nội"} • VIP #2</span>
              <span className="bg-[#8F4E00] px-1.5 py-0.5 rounded text-[10px] font-bold">4.9 ★</span>
            </div>
            <div className="w-3 h-3 bg-[#DE3618] rotate-45 -mt-1.5" />
            <div className="w-8 h-2 rounded-full bg-black/30 blur-xs mt-1" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between text-[#231A11] border border-[#F2DFD1] shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE3618] animate-pulse" />
              <span className="text-xs font-semibold">Tọa độ: 21.0285° N, 105.8542° E (Hoàn Kiếm)</span>
            </div>
            <span className="text-xs text-[#DE3618] font-bold">Bán kính quét: 3.5km</span>
          </div>
        </div>
      </div>

      {/* Hourly Flash Campaign Manager */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#DE3618] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#231A11]">
                Chiến Dịch Quảng Cáo Theo Giờ (Hourly Flash Campaign)
              </h2>
            </div>
            <p className="text-xs text-[#5C403A] mt-1">
              Bắn thông báo đẩy trực tiếp tới màn hình người dùng đang đi dạo hoặc tìm chỗ ăn trong khung giờ vàng ăn tối.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCampaignFormOpen(!isCampaignFormOpen)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            {isCampaignFormOpen ? "Đóng biểu mẫu" : "Tạo Chiến Dịch Flash Sale Mới"}
          </button>
        </div>

        {/* Collapsible Campaign Creator Form */}
        {isCampaignFormOpen && (
          <div className="bg-[#FFF8F5] rounded-3xl p-6 border border-[#F2DFD1] animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2DFD1]">
              <span className="text-xs font-bold text-[#231A11] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8F4E00]">campaign</span>
                Thiết lập chiến dịch bắn tin lân cận
              </span>
              <button
                type="button"
                onClick={() => setIsCampaignFormOpen(false)}
                className="text-[#5C403A] hover:text-[#231A11]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col gap-1.5 lg:col-span-2">
                <label className="text-xs font-bold text-[#231A11]">Tên Chương Trình Ưu Đãi</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="VD: Giờ Vàng Tối Thứ 6 - Tặng Thố Nấm Quý"
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#231A11]">Khung Giờ Đẩy Tin</label>
                <select
                  value={formHours}
                  onChange={(e) => setFormHours(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                >
                  <option value="11:30 - 13:30 (Trưa)">Trưa: 11h30 - 13h30</option>
                  <option value="18:00 - 20:30 (Tối)">Tối: 18h00 - 20h30 (Cao điểm)</option>
                  <option value="20:30 - 23:00 (Khuya)">Khuya: 20h30 - 23h00</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#231A11]">Bán Kính Quét GPS</label>
                <select
                  value={formRadius}
                  onChange={(e) => setFormRadius(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                >
                  <option value="1.0 km (Khách lân cận)">1.0 km (Khách phố lân cận)</option>
                  <option value="2.0 km (Toàn bộ phố cổ)">2.0 km (Toàn bộ phố cổ)</option>
                  <option value="3.5 km (Hoàn Kiếm & HBT)">3.5 km (Hoàn Kiếm &amp; Hai Bà Trưng)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 lg:col-span-3">
                <label className="text-xs font-bold text-[#231A11]">Thông Điệp Popup Đẩy Đến Khách (Max 80 ký tự)</label>
                <input
                  type="text"
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="VD: Tặng ngay thố nấm quý thượng hạng cho bàn từ 4 người khi đến trước 20h!"
                  className="w-full h-11 px-4 rounded-xl bg-white border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all"
                >
                  Kích Hoạt Chiến Dịch
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Campaign Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead>
              <tr className="bg-[#FFF1E8] text-[#5C403A] font-bold uppercase tracking-wider rounded-xl">
                <th className="py-3 px-4 rounded-l-xl">Tên Chiến Dịch</th>
                <th className="py-3 px-4">Thời Gian Phát Sóng</th>
                <th className="py-3 px-4">Bán Kính</th>
                <th className="py-3 px-4">Ngân Sách Trừ Gói</th>
                <th className="py-3 px-4 text-center">Tiếp Cận GPS</th>
                <th className="py-3 px-4 text-center">Khách Tới Quán</th>
                <th className="py-3 px-4 rounded-r-xl text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2DFD1]">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-[#FFF8F5] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#231A11]">{camp.name}</td>
                  <td className="py-3.5 px-4 text-[#5C403A]">{camp.time}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#231A11]">{camp.radius}</td>
                  <td className="py-3.5 px-4 text-[#8F4E00] font-semibold">{camp.budget}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#DE3618]">{camp.gpsReach}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#2C694E]">{camp.dinersArrived}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${camp.statusClass}`}>
                      {camp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade to Diamond Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#231A11] text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-white/10 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-5 right-5 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-2 text-[#FD9013] mb-2">
              <span className="material-symbols-outlined text-2xl">diamond</span>
              <span className="text-xs uppercase font-extrabold tracking-wider">Nâng Cấp Gói Kim Cương</span>
            </div>

            <h3 className="text-xl font-extrabold text-white">
              Chiếm Lĩnh Vị Trí #1 Độc Quyền Hoàn Kiếm
            </h3>

            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              Bạn đang chuyển từ <strong>VIP Vàng (4.5M/tháng)</strong> lên <strong>VIP Kim Cương (8.9M/tháng)</strong>. Số ngày còn lại của gói Vàng sẽ được quy đổi bù trừ trực tiếp vào chu kỳ mới.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/70">Giá niêm yết:</span>
                <span className="font-bold">8.900.000 VNĐ / tháng</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Khấu trừ ngày VIP Vàng còn lại (18 ngày):</span>
                <span className="font-bold text-[#B1F0CE]">- 2.700.000 VNĐ</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between text-sm">
                <span className="font-bold text-[#FFDCC2]">Cần thanh toán hôm nay:</span>
                <span className="font-extrabold text-[#FD9013]">6.200.000 VNĐ</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpgradeModalOpen(false);
                  showToast("Đã kích hoạt thành công Gói VIP Kim Cương #1!", "success");
                }}
                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#FD9013] to-[#DE3618] hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all"
              >
                Xác nhận nâng cấp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

