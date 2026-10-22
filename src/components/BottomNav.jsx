import { Link, useLocation } from "react-router-dom";

const bottomNavItems = [
  {
    id: "map",
    label: "Bản đồ",
    path: "/",
    icon: "explore",
  },
  {
    id: "hot",
    label: "Đang HOT",
    path: "/hotlist",
    icon: "local_fire_department",
    badge: "HOT",
  },
  {
    id: "mystery",
    label: "Ăn gì?",
    path: "/mystery",
    icon: "casino",
    badge: "MỚI",
  },
  {
    id: "trip",
    label: "Lập Tour",
    path: "/trip",
    icon: "alt_route",
  },
  {
    id: "ai",
    label: "AI Gợi ý",
    path: "/ai",
    icon: "auto_awesome",
  },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around safe-area-pb">
      {bottomNavItems.map((item) => {
        const isActive = pathname === item.path || (item.path === "/trip" && pathname === "/trip-planner");
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all relative ${
              isActive
                ? "text-[#E84A27]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? "scale-110 font-bold" : ""
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              {item.badge && (
                <span className="absolute -top-1 -right-2.5 bg-red-500 text-white text-[8px] font-black px-1 py-0.2 rounded-full leading-tight animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-tight ${
                isActive ? "font-extrabold text-[#E84A27]" : "font-medium"
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#E84A27] mt-0.5" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
