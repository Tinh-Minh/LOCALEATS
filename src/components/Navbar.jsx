import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems, places } from "../data/places";

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lọc gợi ý quán ăn theo từ khóa
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  // Xử lý khi chọn quán từ gợi ý tìm kiếm
  const handleSelectPlaceSuggestion = (place) => {
    setShowSuggestions(false);
    setSearchQuery(place.name);
    navigate("/", { state: { selectedPlaceId: place.id, autoFly: true } });
  };

  // Submit form tìm kiếm (nhấn Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    navigate("/", { state: { searchQuery: searchQuery.trim() } });
  };

  // Tìm kiếm bằng giọng nói (Speech Recognition API)
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setShowSuggestions(true);
          navigate("/", { state: { searchQuery: transcript } });
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm h-16 flex items-center px-3 sm:px-4 gap-2 sm:gap-3">
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 active:scale-95 transition-all"
          title="Mở menu danh mục"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 min-w-fit group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E84A27] to-[#FF9F1C] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-[#E84A27]/30 transition-all group-hover:scale-105">
            <span className="material-symbols-outlined text-white text-[16px]">location_on</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-[13px] text-[#E84A27] tracking-wider gradient-text-premium">LOCALEATS</span>
            <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap hidden sm:block">Bản đồ Ẩm thực & Dẫn đường</span>
          </div>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-1 sm:mx-2 relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100/90 backdrop-blur-sm rounded-full px-2.5 sm:px-3.5 h-9 gap-1.5 sm:gap-2 border border-transparent focus-within:border-[#E84A27]/50 focus-within:bg-white focus-within:shadow-md transition-all">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="bg-transparent flex-1 text-xs outline-none placeholder-gray-400 min-w-0"
              placeholder="Tìm quán, món ngon..."
            />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setShowSuggestions(false);
              }}
              className="w-5 h-5 rounded-full hover:bg-gray-200 text-gray-400 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleVoiceSearch}
            title={isListening ? "Đang lắng nghe... bấm để dừng" : "Tìm kiếm bằng giọng nói"}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-gray-400 hover:text-[#E84A27] hover:scale-110"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isListening ? "mic" : "mic"}
            </span>
          </button>
        </form>

        {/* Dropdown Gợi ý tìm kiếm */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute top-11 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-scaleIn max-h-72 overflow-y-auto styled-scrollbar">
            <div className="px-3.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Kết quả tìm thấy ({searchSuggestions.length})
            </div>
            {searchSuggestions.map((place) => (
              <div
                key={place.id}
                onClick={() => handleSelectPlaceSuggestion(place)}
                className="flex items-center gap-3 px-3.5 py-2 hover:bg-orange-50/70 cursor-pointer transition-colors group"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-9 h-9 rounded-lg object-cover shrink-0 border border-gray-100"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-extrabold text-gray-900 group-hover:text-[#E84A27] truncate transition-colors">
                    {place.name}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {place.category} • ⭐ {place.rating} • {place.address}
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-[#E84A27] text-sm shrink-0">
                  near_me
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chỉ đường button */}
      <button
        onClick={() => navigate("/", { state: { triggerDirections: true } })}
        className="flex items-center gap-1 sm:gap-1.5 bg-[#E84A27] text-white rounded-full px-2.5 sm:px-4 h-9 text-[11px] sm:text-[12px] font-bold shadow-md sm:shadow-lg shadow-[#E84A27]/30 hover:bg-[#c93d1f] transition-all hover:scale-105 active:scale-95 whitespace-nowrap btn-press glow-primary-hover shrink-0"
      >
        <span className="material-symbols-outlined text-[15px] sm:text-[16px]">directions</span>
        <span className="hidden xs:inline">Chỉ đường</span>
      </button>

      {/* Desktop Nav links */}
      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item, i) => (
          <Link
            key={item.id}
            to={item.path}
            className={`px-3 h-9 rounded-full text-[12px] font-semibold transition-all flex items-center whitespace-nowrap ${
              pathname === item.path
                ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25 glow-primary"
                : "text-gray-700 hover:bg-orange-50 hover:text-[#E84A27]"
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto lg:ml-2 shrink-0">
        <button
          onClick={() => navigate("/saved")}
          className="hidden sm:flex w-9 h-9 rounded-full hover:bg-gray-100 items-center justify-center transition-all relative hover:scale-110"
          title="Đã lưu"
        >
          <span className="material-symbols-outlined text-gray-600 text-[20px]">bookmark</span>
        </button>
        <button className="hidden sm:flex w-9 h-9 rounded-full hover:bg-gray-100 items-center justify-center relative hover:scale-110 transition-all" title="Thông báo">
          <span className="material-symbols-outlined text-gray-600 text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E84A27] rounded-full border-2 border-white live-dot"></span>
        </button>
        <div
          onClick={() => navigate("/vip")}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-all overflow-hidden border border-orange-200 shadow-sm"
          title="Tài khoản VIP"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>

    {/* Mobile Drawer Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-50 md:hidden flex animate-fadeIn">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInLeft overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#FAF4EE] to-orange-50 border-b border-[#F2EAE1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E84A27] flex items-center justify-center text-white font-black text-sm shadow-md">
                <span className="material-symbols-outlined text-[18px]">restaurant</span>
              </div>
              <div>
                <h3 className="font-extrabold text-[14px] text-gray-900 leading-tight">LOCALEATS</h3>
                <p className="text-[10px] text-gray-500">Khám phá & Dẫn đường</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-200/80 flex items-center justify-center text-gray-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Drawer Menu Items */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5 styled-scrollbar">
            {[
              { id: "map", label: "Quanh đây & Bản đồ", path: "/", icon: "explore" },
              { id: "mystery", label: "Hôm Nay Ăn Gì? (Quay số)", path: "/mystery", icon: "casino", badge: "MỚI" },
              { id: "hot", label: "Đang HOT Bùng Nổ", path: "/hotlist", icon: "local_fire_department", badge: "HOT" },
              { id: "vip", label: "Ưu đãi Đối tác VIP", path: "/vip", icon: "workspace_premium", badge: "VIP" },
              { id: "trip", label: "Kế hoạch Food Tour", path: "/trip", icon: "alt_route", badge: "MỚI" },
              { id: "ai", label: "AI Gợi ý Món ăn", path: "/ai", icon: "auto_awesome", badge: "SMART" },
              { id: "review", label: "Góc Review Foodie", path: "/review", icon: "rate_review" },
              { id: "saved", label: "Bộ sưu tập đã lưu", path: "/saved", icon: "bookmark" },
              { id: "live", label: "Livestream Quán Live", path: "/live", icon: "videocam", badge: "LIVE" },
              { id: "portal", label: "Cổng Quản Trị & Đối Tác", path: "/portal", icon: "key", badge: "PORTAL" },
            ].map((item) => {
              const active = pathname === item.path || (item.path === "/trip" && pathname === "/trip-planner");
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    active
                      ? "bg-[#E84A27] text-white font-bold shadow-md shadow-[#E84A27]/25"
                      : "text-gray-700 hover:bg-orange-50/80 active:bg-orange-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${active ? "text-white" : "text-[#E84A27]"}`}>
                      {item.icon}
                    </span>
                    <span className="text-[13px]">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${
                        active
                          ? "bg-white text-[#E84A27]"
                          : "bg-red-100 text-red-600 border border-red-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-500 font-medium">Phiên bản Web Mobile v2.0</p>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
