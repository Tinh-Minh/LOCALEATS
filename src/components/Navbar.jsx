import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/places";

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-14 flex items-center px-4 gap-3">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 min-w-fit">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E84A27] to-[#FF9F1C] flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-white text-[16px]">location_on</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-[13px] text-[#E84A27] tracking-wider">LOCALEATS</span>
          <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap hidden sm:block">Bản đồ Ẩm thực & Chỉ đường Khám phá</span>
        </div>
        <span className="ml-1 bg-[#E84A27] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
      </Link>

      {/* Search bar */}
      <div className="flex-1 max-w-md mx-2">
        <div className="flex items-center bg-gray-100 rounded-full px-3 h-9 gap-2">
          <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
          <input
            className="bg-transparent flex-1 text-sm outline-none placeholder-gray-400"
            placeholder="Tìm quán ăn, món ăn..."
          />
          <span className="material-symbols-outlined text-gray-400 text-[18px] cursor-pointer hover:text-[#E84A27] transition-colors">mic</span>
        </div>
      </div>

      {/* Chi đường button */}
      <button className="flex items-center gap-1.5 bg-[#E84A27] text-white rounded-full px-4 h-9 text-[12px] font-bold shadow-lg shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
        <span className="material-symbols-outlined text-[16px]">directions</span>
        Chỉ đường
      </button>

      {/* Nav links */}
      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`px-3 h-9 rounded-full text-[12px] font-semibold transition-all flex items-center whitespace-nowrap ${
              pathname === item.path
                ? "bg-[#E84A27] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-2 ml-auto lg:ml-2">
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors relative">
          <span className="material-symbols-outlined text-gray-600 text-[20px]">bookmark</span>
        </button>
        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center relative">
          <span className="material-symbols-outlined text-gray-600 text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E84A27] rounded-full border-2 border-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
