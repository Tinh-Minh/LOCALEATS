export default function FoodPin({ place, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`relative flex flex-col items-center transition-all duration-300 hover:scale-110 ${active ? "scale-125 z-20" : "z-10"}`}>
      {place.hot && (
        <>
          <span className="absolute -inset-3 rounded-full bg-orange-400/40 blur-md animate-pulse" />
          <span className="absolute -inset-4 rounded-full border-2 border-[#E84A27]/30 animate-liveRing" />
        </>
      )}
      <span className={`relative w-14 h-14 rounded-full bg-white border-4 border-[#E84A27] shadow-lg flex flex-col items-center justify-center transition-all duration-300 marker-bounce ${
        active ? "glow-primary shadow-xl" : "hover:shadow-xl"
      }`}>
        <span className="material-symbols-outlined text-[#E84A27] text-xl">restaurant</span>
        <span className="text-[9px] font-extrabold text-gray-800 -mt-0.5">{place.rating} ★</span>
      </span>
      <span className={`relative mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow whitespace-nowrap transition-all duration-300 ${
        active
          ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/30"
          : "bg-white/95 text-gray-800 backdrop-blur-sm"
      }`}>
        {place.name}
      </span>
    </button>
  );
}
