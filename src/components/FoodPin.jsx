import fireImage from "/fire-icon.png";

// Helper xác định icon ẩm thực theo chủ đề quán bán (ví dụ: hải sản/tôm mực, phở, bánh mì...)
function getFoodThematicIcon(place) {
  if (!place) return { type: "emoji", value: "🍽️" };
  if (place.icon) return { type: "emoji", value: place.icon };

  const cat = (place.category || "").toLowerCase();
  const name = (place.name || "").toLowerCase();
  const spec = (place.specialty || "").toLowerCase();

  // Quán bán hải sản, ốc, tôm, mực
  if (cat.includes("hải sản") || cat.includes("ốc") || spec.includes("ốc") || spec.includes("tôm") || spec.includes("mực") || name.includes("ốc")) {
    return { type: "emoji", value: "🦐" }; // Tôm/Hải sản
  }
  // Bánh mì
  if (cat.includes("bánh mì") || name.includes("bánh mì")) {
    return { type: "emoji", value: "🥖" };
  }
  // Phở / Hủ tiếu
  if (cat.includes("phở") || name.includes("phở")) {
    return { type: "emoji", value: "🍜" };
  }
  if (cat.includes("hủ tiếu") || name.includes("hủ tiếu")) {
    return { type: "emoji", value: "🍜" };
  }
  // Cơm / Cơm tấm
  if (cat.includes("cơm") || name.includes("cơm")) {
    return { type: "emoji", value: "🍚" };
  }
  // Bún bò
  if (cat.includes("bún bò") || name.includes("bún bò")) {
    return { type: "emoji", value: "🍲" };
  }
  // Bún đậu mắm tôm
  if (cat.includes("bún đậu") || name.includes("bún đậu")) {
    return { type: "emoji", value: "🥢" };
  }
  // Lẩu các loại
  if (cat.includes("lẩu") || name.includes("lẩu")) {
    return { type: "emoji", value: "🥘" };
  }
  // Đồ nướng / BBQ
  if (cat.includes("nướng") || name.includes("nướng")) {
    return { type: "emoji", value: "🥩" };
  }
  // Gỏi cuốn
  if (cat.includes("gỏi cuốn") || name.includes("gỏi cuốn")) {
    return { type: "emoji", value: "🥗" };
  }
  // Bánh xèo
  if (cat.includes("bánh xèo") || name.includes("bánh xèo")) {
    return { type: "emoji", value: "🥞" };
  }
  // Cháo lòng
  if (cat.includes("cháo") || name.includes("cháo")) {
    return { type: "emoji", value: "🥣" };
  }
  // Xôi
  if (cat.includes("xôi") || name.includes("xôi")) {
    return { type: "emoji", value: "🍙" };
  }
  // Trà sữa / Nước
  if (cat.includes("trà sữa") || name.includes("trà sữa") || cat.includes("cà phê")) {
    return { type: "emoji", value: "🧋" };
  }
  // Tráng miệng / Chè
  if (cat.includes("tráng miệng") || cat.includes("chè") || name.includes("chè")) {
    return { type: "emoji", value: "🍧" };
  }

  return { type: "material", value: "restaurant" };
}

