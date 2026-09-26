import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../data/places";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 shrink-0 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto no-scrollbar">
      {/* Section header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">Khám phá & Điều hướng</span>
        <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <span className="material-symbols-outlined text-[14px] text-[#E84A27]">my_location</span>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-2 px-2">
        {sidebarItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all group ${
                active
                  ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  active ? "text-white" : "text-gray-500 group-hover:text-[#E84A27]"
                }`}
              >
                {item.icon}
              </span>
              <span className={`text-[13px] font-semibold flex-1 ${active ? "text-white" : ""}`}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    active
                      ? "bg-white text-[#E84A27]"
                      : item.badge === "SMART"
                      ? "bg-green-100 text-green-700"
                      : item.badge === "MỚI"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-[#E84A27]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Live info box */}
      <div className="mx-3 mb-3 p-3 bg-orange-50 border border-orange-200 rounded-xl">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#E84A27] mt-0.5">info</span>
          <div>
            <p className="text-[11px] font-bold text-gray-800">Giờ cao điểm ẩm thực</p>
            <p className="text-[10px] text-gray-600 mt-0.5 leading-relaxed">
              Khu vực quận trung tâm đang tăng nhiệt với hơn 140 quán nướng mở cửa đón khách.
            </p>
          </div>
        </div>
      </div>

      {/* Add restaurant CTA */}
      <div className="px-3 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-orange-300 text-[12px] font-bold text-[#E84A27] hover:bg-orange-50 transition-colors">
          <span className="material-symbols-outlined text-[16px]">add_location_alt</span>
          Đóng góp quán mới
        </button>
      </div>
    </aside>
  );
}
