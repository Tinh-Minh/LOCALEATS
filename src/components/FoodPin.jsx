export default function FoodPin({ place, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`relative flex flex-col items-center transition-transform hover:scale-110 ${active ? "scale-125 z-20" : "z-10"}`}>
      {place.hot && (
        <span className="absolute -inset-3 rounded-full bg-primary/40 blur-md animate-pulse" />
      )}
      <span className="relative w-14 h-14 rounded-full bg-white border-4 border-primary shadow-lg flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-primary text-xl">restaurant</span>
        <span className="text-[9px] font-extrabold text-on-surface -mt-0.5">{place.rating} ★</span>
      </span>
      <span className="relative mt-1 bg-white/95 px-2 py-0.5 rounded-full text-label-sm shadow whitespace-nowrap">
        {place.name}
      </span>
    </button>
  );
}