export default function FoodPin({ place, active, onClick, itineraryOrder }) {
  const rating = Number(place.rating) || 4.0;

  const isTopRated = rating >= 4.8;
  const isHighRated = rating >= 4.5;
  const isInItinerary = itineraryOrder !== undefined && itineraryOrder !== null;
  const hasFireFlame = isTopRated || place.hot;

  const sizeClasses = isTopRated
    ? "w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16"
    : isHighRated
    ? "w-7 h-7 sm:w-12 sm:h-12 md:w-14 md:h-14"
    : "w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12";

  const iconSizeClasses = isTopRated
    ? "text-[14px] sm:text-[22px] md:text-[26px]"
    : isHighRated
    ? "text-[12px] sm:text-[19px] md:text-[22px]"
    : "text-[11px] sm:text-[16px] md:text-[18px]";

  const ratingTextClasses = isTopRated
    ? "text-[7.5px] sm:text-[11px] md:text-[12px] font-black"
    : "text-[7px] sm:text-[10px] md:text-[11px] font-extrabold";

  const foodIcon = getFoodThematicIcon(place);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`relative flex flex-col items-center transition-all duration-300 hover:scale-110 ${
        active ? "scale-110 sm:scale-120 z-30" : isInItinerary ? "scale-105 z-25" : isTopRated ? "z-20" : "z-10"
      }`}
    >
      {/* Huy hiệu thứ tự trạm dừng (Chặng 1, 2, 3...) */}
      {isInItinerary && (
        <span
          className={`absolute -top-3 sm:-top-3.5 z-30 flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-black text-white shadow-md border border-white animate-bounce ${
            itineraryOrder === 1
              ? "bg-[#E84A27] ring-1 ring-orange-300"
              : "bg-[#06b6d4] ring-1 ring-cyan-300"
          }`}
        >
          <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[7px] sm:text-[9px]">
            {itineraryOrder}
          </span>
          <span className="hidden xs:inline">Trạm {itineraryOrder}</span>
        </span>
      )}

      {/* Cấu trúc ngọn lửa bùng cháy chuẩn bao bọc lấy icon quán - ĐƯỢC XÍCH LÊN PHÍA TRÊN */}
      <div className="relative flex items-center justify-center">
        {hasFireFlame && (
          <div className="absolute -inset-3.5 sm:-inset-7 md:-inset-8 -translate-y-2 sm:-translate-y-3 md:-translate-y-4 flex items-center justify-center pointer-events-none animate-flame-soft">
            <img
              src={fireImage}
              alt="fire"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(232,74,39,0.3)] opacity-90 select-none"
            />
          </div>
        )}

        {/* Icon quán nằm lọt lòng gọn gàng bên trong ngọn lửa */}
        <span
          className={`relative z-10 ${sizeClasses} rounded-full bg-white flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
            active
              ? "border-2 sm:border-3 border-[#E84A27] ring-2 sm:ring-4 ring-orange-300/60 shadow-lg"
              : isInItinerary
              ? itineraryOrder === 1
                ? "border-2 sm:border-3 border-[#E84A27] shadow-orange-500/25"
                : "border-2 sm:border-3 border-[#06b6d4] shadow-cyan-500/25"
              : "border-[1.5px] sm:border-2 border-orange-200/90 hover:border-[#E84A27]"
          }`}
        >
          {foodIcon.type === "emoji" ? (
            <span className={`leading-none select-none ${iconSizeClasses}`}>
              {foodIcon.value}
            </span>
          ) : (
            <span
              className={`material-symbols-outlined leading-none ${
                isInItinerary && itineraryOrder !== 1 ? "text-[#0891b2]" : "text-[#E84A27]"
              } ${iconSizeClasses}`}
            >
              {foodIcon.value}
            </span>
          )}
          <span className={`${ratingTextClasses} text-gray-800 -mt-0.5 flex items-center gap-0.5 leading-none`}>
            {place.rating} <span className="text-amber-500 text-[7px] sm:text-[9.5px] leading-none">★</span>
          </span>
        </span>
      </div>

      {/* Tên quán ăn */}
      <span
        className={`relative mt-0.5 px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full text-[8.5px] sm:text-[11px] font-bold shadow-sm whitespace-nowrap transition-all duration-300 border max-w-[85px] sm:max-w-[140px] truncate ${
          active
            ? "bg-[#E84A27] text-white border-[#E84A27] shadow-md scale-105 inline-block"
            : isInItinerary
            ? "bg-white text-[#E84A27] border-orange-200 hidden sm:inline-block"
            : "bg-white/95 text-gray-800 border-gray-100 backdrop-blur-sm hidden sm:inline-block"
        }`}
      >
        {place.name}
      </span>
    </button>
  );
}
