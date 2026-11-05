import { useState, useEffect, useMemo } from "react";

// Helper kiểm tra xem chuỗi có phải là emoji hay Material Symbol
function isEmojiString(str) {
  if (!str) return false;
  return /\p{Extended_Pictographic}/u.test(str);
}

// Helper xác định icon ẩm thực mặc định theo loại hình quán
function getFoodSymbol(place) {
  if (!place) return "restaurant";
  if (place.vip || place.sponsored) return "workspace_premium";

  const cat = (place.category || "").toLowerCase();
  const name = (place.name || "").toLowerCase();
  const spec = (place.specialty || "").toLowerCase();

  if (cat.includes("phở") || name.includes("phở") || cat.includes("hủ tiếu") || name.includes("hủ tiếu") || cat.includes("bún")) {
    return "ramen_dining";
  }
  if (cat.includes("bánh mì") || name.includes("bánh mì")) {
    return "bakery_dining";
  }
  if (cat.includes("hải sản") || cat.includes("ốc") || spec.includes("ốc") || spec.includes("tôm") || name.includes("ốc")) {
    return "set_meal";
  }
  if (cat.includes("cà phê") || cat.includes("coffee") || name.includes("cà phê")) {
    return "coffee";
  }
  if (cat.includes("trà sữa") || cat.includes("chè") || cat.includes("tráng miệng") || name.includes("chè")) {
    return "emoji_food_beverage";
  }
  if (cat.includes("nướng") || cat.includes("bbq") || name.includes("nướng")) {
    return "outdoor_grill";
  }
  if (cat.includes("cơm") || name.includes("cơm")) {
    return "rice_bowl";
  }
  if (cat.includes("lẩu") || name.includes("lẩu")) {
    return "soup_kitchen";
  }

  return "restaurant";
}

