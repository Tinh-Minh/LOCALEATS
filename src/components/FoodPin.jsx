export default function FoodPin({ place, active, onClick, itineraryOrder }) {
  const rating = Number(place.rating) || 4.0;

  // Tính toán kích thước pin dựa theo số sao (Rating từ ~4.0 đến 5.0)
  // Rating 4.8 - 5.0: size lớn (w-16 h-16)
  // Rating 4.5 - 4.7: size vừa (w-14 h-14)
  // Rating < 4.5: size tiêu chuẩn (w-12 h-12)
  const isTopRated = rating >= 4.8;
  const isHighRated = rating >= 4.5;
  const isInItinerary = itineraryOrder !== undefined && itineraryOrder !== null;

  const sizeClasses = isTopRated
    ? "w-16 h-16"
    : isHighRated
    ? "w-14 h-14"
    : "w-12 h-12";

  const iconSizeClasses = isTopRated
    ? "text-2xl"
    : isHighRated
    ? "text-xl"
    : "text-lg";

  const ratingTextClasses = isTopRated
    ? "text-[10px] font-black"
    : "text-[9px] font-extrabold";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      className={`relative flex flex-col items-center transition-all duration-300 hover:scale-110 ${
        active ? "scale-125 z-30" : isInItinerary ? "scale-110 z-25" : isTopRated ? "z-20" : "z-10"
      }`}
    >
      {/* Huy hiệu thứ tự trạm dừng (Chặng 1, 2, 3...) đặt gọn gàng ở đỉnh trên cùng của Pin */}
      {isInItinerary && (
        <span
          className={`absolute -top-3 z-30 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black text-white shadow-lg border-2 border-white animate-bounce ${
            itineraryOrder === 1
              ? "bg-[#E84A27] ring-2 ring-orange-400"
              : "bg-[#06b6d4] ring-2 ring-cyan-400"
          }`}
        >
          <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px]">
            {itineraryOrder}
          </span>
          <span>Trạm {itineraryOrder}</span>
        </span>
      )}

      {/* Hào quang phát sáng (Aura Glow) theo mức sao hoặc chặng lộ trình */}
      {isInItinerary ? (
        <>
          <span
            className={`absolute -inset-3 rounded-full opacity-60 blur-md animate-pulse ${
              itineraryOrder === 1
                ? "bg-gradient-to-r from-orange-500 to-[#E84A27]"
                : "bg-gradient-to-r from-cyan-400 to-blue-500"
            }`}
          />
          <span
            className={`absolute -inset-4 rounded-full border-2 animate-liveRing ${
              itineraryOrder === 1 ? "border-orange-500/60" : "border-cyan-400/60"
            }`}
          />
        </>
      ) : isTopRated ? (
        <>
          {/* Hào quang cực mạnh cho quán đỉnh cao (>= 4.8 sao): tỏa rộng, màu cam rực rỡ và đập nhịp */}
          <span className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-[#E84A27] opacity-60 blur-lg animate-pulse" />
          <span className="absolute -inset-5 rounded-full border-2 border-orange-500/50 animate-liveRing" />
          <span className="absolute -inset-2 rounded-full bg-amber-300/40 blur-sm" />
        </>
      ) : isHighRated ? (
        <>
          {/* Hào quang mức khá - cao (4.5 - 4.7 sao): sáng dịu dàng, ấm áp */}
          <span className="absolute -inset-2.5 rounded-full bg-orange-400/35 blur-md animate-pulse" />
          <span className="absolute -inset-3.5 rounded-full border border-orange-400/30 animate-liveRing" />
        </>
      ) : (
        <>
          {/* Quán bình thường (< 4.5 sao): hào quang mờ nhẹ viền */}
          <span className="absolute -inset-1 rounded-full bg-orange-300/20 blur-sm" />
        </>
      )}

      {/* Thân tròn của Pin */}
      <span
        className={`relative ${sizeClasses} rounded-full bg-white border-[3.5px] shadow-lg flex flex-col items-center justify-center transition-all duration-300 marker-bounce ${
          active
            ? "border-[#E84A27] glow-primary-lg shadow-2xl ring-4 ring-orange-400/40"
            : isInItinerary
            ? itineraryOrder === 1
              ? "border-[#E84A27] shadow-orange-500/40 shadow-xl"
              : "border-[#06b6d4] shadow-cyan-500/40 shadow-xl"
            : "border-[#E84A27] hover:shadow-xl"
        }`}
      >
        <span
          className={`material-symbols-outlined ${
            isInItinerary && itineraryOrder !== 1 ? "text-[#0891b2]" : "text-[#E84A27]"
          } ${iconSizeClasses}`}
        >
          restaurant
        </span>
        <span className={`${ratingTextClasses} text-gray-800 -mt-0.5 flex items-center gap-0.5`}>
          {place.rating} <span className="text-amber-500 text-[11px] leading-none">★</span>
        </span>
      </span>

      {/* Tên quán ăn - Rõ ràng, không bị chồng đè */}
      <span
        className={`relative mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap transition-all duration-300 border ${
          active
            ? "bg-[#E84A27] text-white border-[#E84A27] shadow-md shadow-[#E84A27]/30 scale-105"
            : isInItinerary
            ? itineraryOrder === 1
              ? "bg-white text-[#E84A27] border-orange-300"
              : "bg-white text-[#0891b2] border-cyan-300"
            : isTopRated
            ? "bg-white text-gray-900 border-orange-200/80"
            : "bg-white/95 text-gray-800 border-gray-100 backdrop-blur-sm"
        }`}
      >
        {place.name}
      </span>
    </button>
  );
}
