import { Link, useLocation } from "react-router-dom";

const sidebarNavItems = [
  {
    id: "nearby",
    label: "Quanh đây & Xu hướng",
    path: "/",
    icon: "explore",
    type: "active", // first item = active style in design
  },
  {
    id: "vip",
    label: "Quán Tài Trợ & Ưu đãi VIP",
    path: "/vip",
    icon: "workspace_premium",
    type: "vip",
    badge: "VIP",
  },
  {
    id: "hot",
    label: "Đang HOT",
    path: "/hotlist",
    icon: "local_fire_department",
    type: "hot",
    badge: "BÙNG NỔ",
  },
  {
    id: "ai",
    label: "AI Gợi ý món ăn",
    path: "/ai",
    icon: "auto_awesome",
    type: "smart",
    badge: "SMART",
  },
  {
    id: "review",
    label: "Góc Review",
    path: "/review",
    icon: "rate_review",
    type: "review",
    badge: "MỚI",
  },
  {
    id: "mystery",
    label: "Hôm Nay Ăn Gì? (Quay Số)",
    path: "/mystery",
    icon: "casino",
    type: "smart",
    badge: "MỚI",
  },
  {
    id: "trip",
    label: "Kế hoạch chuyến đi (Food Tour)",
    path: "/trip",
    icon: "alt_route",
    iconColor: "text-[#F58A07]",
    badge: "MỚI",
    badgeStyle: "smart",
    type: "smart",
  },
  {
    id: "saved",
    label: "Bộ sưu tập yêu thích",
    path: "/saved",
    icon: "favorite",
    iconColor: "text-[#E84A27]",
    type: "normal",
  },
  {
    id: "live",
    label: "Livestream Quán Ăn Live",
    path: "/live",
    icon: "videocam",
    iconColor: "text-red-500",
    badge: "TRỰC TIẾP",
    badgeStyle: "hot",
    type: "hot",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-72 lg:w-80 shrink-0 h-full bg-white border-r border-[#F2EAE1] shadow-[0_12px_36px_rgba(74,59,50,0.06)] flex-col overflow-hidden">
      {/* Section header */}
      <div className="px-4 py-3 bg-[#FAF4EE] flex items-center justify-between border-b border-[#F2EAE1]">
        <span className="text-[14px] font-bold text-[#231812] tracking-tight">Khám phá & Điều hướng</span>
        <span className="material-symbols-outlined text-[#E84A27] text-xl animate-pulse">local_fire_department</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col p-2 gap-1">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.path;

          // Active item (gradient orange/red)
          if (isActive) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E84A27] to-[#FF5436] text-white font-bold shadow-[0_4px_12px_rgba(232,74,39,0.3)] transition-all"
              >
                <span className="material-symbols-outlined mr-3 text-lg text-white">{item.icon}</span>
                <span className="text-[12px] font-bold tracking-wide">{item.label}</span>
              </Link>
            );
          }

          // VIP item (golden border + gradient background)
          if (item.type === "vip") {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[#231812] hover:bg-[#FAF4EE] transition-all group border border-[#FFD700]/50 bg-gradient-to-r from-[#FFF8E7] to-transparent shadow-sm"
              >
                <div className="flex items-center">
                  <span
                    className="material-symbols-outlined mr-3 text-lg text-[#F58A07] animate-bounce"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[12px] font-bold text-[#6D3A00]">{item.label}</span>
                </div>
                <span className="bg-gradient-to-r from-[#FF9F1C] to-[#E84A27] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                  <span
                    className="material-symbols-outlined text-[10px] text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    crown
                  </span>
                  {item.badge}
                </span>
              </Link>
            );
          }

          // HOT item
          if (item.type === "hot") {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[#5C453C] hover:bg-[#F6ECE1] hover:text-[#231812] transition-all group"
              >
                <div className="flex items-center">
                  <span
                    className="material-symbols-outlined mr-3 text-lg text-[#E84A27] animate-pulse"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[12px] font-semibold">{item.label}</span>
                </div>
                <span className="bg-[#FFDAD3]/80 text-[#8E1400] text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-[#E84A27]/30 uppercase tracking-wide">
                  {item.badge}
                </span>
              </Link>
            );
          }

          // SMART / AI item
          if (item.type === "smart") {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[#5C453C] hover:bg-[#F6ECE1] hover:text-[#231812] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF1DB] border border-[#FF9F1C]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <span
                      className="material-symbols-outlined text-[#E84A27] text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-[#231812]">{item.label}</span>
                </div>
                <span className="bg-gradient-to-r from-[#FFF1DB] to-[#FFDAD3]/80 text-[#E84A27] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-[#FF9F1C]/30 uppercase tracking-wide shadow-sm flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px] text-[#F58A07]">smart_toy</span>
                  {item.badge}
                </span>
              </Link>
            );
          }

          // Review item (with animated ping dot)
          if (item.type === "review") {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[#5C453C] hover:bg-[#F6ECE1] hover:text-[#231812] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF9F1C] to-[#E84A27] flex items-center justify-center shadow-[0_2px_8px_rgba(232,74,39,0.35)] shrink-0 group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-white text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFD700]"></span>
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#231812]">{item.label}</span>
                </div>
                <span className="bg-gradient-to-r from-[#FFF1DB] to-[#FFDAD3]/80 text-[#E84A27] text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border border-[#FF9F1C]/30 uppercase tracking-wide shadow-sm">
                  {item.badge}
                </span>
              </Link>
            );
          }

          // Normal items
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center px-4 py-2.5 rounded-xl text-[#5C453C] hover:bg-[#F6ECE1] hover:text-[#231812] transition-all"
            >
              <span className={`material-symbols-outlined mr-3 text-lg ${item.iconColor || "text-gray-500"}`}>
                {item.icon}
              </span>
              <span className="text-[12px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
        {/* Live info box */}
        <div className="bg-[#FFF1DB]/70 border border-[#FF9F1C]/25 p-3 rounded-xl flex items-start gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[#F58A07] text-lg mt-0.5">local_fire_department</span>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#3E1B00] font-bold">Giờ cao điểm ẩm thực LOCALEATS</span>
            <span className="text-[12px] text-[#6D3A00] mt-0.5 leading-relaxed">
              Khu vực quận trung tâm đang tăng nhiệt với hơn 140 quán nướng mở cửa đón khách.
            </span>
          </div>
        </div>
      </div>

      {/* Add restaurant CTA */}
      <div className="p-2 bg-[#FAF4EE] border-t border-[#F2EAE1]">
        <button className="w-full py-2.5 bg-gradient-to-r from-[#E84A27] to-[#FF5436] text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 hover:shadow-[0_4px_16px_rgba(232,74,39,0.35)] hover:opacity-95 transition-all">
          <span className="material-symbols-outlined text-base">add_location_alt</span>
          Đóng góp quán mới
        </button>
      </div>
    </aside>
  );
}