function formatReviewsCount(count) {
  if (!count) return "0";
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(".0", "")}k`;
  }
  return count.toString();
}

export default function FoodPin({ place, active, onClick, itineraryOrder, zoomLevel = 15.5 }) {
  const rating = Number(place.rating) || 4.0;
  const reviews = Number(place.reviews) || 0;
  const isVip = Boolean(place.vip || place.sponsored);
  const isInItinerary = itineraryOrder !== undefined && itineraryOrder !== null;

  // Lắng nghe cập nhật icon do chủ quán tự lựa chọn trong cài đặt
  const [customIconsVersion, setCustomIconsVersion] = useState(0);
  useEffect(() => {
    const handleIconChange = () => setCustomIconsVersion((v) => v + 1);
    window.addEventListener("localeats_icon_updated", handleIconChange);
    return () => window.removeEventListener("localeats_icon_updated", handleIconChange);
  }, []);

  // Lấy icon chủ quán tự chọn: ưu tiên icon trong cấu hình quán -> icon đã lưu -> icon phân loại tự động
  const chosenIcon = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("localeats_merchant_custom_icons") || "{}");
      if (saved[place.id]) return saved[place.id];
      // Nếu là quán được chọn trong dashboard chủ quán (quán id: 1 hoặc 2)
      if (place.id === 1 && saved["current"]) return saved["current"];
    } catch {
      // ignore
    }
    return place.customIcon || place.icon || getFoodSymbol(place);
  }, [place, customIconsVersion]);

  // Phân cấp chuẩn xác: Chỉ DUY NHẤT quán Top 1 thực sự (trendRank = 1) mới là Top 1 Hot
  const isTop1Hot = !isVip && (place.trendRank === 1 || place.id === 1);
  const isVeryHighRated = !isVip && !isTop1Hot && (rating >= 4.8 || reviews >= 4000);
  const isHighRated = !isVip && !isTop1Hot && !isVeryHighRated && (rating >= 4.6 || reviews >= 1800);

  // Mức độ chi tiết thích ứng theo mức Zoom bản đồ
  const isZoomFar = zoomLevel < 14.3;

  // 1. KÍCH THƯỚC ICON ĐƯỢC PHÓNG TO BỰ LÊN NỔI BẬT THEO YÊU CẦU NGƯỜI DÙNG
  const pinSize = useMemo(() => {
    if (isZoomFar && !active) {
      return {
        isMicro: true,
        wrapper: "w-[36px] h-[36px] sm:w-[42px] sm:h-[42px]",
        radius: 20,
        iconSize: "text-[20px] sm:text-[22px]",
        ratingSize: "text-[9px] sm:text-[10px]",
        dropShadow: "shadow-md",
      };
    }

    if (isVip || isTop1Hot || active) {
      return {
        isMicro: false,
        wrapper: "w-[62px] h-[62px] sm:w-[74px] sm:h-[74px]",
        radius: 29,
        // Icon to rõ chiếm trọn lõi tròn giọt nước
        iconSize: "text-2xl sm:text-3xl md:text-[34px]",
        ratingSize: "text-[8.5px] sm:text-[9.5px]",
        dropShadow: isVip
          ? "drop-shadow-[0_10px_20px_rgba(255,160,0,0.5)]"
          : "drop-shadow-[0_10px_20px_rgba(232,74,39,0.5)]",
      };
    }
    if (isVeryHighRated) {
      return {
        isMicro: false,
        wrapper: "w-[54px] h-[54px] sm:w-[64px] sm:h-[64px]",
        radius: 27,
        iconSize: "text-xl sm:text-2xl md:text-[30px]",
        ratingSize: "text-[8px] sm:text-[9px]",
        dropShadow: "drop-shadow-[0_8px_16px_rgba(255,159,28,0.45)]",
      };
    }
    if (isHighRated) {
      return {
        isMicro: false,
        wrapper: "w-[48px] h-[48px] sm:w-[56px] sm:h-[56px]",
        radius: 25,
        iconSize: "text-lg sm:text-xl md:text-[26px]",
        ratingSize: "text-[7.5px] sm:text-[8.5px]",
        dropShadow: "drop-shadow-[0_6px_12px_rgba(232,74,39,0.35)]",
      };
    }
    return {
      isMicro: false,
      wrapper: "w-[44px] h-[44px] sm:w-[50px] sm:h-[50px]",
      radius: 24,
      iconSize: "text-base sm:text-lg md:text-[24px]",
      ratingSize: "text-[7px] sm:text-[8px]",
      dropShadow: "drop-shadow-xs",
    };
  }, [isZoomFar, isVip, isTop1Hot, isVeryHighRated, isHighRated, active]);

  // 2. TÊN QUÁN: Phông chữ bình thường, dễ đọc, không bị méo dấu tiếng Việt
  const labelScale = useMemo(() => {
    if (active || zoomLevel >= 15.6) {
      // Zoom to (cận cảnh đường phố): Phông chữ chuẩn nét, đậm vừa phải (font-semibold)
      return {
        pillPad: "px-3 py-1 sm:px-3.5 sm:py-1.2",
        nameSize: "text-[12px] sm:text-[13px] font-semibold",
        reviewSize: "text-[10px] sm:text-[11px] font-medium",
        iconSize: "text-[12px] sm:text-[13px]",
        maxWidth: "max-w-[170px] sm:max-w-[220px]",
        showReviews: true,
      };
    }
    if (zoomLevel >= 14.5) {
      // Zoom vừa: Gọn gàng, thanh thoát
      return {
        pillPad: "px-2.5 py-0.8",
        nameSize: "text-[10.5px] sm:text-[11.5px] font-semibold",
        reviewSize: "text-[9px] sm:text-[10px] font-medium",
        iconSize: "text-[10px] sm:text-[11px]",
        maxWidth: "max-w-[125px] sm:max-w-[145px]",
        showReviews: false,
      };
    }
    // Zoom nhỏ: Thu nhỏ gọn
    return {
      pillPad: "px-2 py-0.5",
      nameSize: "text-[9px] sm:text-[10px] font-medium",
      reviewSize: "text-[8px] font-normal",
      iconSize: "text-[9px]",
      maxWidth: "max-w-[95px] sm:max-w-[105px]",
      showReviews: false,
    };
  }, [active, zoomLevel]);

  const gradId = `grad-teardrop-${place.id}`;

  // Kiểm soát hiển thị:
  // - Khi zoom to (>= 15.0) hoặc quán active / vip / top1 / lộ trình thì hiện
  // - Khi zoom nhỏ (< 14.5) thì các quán thường tự động ẩn tên (chỉ hiện ghim + icon), rê chuột vào mới hiện để không bị dính chùm!
  const shouldShowLabel = active || isTop1Hot || isVip || isInItinerary || (zoomLevel >= 15.6);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`relative flex flex-col items-center cursor-pointer select-none group transition-transform duration-200 antialiased ${
        active
          ? "scale-115 z-50"
          : isInItinerary
          ? "scale-105 z-40"
          : isTop1Hot || isVip
          ? "z-30 hover:scale-115 hover:z-50"
          : isVeryHighRated
          ? "z-25 hover:scale-110 hover:z-50"
          : "z-20 hover:scale-110 hover:z-50"
      }`}
    >
      {/* 1. HÀO QUANG ÁNH LỬA & KIM CƯƠNG VIP CHUẨN NGUYÊN BẢN STITCH */}
      {!isZoomFar && (
        <>
          {isVip ? (
            /* Luxury Gold Multilayer Sparkle Aura chuẩn Stitch */
            <>
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFA000] to-[#FF8C00] opacity-85 blur-lg animate-pulse pointer-events-none" />
              <div className="absolute -inset-3.5 rounded-full ring-2 ring-[#FFD700] animate-ping opacity-60 pointer-events-none" />
            </>
          ) : isTop1Hot ? (
            /* Warm Golden-Flame Aura chuẩn Stitch cho quán Top 1 / Đích đến */
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#FF5436] via-[#FF9F1C] to-[#E84A27] opacity-80 blur-lg animate-pulse pointer-events-none" />
          ) : isVeryHighRated ? (
            /* Flaming Halo chuẩn Stitch cho quán 4.8★ */
            <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-[#FF9F1C] via-[#E84A27] to-[#FF5436] opacity-70 blur-md animate-pulse pointer-events-none" />
          ) : isHighRated ? (
            /* Flame Glow chuẩn Stitch cho quán 4.7★ */
            <div className="absolute -inset-3.5 rounded-full bg-[#E84A27]/40 blur-md animate-pulse pointer-events-none" />
          ) : null}
        </>
      )}

      {/* 2. BANNER DANH HIỆU TOP 1 HOẶC VIP (CỐ ĐỊNH TRÊN ĐẦU, KHÔNG BOUNCE ĐỂ TRÁNH GIẬT PHÔNG CHỮ) */}
      {isTop1Hot && !isZoomFar && (
        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-[#E84A27] to-[#FF5436] text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-30 pointer-events-none border border-orange-200/50">
          <span className="material-symbols-outlined text-[11px] sm:text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <span>SIÊU HOT TUẦN NÀY #1</span>
        </div>
      )}
      {isVip && !isZoomFar && (
        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-[#FF9F1C] via-[#FFB800] to-[#E84A27] text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-30 pointer-events-none border border-amber-200/50">
          <span className="material-symbols-outlined text-[11px] sm:text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            crown
          </span>
          <span>TÀI TRỢ VIP {place.discount ? `• ${place.discount}` : ""}</span>
        </div>
      )}

      {/* 3. BẢNG TÊN QUÁN NẰM NGAY DƯỚI ICON CÓ KHOẢNG CÁCH THOÁNG (MT-2 / MT-2.5) TRÁNH DÍNH VÀO NHAU */}
      <div
        className={`absolute top-full mt-2 sm:mt-2.5 left-1/2 -translate-x-1/2 items-center justify-center pointer-events-none transition-all duration-200 ${
          shouldShowLabel ? "flex" : "hidden group-hover:flex"
        } ${active ? "z-50 scale-105" : "z-20 group-hover:z-50 group-hover:scale-105"}`}
      >
        <div
          className={`${labelScale.pillPad} rounded-full shadow-xl backdrop-blur-md flex items-center gap-1.5 border whitespace-nowrap ${labelScale.maxWidth} transition-all duration-200 ${
            active
              ? "bg-[#E84A27] text-white border-white/80 shadow-2xl ring-2 ring-orange-400"
              : isVip
              ? "bg-[#181B20]/95 text-white border-amber-400 shadow-xl shadow-black/30 ring-1 ring-amber-400/50"
              : isTop1Hot
              ? "bg-[#181B20]/95 text-white border-orange-500 shadow-xl shadow-black/30 ring-1 ring-orange-400/50"
              : isInItinerary
              ? "bg-[#181B20]/95 text-white border-cyan-400 shadow-xl shadow-black/30"
              : "bg-[#181B20]/95 text-white border-white/20 shadow-xl shadow-black/25"
          }`}
        >
          {isInItinerary ? (
            <span
              className={`px-1.5 py-0.2 rounded-full text-white font-bold text-[8.5px] sm:text-[9.5px] shrink-0 ${
                itineraryOrder === 1 ? "bg-[#E84A27]" : "bg-[#0891b2]"
              }`}
            >
              Trạm {itineraryOrder}
            </span>
          ) : isVip ? (
            <span
              className={`material-symbols-outlined ${labelScale.iconSize} text-amber-400 shrink-0`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crown
            </span>
          ) : isTop1Hot ? (
            <span className={`material-symbols-outlined ${labelScale.iconSize} text-[#FF5436] shrink-0`}>
              local_fire_department
            </span>
          ) : isVeryHighRated ? (
            <span className={`material-symbols-outlined ${labelScale.iconSize} text-amber-400 shrink-0`}>
              local_fire_department
            </span>
          ) : null}

          {/* Tên quán co giãn theo mức Zoom: zoom to thì hiện to, zoom nhỏ thì thu chữ lại */}
          <span
            className={`${labelScale.nameSize} truncate tracking-normal font-sans text-white`}
          >
            {place.name}
          </span>

          {labelScale.showReviews && (
            <span
              className={`${labelScale.reviewSize} shrink-0 font-sans ${
                active
                  ? "text-white/90"
                  : isVip || isTop1Hot || isVeryHighRated
                  ? "text-amber-300"
                  : "text-gray-300"
              }`}
            >
              {isVip && place.discount ? place.discount : `(${formatReviewsCount(reviews)})`}
            </span>
          )}
        </div>
      </div>

      {/* 4. THÂN GHIM BẢN ĐỒ VỚI ICON ĐƯỢC PHÓNG TO BỰ NỔI BẬT */}
      {pinSize.isMicro ? (
        /* KHI ZOOM XA: HIỂN THỊ CHẤM GHIM TRÒN VỚI ICON ẨM THỰC RÕ RÀNG */
        <div
          className={`${pinSize.wrapper} rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${
            active
              ? "bg-[#E84A27] text-white ring-3 ring-orange-300 scale-125 z-40"
              : isVip
              ? "bg-gradient-to-br from-[#FFE066] via-[#FFB703] to-[#FB8500] text-[#3E1B00] ring-1.5 ring-amber-400"
              : isTop1Hot
              ? "bg-gradient-to-br from-[#FF5436] to-[#C23616] text-white ring-1.5 ring-red-400"
              : isVeryHighRated
              ? "bg-gradient-to-br from-[#FFB703] to-[#E84A27] text-white"
              : "bg-[#DE3618] text-white border-white"
          }`}
          title={`${place.name} • ${place.rating}★ (${formatReviewsCount(reviews)} đánh giá)`}
        >
          {isEmojiString(chosenIcon) ? (
            <span className={`${pinSize.iconSize} leading-none select-none`}>{chosenIcon}</span>
          ) : isVip ? (
            <span
              className="material-symbols-outlined text-sm sm:text-base text-[#3E1B00]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crown
            </span>
          ) : (
            <span
              className={`material-symbols-outlined ${pinSize.iconSize} leading-none`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {chosenIcon}
            </span>
          )}
        </div>
      ) : (
        /* KHI ZOOM VỪA HOẶC CẬN CẢNH: HIỂN THỊ HÌNH GIỌT NƯỚC SVG CHUẨN STITCH */
        <div className={`relative ${pinSize.wrapper} ${pinSize.dropShadow} transition-transform duration-200`}>
          <svg className="w-full h-full filter drop-shadow-sm" viewBox="0 0 100 100">
            <defs>
              {isVip ? (
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE066" />
                  <stop offset="50%" stopColor="#FFB703" />
                  <stop offset="100%" stopColor="#FB8500" />
                </linearGradient>
              ) : isTop1Hot ? (
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5436" />
                  <stop offset="60%" stopColor="#E84A27" />
                  <stop offset="100%" stopColor="#C23616" />
                </linearGradient>
              ) : isVeryHighRated ? (
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB703" />
                  <stop offset="50%" stopColor="#FF9F1C" />
                  <stop offset="100%" stopColor="#E84A27" />
                </linearGradient>
              ) : isHighRated ? (
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5436" />
                  <stop offset="100%" stopColor="#D03B1E" />
                </linearGradient>
              ) : (
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB8500" />
                  <stop offset="100%" stopColor="#DE3618" />
                </linearGradient>
              )}
            </defs>

            {/* Mũi nhọn giọt nước chúc xuống điểm mốc tọa độ chính xác */}
            <path
              d="M 50,98 C 50,98 88,64 88,44 C 88,23 71,6 50,6 C 29,6 12,23 12,44 C 12,64 50,98 50,98 Z"
              fill={`url(#${gradId})`}
              stroke={isVip ? "#FFFDF0" : "#FFFFFF"}
              strokeWidth={isVip ? 3.5 : isTop1Hot ? 3 : 2.5}
            />
            {/* Lõi hình tròn màu trắng bên trong giọt nước */}
            <circle cx="50" cy="44" fill="#FFFFFF" r={pinSize.radius} />
          </svg>

          {/* ICON ĐƯỢC PHÓNG TO BỰ LÊN ĐẶT Ở TRUNG TÂM VÒNG TRÒN TRẮNG */}
          <div className="absolute top-1 sm:top-1.5 inset-x-0 flex flex-col items-center justify-center pointer-events-none">
            {isEmojiString(chosenIcon) ? (
              <span className={`${pinSize.iconSize} leading-none select-none drop-shadow-xs`}>
                {chosenIcon}
              </span>
            ) : isVip ? (
              <span
                className={`material-symbols-outlined text-[#F58A07] ${pinSize.iconSize} leading-none`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            ) : isTop1Hot && chosenIcon === "local_fire_department" ? (
              <span
                className={`material-symbols-outlined text-[#E84A27] ${pinSize.iconSize} leading-none animate-pulse`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            ) : (
              <span
                className={`material-symbols-outlined ${pinSize.iconSize} leading-none ${
                  isVeryHighRated
                    ? "text-[#F58A07]"
                    : isHighRated
                    ? "text-[#E84A27]"
                    : "text-[#E84A27]"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {chosenIcon}
              </span>
            )}

            {/* Điểm đánh giá (Rating ★) nhỏ nhắn nằm sát dưới icon */}
            <span
              className={`${pinSize.ratingSize} font-extrabold text-[#231812] -mt-0.5 flex items-center leading-none tracking-tight`}
            >
              {rating}
              <span className="text-amber-500 ml-0.5 text-[7.5px] sm:text-[8.5px]">★</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
