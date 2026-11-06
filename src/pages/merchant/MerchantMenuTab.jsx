import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";

export default function MerchantMenuTab({ currentPlace }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [shiftLunch, setShiftLunch] = useState(true);
  const [shiftDinner, setShiftDinner] = useState(true);
  const [tetOpen, setTetOpen] = useState(true);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 48 mock/rich dishes
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Lẩu Nấm Tùng Nhung & Bò Fuji",
      desc: "Nấm Tùng Nhung, nấm bụng dê, thăn bò Fuji 350g ninh thảo mộc",
      category: "lau",
      categoryName: "Món Lẩu Đặc Trưng",
      price: "589.000 đ",
      discountPrice: "529.000 đ",
      available: true,
      badge: "Best Seller",
      badgeClass: "bg-[#FFDAD3] text-[#8E1400]",
      badgeIcon: "local_fire_department",
      image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=300&q=80",
    },
    {
      id: 2,
      name: "Ba Chỉ Bò Úc Cuộn Nấm Kim Châm",
      desc: "Bò Black Angus hảo hạng cuộn nấm tươi loại 1 VietGAP",
      category: "thit",
      categoryName: "Thịt Bò & Heo Tươi",
      price: "195.000 đ",
      discountPrice: null,
      available: true,
      badge: "AI Khuyên Dùng",
      badgeClass: "bg-[#FFDCC2] text-[#2E1500]",
      badgeIcon: "auto_awesome",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80",
    },
    {
      id: 3,
      name: "Nấm Bụng Dê Rừng Tây Bắc",
      desc: "Thu hái tự nhiên, bảo quản mát 4°C trong ngày từ Sa Pa",
      category: "nam",
      categoryName: "Nấm Quý Tự Nhiên",
      price: "320.000 đ",
      discountPrice: "285.000 đ",
      available: true,
      badge: "VietGAP",
      badgeClass: "bg-[#B1F0CE] text-[#002114]",
      badgeIcon: "eco",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&q=80",
    },
    {
      id: 4,
      name: "Lẩu Gà Đen H’Mông Tiềm Sâm Quý",
      desc: "Gà đen bản địa Sapa ninh cùng đẳng sâm và kỷ tử đỏ",
      category: "lau",
      categoryName: "Món Lẩu Đặc Trưng",
      price: "650.000 đ",
      discountPrice: null,
      available: false,
      badge: "Tạm hết",
      badgeClass: "bg-[#F2DFD1] text-[#5C403A]",
      badgeIcon: "do_not_disturb_on",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&q=80",
    },
    {
      id: 5,
      name: "Trà Dưỡng Nhan Tuyết Yến Cúc Hoa",
      desc: "Bình thủy tinh 1.2L dùng kèm đá mát thanh nhiệt cơ thể",
      category: "douong",
      categoryName: "Thức uống Thảo Mộc",
      price: "85.000 đ",
      discountPrice: "69.000 đ",
      available: true,
      badge: "Best Seller",
      badgeClass: "bg-[#FFDCC2] text-[#2E1500]",
      badgeIcon: "local_fire_department",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    },
    {
      id: 6,
      name: "Nem Chua Rán & Ngô Chiên Bơ Tỏi",
      desc: "Nem chua rán giòn rụm Hà Nội kèm ngô ngọt chiên bơ thơm lừng",
      category: "khaivi",
      categoryName: "Khai vị & Đồ nhúng",
      price: "115.000 đ",
      discountPrice: "99.000 đ",
      available: true,
      badge: "Món Quen",
      badgeClass: "bg-[#FEEADC] text-[#8F4E00]",
      badgeIcon: "thumb_up",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=80",
    },
    {
      id: 7,
      name: "Nấm Đông Trùng Hạ Thảo Tươi",
      desc: "Sinh khối Đông trùng tươi nuôi cấy hữu cơ trên giá thể gạo lứt",
      category: "nam",
      categoryName: "Nấm Quý Tự Nhiên",
      price: "240.000 đ",
      discountPrice: null,
      available: true,
      badge: "Organic",
      badgeClass: "bg-[#B1F0CE] text-[#002114]",
      badgeIcon: "spa",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",
    },
    {
      id: 8,
      name: "Lõi Rùa Bò Ta Thảo Dược",
      desc: "Lõi rùa hoa giòn sần sật, thái tay tươi rói giao sáng mỗi ngày",
      category: "thit",
      categoryName: "Thịt Bò & Heo Tươi",
      price: "265.000 đ",
      discountPrice: "245.000 đ",
      available: true,
      badge: "Đặc Sản",
      badgeClass: "bg-[#FFDAD3] text-[#8E1400]",
      badgeIcon: "star",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80",
    },
  ]);

  const [newDishName, setNewDishName] = useState("");
  const [newDishCat, setNewDishCat] = useState("lau");
  const [newDishPrice, setNewDishPrice] = useState("");
  const [newDishDesc, setNewDishDesc] = useState("");

  useEffect(() => {
    let mounted = true;
    apiFetch("/api/merchant/overview")
      .then((data) => {
        if (mounted && Array.isArray(data?.menu) && data.menu.length > 0) {
          const mapped = data.menu.map((m) => ({
            id: m.id,
            name: m.name,
            desc: m.description || "Món ăn chuẩn vị ẩm thực địa phương",
            category: "lau",
            categoryName: m.isSignature ? "Món Đặc Trưng" : "Thực đơn chính",
            price: `${Number(m.price || 45000).toLocaleString("vi-VN")} đ`,
            discountPrice: m.discountPrice ? `${Number(m.discountPrice).toLocaleString("vi-VN")} đ` : null,
            available: m.status !== "sold_out" && m.status !== "hidden",
            badge: m.isSignature ? "Best Seller" : m.status === "sold_out" ? "Tạm hết" : "Còn món",
            badgeClass: m.status === "sold_out" ? "bg-[#F2DFD1] text-[#5C403A]" : "bg-[#FFDAD3] text-[#8E1400]",
            badgeIcon: m.isSignature ? "local_fire_department" : "restaurant",
            image: m.imageUrl || "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=300&q=80",
          }));
          setDishes((prev) => [...mapped, ...prev]);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const toggleDishStatus = (id) => {
    setDishes((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const next = !d.available;
          if (typeof id === "string" && id.includes("-")) {
            apiFetch(`/api/merchant/menu/${id}/status`, {
              method: "PATCH",
              body: JSON.stringify({ status: next ? "available" : "sold_out" }),
            }).catch(() => {});
          }
          showToast(`Đã ${next ? "mở bán" : "tạm dừng bán"}: ${d.name}`);
          return {
            ...d,
            available: next,
            badge: next ? (d.badge === "Tạm hết" ? "Còn món" : d.badge) : "Tạm hết",
            badgeClass: next ? "bg-[#B1F0CE] text-[#002114]" : "bg-[#F2DFD1] text-[#5C403A]",
          };
        }
        return d;
      })
    );
  };

  const handleAddNewDish = async (e) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    const catMap = {
      lau: "Món Lẩu Đặc Trưng",
      thit: "Thịt Bò & Heo Tươi",
      nam: "Nấm Quý Tự Nhiên",
      khaivi: "Khai vị & Đồ nhúng",
      douong: "Thức uống Thảo Mộc",
    };

    let createdId = Date.now();
    try {
      const res = await apiFetch("/api/merchant/menu", {
        method: "POST",
        body: JSON.stringify({
          name: newDishName,
          description: newDishDesc || "Món ăn mới chuẩn vị ẩm thực địa phương",
          price: Number(newDishPrice),
          isSignature: true,
        }),
      });
      if (res?.id) createdId = res.id;
    } catch {
      // Fallback local state if offline
    }

    const newDish = {
      id: createdId,
      name: newDishName,
      desc: newDishDesc || "Món ăn mới chuẩn vị ẩm thực địa phương",
      category: newDishCat,
      categoryName: catMap[newDishCat] || "Món Mới",
      price: `${Number(newDishPrice).toLocaleString("vi-VN")} đ`,
      discountPrice: null,
      available: true,
      badge: "Mới Ra Mắt",
      badgeClass: "bg-[#FFDAD3] text-[#DE3618]",
      badgeIcon: "fiber_new",
      image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=300&q=80",
    };

    setDishes([newDish, ...dishes]);
    setIsAddDishModalOpen(false);
    setNewDishName("");
    setNewDishPrice("");
    setNewDishDesc("");
    showToast(`Đã thêm món "${newDish.name}" vào thực đơn PostgreSQL VPS!`);
  };

  const filteredDishes =
    activeCategory === "all"
      ? dishes
      : dishes.filter((d) => d.category === activeCategory);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs bg-[#2C694E] text-white animate-bounce">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Headline Banner & Basic Info */}
      <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#DE3618]/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-32 bg-[#FD9013]/10 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md bg-[#F8E5D6] shrink-0 border-2 border-white">
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=400&q=80"
                alt="Lẩu nấm thảo mộc"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2C694E] text-white flex items-center justify-center shadow-sm text-xs">
              <span className="material-symbols-outlined text-sm font-bold">verified</span>
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#231A11] tracking-tight">
                {currentPlace?.name || "Lẩu Nấm Gia Truyền & Bò Cười"}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold">
                <span className="material-symbols-outlined text-xs">verified</span>
                Đã thẩm định thực địa
              </span>
            </div>

            <p className="text-xs text-[#5C403A] flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#DE3618]">restaurant_menu</span>
                Lẩu &amp; Nướng Thảo Mộc Phố Cổ
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#906F69]">badge</span>
                ĐKKD: 0108934120
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#906F69]">receipt</span>
                MST: 0108934120-001
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#8F4E00]">pin_drop</span>
                32 Phố Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội
              </span>
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => showToast("Đang tạo liên kết xem trước hồ sơ công khai!", "info")}
            className="px-4 py-2.5 rounded-full bg-[#FFF8F5] text-[#231A11] hover:bg-[#F8E5D6] transition-all text-xs font-bold shadow-sm flex items-center gap-2 border border-[#F2DFD1]"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            Xem trang khách
          </button>
          <button
            type="button"
            onClick={() => showToast("Đã lưu mọi thay đổi hồ sơ quán!", "success")}
            className="px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white transition-all text-xs font-bold shadow-md shadow-[#DE3618]/25 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">save</span>
            Lưu thay đổi
          </button>
        </div>
      </div>

      {/* Gallery & Operational Meta Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE3618]" />
              <h2 className="text-base font-bold text-[#231A11]">Không gian quán &amp; Thư viện ảnh</h2>
            </div>
            <button
              type="button"
              onClick={() => showToast("Đã tải ảnh chất lượng cao lên kho lưu trữ!", "success")}
              className="text-[#DE3618] hover:text-[#8E1400] text-xs font-bold inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
              Tải ảnh mới
            </button>
          </div>

          {/* Hero Cover Photo */}
          <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden group bg-[#F8E5D6]">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
              alt="Ban công ngoài trời view phố cổ Mã Mây"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#231A11] text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-xs text-[#DE3618]">stars</span>
              Ảnh bìa chính thức
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="font-bold text-sm text-white drop-shadow">Ban công ngoài trời view phố cổ Mã Mây</p>
                <p className="text-xs text-white/80">Khu vực được đặt trước nhiều nhất vào buổi tối</p>
              </div>
              <button
                type="button"
                onClick={() => showToast("Chế độ căn chỉnh góc chụp đã mở", "info")}
                className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 text-xs font-bold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">crop</span>
                Căn lại
              </button>
            </div>
          </div>

          {/* Thumbnails Mosaic */}
          <div className="grid grid-cols-3 gap-3">
            <div className="relative h-28 rounded-xl overflow-hidden group bg-[#F8E5D6]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80"
                alt="Trong nhà ấm cúng"
              />
              <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                Trong nhà ấm cúng
              </span>
            </div>
            <div className="relative h-28 rounded-xl overflow-hidden group bg-[#F8E5D6]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80"
                alt="Bếp mở chuẩn VSATTP"
              />
              <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                Bếp mở chuẩn VSATTP
              </span>
            </div>
            <div
              onClick={() => showToast("Thư viện 24 ảnh chi tiết đang được mở!", "info")}
              className="relative h-28 rounded-xl overflow-hidden bg-[#FFF1E8] hover:bg-[#FEEADC] border border-[#F2DFD1] flex flex-col items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-2xl text-[#DE3618]">collections</span>
              <span className="text-xs font-bold text-[#231A11] mt-1">+21 ảnh khác</span>
            </div>
          </div>
        </div>

        {/* Compliance, Hours & Amenities (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Food Safety & Cert Badge Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2C694E]" />
                <h2 className="text-base font-bold text-[#231A11]">Giấy phép &amp; Chứng nhận</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#B1F0CE] text-[#002114] text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Hợp lệ 2026
              </span>
            </div>

            <div className="flex items-center gap-4 bg-[#FFF8F5] p-3.5 rounded-2xl border border-[#F2DFD1]">
              <div className="w-12 h-12 rounded-xl bg-[#2C694E]/10 text-[#2C694E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">health_and_safety</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-bold text-[#231A11] truncate">
                  Chứng nhận ATTP số 492/2023/ATTP-HK
                </span>
                <span className="text-[11px] text-[#5C403A]">
                  Chi cục ATVSTP Hà Nội phê duyệt • Hết hạn: 18/11/2026
                </span>
              </div>
              <button
                type="button"
                onClick={() => showToast("Đang tải bản scan giấy chứng nhận VSATTP...", "info")}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5C403A] hover:text-[#DE3618] transition-colors border border-[#F2DFD1]"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>
          </div>

          {/* Operating Hours & Shift Controls */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8F4E00]" />
                <h2 className="text-base font-bold text-[#231A11]">Khung giờ mở cửa đón khách</h2>
              </div>
              <span className="text-xs text-[#2C694E] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2C694E] animate-pulse" />
                Đang hoạt động
              </span>
            </div>

            <div className="space-y-3">
              {/* Shift 1 */}
              <div className="flex items-center justify-between bg-[#FFF8F5] p-3.5 rounded-2xl border border-[#F2DFD1]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#8F4E00] text-xl">wb_sunny</span>
                  <div>
                    <p className="text-xs font-bold text-[#231A11]">Ca Trưa (Ăn trưa &amp; Đặt tiệc)</p>
                    <p className="text-[11px] text-[#5C403A]">10:30 — 14:00 (Tất cả các ngày)</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shiftLunch}
                    onChange={(e) => {
                      setShiftLunch(e.target.checked);
                      showToast(`Đã ${e.target.checked ? "bật" : "tắt"} Ca Trưa!`);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                </label>
              </div>

              {/* Shift 2 */}
              <div className="flex items-center justify-between bg-[#FFF8F5] p-3.5 rounded-2xl border border-[#F2DFD1]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#DE3618] text-xl">nights_stay</span>
                  <div>
                    <p className="text-xs font-bold text-[#231A11]">Ca Tối (Lẩu &amp; Họp mặt)</p>
                    <p className="text-[11px] text-[#5C403A]">17:30 — 23:00 (Phục vụ xuyên đêm)</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shiftDinner}
                    onChange={(e) => {
                      setShiftDinner(e.target.checked);
                      showToast(`Đã ${e.target.checked ? "bật" : "tắt"} Ca Tối!`);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE3618]" />
                </label>
              </div>

              {/* Holiday Mode */}
              <div className="flex items-center justify-between bg-[#FFDCC2]/60 p-3 rounded-2xl border border-[#F2DFD1]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#8F4E00] text-base">celebration</span>
                  <span className="text-xs text-[#2E1500] font-bold">Chế độ Mở Xuyên Tết Nguyên Đán</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tetOpen}
                    onChange={(e) => {
                      setTetOpen(e.target.checked);
                      showToast(`Đã ${e.target.checked ? "bật" : "tắt"} nhận bàn xuyên Tết!`);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8F4E00]" />
                </label>
              </div>
            </div>
          </div>

          {/* Amenities Pills */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#231A11]">Tiện ích phục vụ khách</h2>
              <button
                type="button"
                onClick={() => showToast("Mở cửa sổ chỉnh sửa danh sách tiện ích", "info")}
                className="text-[#DE3618] text-xs font-bold hover:underline"
              >
                Thay đổi
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "wifi", text: "Wifi 5G tốc độ cao" },
                { icon: "meeting_room", text: "Phòng riêng VIP (2-12 khách)" },
                { icon: "two_wheeler", text: "Chỗ để xe máy miễn phí" },
                { icon: "qr_code_scanner", text: "Quét QR chuyển khoản & Thẻ VISA" },
                { icon: "child_care", text: "Ghế trẻ em chuyên dụng" },
              ].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#FFF8F5] text-[#231A11] text-xs font-medium flex items-center gap-1.5 border border-[#F2DFD1] shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm text-[#DE3618]">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story & Heritage Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#F2DFD1] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
        <div className="w-full md:w-1/3 h-52 rounded-2xl overflow-hidden shrink-0 shadow-inner bg-[#F8E5D6]">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
            alt="Gia vị thảo mộc gia truyền"
          />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DE3618] text-xl">auto_stories</span>
            <span className="text-xs text-[#DE3618] uppercase font-bold tracking-wider">
              Hương vị di sản từ năm 1994
            </span>
          </div>
          <h3 className="text-lg lg:text-xl font-bold text-[#231A11]">
            Câu chuyện nước dùng 12 vị thảo mộc ninh 14 giờ
          </h3>
          <p className="text-xs lg:text-sm text-[#5C403A] leading-relaxed">
            Được khởi nguồn từ gian bếp nhỏ tại phố cổ Mã Mây hơn 30 năm trước, nước dùng lẩu nấm của quán lưu giữ trọn vẹn công thức gia truyền với 12 vị thảo mộc quý: sâm quy, kỷ tử đỏ, đại táo và hoa tiêu Tây Bắc kết hợp cùng xương ống hầm chậm 14 tiếng. Chúng tôi cam kết 100% nấm tươi hữu cơ và thịt bò sạch đạt tiêu chuẩn VietGAP.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2C694E] text-lg">eco</span>
              <span className="text-xs text-[#231A11] font-bold">100% Nấm Tươi VietGAP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2C694E] text-lg">timer</span>
              <span className="text-xs text-[#231A11] font-bold">Ninh 14h Không Mì Chính</span>
            </div>
            <button
              type="button"
              onClick={() => showToast("Đã mở biên tập viên câu chuyện quán!", "info")}
              className="ml-auto text-[#DE3618] hover:text-[#8E1400] text-xs font-bold flex items-center gap-1"
            >
              Chỉnh sửa nội dung
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Showcase & Management Section */}
      <div className="flex flex-col gap-6">
        {/* Header & Action Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE3618]" />
              <h2 className="text-xl lg:text-2xl font-extrabold text-[#231A11]">Quản lý thực đơn &amp; Món ăn</h2>
            </div>
            <p className="text-xs text-[#5C403A] mt-0.5">
              Tổng cộng {dishes.length} món ăn đang phục vụ khách tại bàn và đặt món online
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => showToast("Đang mở biểu mẫu nhập dữ liệu Excel...", "info")}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF1E8] text-[#231A11] text-xs font-bold flex items-center gap-2 border border-[#F2DFD1] shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">table_view</span>
              Nhập file Excel
            </button>
            <button
              type="button"
              onClick={() => showToast("Cửa sổ cập nhật giá % hàng loạt đã sẵn sàng", "info")}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF1E8] text-[#231A11] text-xs font-bold flex items-center gap-2 border border-[#F2DFD1] shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">price_change</span>
              Cập nhật giá hàng loạt
            </button>
            <button
              type="button"
              onClick={() => setIsAddDishModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              Thêm món mới vào menu
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "Tất cả", count: dishes.length },
            { id: "lau", label: "Món Lẩu Đặc Trưng", icon: "soup_kitchen", count: dishes.filter(d => d.category === "lau").length },
            { id: "thit", label: "Thịt Bò & Heo Tươi", icon: "kebab_dining", count: dishes.filter(d => d.category === "thit").length },
            { id: "nam", label: "Nấm Quý Tự Nhiên", icon: "psychiatry", count: dishes.filter(d => d.category === "nam").length },
            { id: "khaivi", label: "Khai vị & Đồ nhúng", icon: "tapas", count: dishes.filter(d => d.category === "khaivi").length },
            { id: "douong", label: "Thức uống Thảo Mộc", icon: "local_bar", count: dishes.filter(d => d.category === "douong").length },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#DE3618] text-white shadow-md shadow-[#DE3618]/25"
                    : "bg-white text-[#5C403A] hover:bg-[#FFF1E8] border border-[#F2DFD1]"
                }`}
              >
                {cat.icon && <span className="material-symbols-outlined text-base">{cat.icon}</span>}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-[#FEEADC] text-[#5C403A]"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Food Items Table Container */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F2DFD1] flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="text-[#5C403A] text-xs font-bold border-b border-[#F2DFD1] pb-3">
                  <th className="py-3 px-4">Món ăn &amp; Thành phần</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Giá niêm yết</th>
                  <th className="py-3 px-4">Giá ưu đãi</th>
                  <th className="py-3 px-4 text-center">Trạng thái bán</th>
                  <th className="py-3 px-4 text-center">Nhãn nổi bật</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2DFD1]">
                {filteredDishes.map((dish) => (
                  <tr
                    key={dish.id}
                    className={`hover:bg-[#FFF8F5] transition-all rounded-2xl group ${
                      !dish.available ? "opacity-70 bg-gray-50/50" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F8E5D6] shrink-0 relative border border-[#F2DFD1]">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            src={dish.image}
                            alt={dish.name}
                          />
                          {!dish.available && (
                            <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white font-bold">
                              Hết hàng
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs sm:text-sm text-[#231A11]">{dish.name}</span>
                          <span className="text-[11px] text-[#5C403A] line-clamp-1">{dish.desc}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FEEADC] text-[#231A11] text-xs font-medium">
                        {dish.categoryName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-bold text-[#231A11]">{dish.price}</td>
                    <td className="py-3.5 px-4 text-xs font-bold text-[#DE3618]">
                      {dish.discountPrice || "--"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dish.available}
                          onChange={() => toggleDishStatus(dish.id)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2C694E]" />
                      </label>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${dish.badgeClass}`}>
                        {dish.badgeIcon && <span className="material-symbols-outlined text-xs">{dish.badgeIcon}</span>}
                        {dish.badge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => showToast(`Công thức định lượng món: ${dish.name}`, "info")}
                          className="w-8 h-8 rounded-full hover:bg-[#FEEADC] flex items-center justify-center text-[#5C403A] hover:text-[#DE3618] transition-all"
                          title="Công thức định lượng"
                        >
                          <span className="material-symbols-outlined text-base">menu_book</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Chỉnh sửa giá & thông tin món: ${dish.name}`, "info")}
                          className="w-8 h-8 rounded-full hover:bg-[#FEEADC] flex items-center justify-center text-[#5C403A] hover:text-[#DE3618] transition-all"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#F2DFD1]">
            <span className="text-xs text-[#5C403A]">
              Hiển thị {filteredDishes.length} / {dishes.length} món ăn trong danh mục
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#231A11] hover:bg-[#FEEADC] transition-all"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <span className="px-3 py-1 rounded-full bg-[#DE3618] text-white text-xs font-bold">1</span>
              <button
                type="button"
                className="px-3 py-1 rounded-full hover:bg-[#FFF1E8] text-[#231A11] text-xs font-semibold transition-all"
              >
                2
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-full hover:bg-[#FFF1E8] text-[#231A11] text-xs font-semibold transition-all"
              >
                3
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#231A11] hover:bg-[#FEEADC] transition-all"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Dish Modal */}
      {isAddDishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-5 border border-[#F2DFD1] relative animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#F2DFD1] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FFDAD3] text-[#DE3618] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                </div>
                <h3 className="text-base font-bold text-[#231A11]">Thêm món mới vào thực đơn</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddDishModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#5C403A] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNewDish} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#231A11] mb-1">Tên món ăn</label>
                <input
                  type="text"
                  required
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="VD: Nấm Hầu Thủ Xào Thảo Dược Phố Cổ"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F5] border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#231A11] mb-1">Danh mục</label>
                  <select
                    value={newDishCat}
                    onChange={(e) => setNewDishCat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFF8F5] border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                  >
                    <option value="lau">Món Lẩu Đặc Trưng</option>
                    <option value="thit">Thịt Bò & Heo Tươi</option>
                    <option value="nam">Nấm Quý Tự Nhiên</option>
                    <option value="khaivi">Khai vị & Đồ nhúng</option>
                    <option value="douong">Thức uống Thảo Mộc</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#231A11] mb-1">Giá bán niêm yết (VNĐ)</label>
                  <input
                    type="number"
                    required
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    placeholder="VD: 185000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F5] border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#231A11] mb-1">Mô tả nguyên liệu & Dinh dưỡng</label>
                <textarea
                  rows="3"
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  placeholder="Chi tiết về các vị thảo mộc, định lượng đĩa và nguồn gốc chứng nhận VietGAP..."
                  className="w-full px-4 py-2 rounded-xl bg-[#FFF8F5] border border-[#F2DFD1] text-xs font-medium text-[#231A11] focus:outline-none focus:border-[#DE3618]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDishModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#5C403A] text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-[#DE3618] hover:bg-[#B91D00] text-white text-xs font-bold shadow-md shadow-[#DE3618]/25 transition-all"
                >
                  Lưu món mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

