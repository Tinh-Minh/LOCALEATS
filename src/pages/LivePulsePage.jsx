import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

// Danh sách các phòng Livestream ẩm thực trực tiếp
const initialStreams = [
  {
    id: "live-1",
    placeId: 1,
    placeName: "Phở Thìn Lò Đúc (Lê Duẩn, Q.1)",
    streamer: "Foodie Hưng Vũ",
    streamerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    badge: "Reviewer Chuyên Nghiệp",
    title: "Mục sở thị nồi nước lèo hầm xương 12 tiếng & Xào bò tái lăn chảo lửa bốc khói!",
    viewers: 2840,
    likes: 14500,
    tag: "NƯỚC LÈO HẦM NÓNG",
    videoBg: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    liveDeal: "Tặng quẩy giòn + Nước ngọt khi đọc mã 'LOCALEATS-PHO'",
    chatMessages: [
      { user: "Minh Trang", text: "Nước dùng có bị mặn không anh ơi?", time: "16:11" },
      { user: "Quốc Bảo", text: "Thịt bò tái xào nhìn tươi rói luôn á 😍", time: "16:11" },
      { user: "Thảo Vy", text: "Quán giờ này còn nhiều bàn không anh?", time: "16:12" },
      { user: "Đức Thịnh", text: "Đã lưu mã quẩy lát ghé thử liền!", time: "16:12" },
    ],
  },
  {
    id: "live-2",
    placeId: 2,
    placeName: "Bánh Mì Huỳnh Hoa (Lê Thị Riêng, Q.1)",
    streamer: "Vy Thổ Địa Sài Gòn",
    streamerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    badge: "Top Sáng Tạo",
    title: "Trực tiếp quết pate nửa gang tay vào ổ bánh mì ô môi huyền thoại Sài Gòn",
    viewers: 4120,
    likes: 32800,
    tag: "ĂN VẶT & STREET FOOD",
    videoBg: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=800&q=80",
    liveDeal: "Giảm 10.000đ/ổ khi xuất trình màn hình live",
    chatMessages: [
      { user: "Anh Tuấn", text: "Pate nhìn mềm mướt đã mắt ghê", time: "16:10" },
      { user: "Hà My", text: "Xếp hàng đông lắm không chị?", time: "16:11" },
      { user: "Văn Hậu", text: "1 ổ này 2 người ăn còn no nê luôn", time: "16:12" },
    ],
  },
  {
    id: "live-3",
    placeId: 3,
    placeName: "Ốc Oanh (Vĩnh Khánh, Q.4)",
    streamer: "Bảo Đêm Nhậu",
    streamerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
    badge: "Thổ Địa Quán Ốc",
    title: "Review trực tiếp chảo ốc hương sốt trứng muối sôi sùng sục vỉa hè Quận 4",
    viewers: 1980,
    likes: 9200,
    tag: "HẢI SẢN & BIA",
    videoBg: "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=800&q=80",
    liveDeal: "Tặng 1 phần bánh mì chấm sốt cho bàn từ 2 người",
    chatMessages: [
      { user: "Khánh Linh", text: "Sốt trứng muối béo ngậy chấm bánh mì đỉnh cao", time: "16:09" },
      { user: "Duy Mạnh", text: "Tối nay ra đây ngồi mát rượi nè", time: "16:11" },
    ],
  },
  {
    id: "live-4",
    placeId: 5,
    placeName: "Cơm Tấm Thuận Kiều (Thuận Kiều, Q.11)",
    streamer: "Bếp Nhà Khang",
    streamerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    badge: "Food Reviewer",
    title: "Khói sườn nướng than hoa lan tỏa khắp phố - Ăn thử đĩa sườn bì chả đặc biệt",
    viewers: 1450,
    likes: 7100,
    tag: "CƠM TRƯA & CƠM TỐI",
    videoBg: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&q=80",
    liveDeal: "Tặng 1 chén canh chua sườn non nóng hổi",
    chatMessages: [
      { user: "Hồng Nhung", text: "Miếng sườn to đùng che kín mặt cơm luôn", time: "16:08" },
      { user: "Thanh Tùng", text: "Nước mắm kẹo pha ngon lắm mn ơi", time: "16:10" },
    ],
  },
];

export default function LivePulsePage() {
  const navigate = useNavigate();
  const [streams, setStreams] = useState(initialStreams);
  const [selectedStream, setSelectedStream] = useState(initialStreams[0]);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialStreams[0].likes);
  const [hearts, setHearts] = useState([]);

  // Cập nhật lượt like khi đổi stream
  useEffect(() => {
    setLikeCount(selectedStream.likes);
    setIsLiked(false);
  }, [selectedStream]);

  // Gửi tin nhắn chat trong live
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      user: "Bạn (Viewer)",
      text: chatInput,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setSelectedStream((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg],
    }));
    setChatInput("");
  };

  // Hiệu ứng thả tim bay lên
  const handleLikeStream = () => {
    setLikeCount((prev) => prev + 1);
    setIsLiked(true);
    const newHeart = { id: Date.now(), x: Math.random() * 60 + 20 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const filteredStreams = streams.filter((s) => {
    if (activeTab === "hotpot") return s.tag.includes("NÓNG") || s.tag.includes("LÈO");
    if (activeTab === "street") return s.tag.includes("STREET") || s.tag.includes("ĂN VẶT");
    if (activeTab === "seafood") return s.tag.includes("HẢI SẢN");
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#121216] text-white page-enter pb-16">
      {/* Top Banner Live Telemetry */}
      <div className="bg-red-600/90 border-b border-red-500/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="text-[12px] font-black text-white tracking-wider uppercase">LOCALEATS LIVE CHANNEL</span>
          <span className="text-[12px] text-white/90 hidden sm:inline">
            • Reviewer đang quay trực tiếp tại quán ăn thực tế ở TP.HCM
          </span>
        </div>
        <span className="text-[11px] font-bold text-white bg-black/40 px-3 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-red-400">visibility</span>
          {streams.reduce((acc, curr) => acc + curr.viewers, 0).toLocaleString()} đang xem trực tiếp
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Main Livestream Viewer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Cột 1 & 2: Màn Hình Livestream Chính */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-black shadow-2xl border border-white/10 group">
              {/* Ảnh video mô phỏng live stream */}
              <img
                src={selectedStream.videoBg}
                alt="Livestream Video"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

              {/* Tag Trực Tiếp góc trên trái */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="bg-red-600 text-white font-black text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  TRỰC TIẾP
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white font-bold text-[11px] px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-red-400">group</span>
                  {selectedStream.viewers.toLocaleString()} người xem
                </span>
              </div>

              {/* Thông tin Quán Ăn được pin nổi trên màn hình */}
              <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md text-gray-900 rounded-2xl p-2.5 shadow-xl flex items-center gap-3 border border-orange-200">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#E84A27] text-2xl">restaurant</span>
                </div>
                <div className="min-w-0 pr-1">
                  <div className="text-[10px] font-bold text-[#E84A27] uppercase tracking-wide">Quán đang live</div>
                  <div className="font-extrabold text-[12px] truncate max-w-[140px] sm:max-w-[180px]">{selectedStream.placeName}</div>
                </div>
                <button
                  onClick={() => navigate('/', { state: { selectedPlaceId: selectedStream.placeId } })}
                  className="bg-[#E84A27] hover:bg-[#c93d1f] text-white px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">near_me</span>
                  Chỉ đường
                </button>
              </div>

              {/* Hiệu ứng tim bay khi bấm thả tim */}
              <div className="absolute bottom-24 right-6 pointer-events-none z-20">
                {hearts.map((h) => (
                  <span
                    key={h.id}
                    className="absolute text-3xl animate-slideInUp text-red-500 drop-shadow-md select-none"
                    style={{ left: `${h.x}px`, bottom: "0px", opacity: 0.9 }}
                  >
                    ❤️
                  </span>
                ))}
              </div>

              {/* Thông tin Streamer & Tiêu đề phía dưới màn hình */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <img
                      src={selectedStream.streamerAvatar}
                      alt={selectedStream.streamer}
                      className="w-10 h-10 rounded-full border-2 border-[#E84A27] object-cover shadow-lg"
                    />
                    <div>
                      <div className="font-extrabold text-[14px] flex items-center gap-1.5">
                        {selectedStream.streamer}
                        <span className="material-symbols-outlined text-blue-400 text-[16px]">verified</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium text-orange-200">
                          {selectedStream.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-300">Đang phát sóng trực tiếp tại bàn</div>
                    </div>
                  </div>
                  <h2 className="text-[15px] font-bold text-white drop-shadow-md line-clamp-2">
                    {selectedStream.title}
                  </h2>
                </div>

                {/* Nút Thả Tim & Chia sẻ */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleLikeStream}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] shadow-lg transition-all active:scale-90 ${
                      isLiked
                        ? "bg-red-600 text-white"
                        : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    {likeCount.toLocaleString()}
                  </button>
                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
                    title="Sao chép link"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Voucher độc quyền trong lúc Live */}
            <div className="mt-3 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="text-[11px] font-black text-orange-400 uppercase tracking-wide">Ưu đãi độc quyền trong luồng Live:</div>
                  <div className="text-[13px] font-bold text-white">{selectedStream.liveDeal}</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/', { state: { selectedPlaceId: selectedStream.placeId } })}
                className="bg-[#E84A27] hover:bg-[#c93d1f] text-white px-5 py-2 rounded-full text-[12px] font-bold shadow-lg shadow-[#E84A27]/30 whitespace-nowrap active:scale-95"
              >
                Nhận ưu đãi & Chỉ đường ngay
              </button>
            </div>
          </div>

          {/* Cột 3: Khung Chat Trực Tiếp Thời Gian Thực */}
          <div className="bg-[#1c1c24] rounded-3xl border border-white/10 flex flex-col h-[480px] lg:h-auto shadow-2xl overflow-hidden">
            {/* Header khung chat */}
            <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400 text-[18px]">chat</span>
                <span className="font-extrabold text-[13px]">Khung Chat Trực Tiếp</span>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Đang đồng bộ</span>
            </div>

            {/* Danh sách tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 styled-scrollbar">
              <div className="text-center my-2">
                <span className="bg-white/10 text-gray-400 text-[10px] px-3 py-1 rounded-full">
                  Chào mừng bạn đến với kênh Live ẩm thực LOCALEATS!
                </span>
              </div>

              {selectedStream.chatMessages.map((msg, index) => (
                <div key={index} className="flex flex-col text-[12px]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-orange-400">{msg.user}</span>
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-200 mt-0.5 leading-snug">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input gửi chat */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hỏi người live về món ăn, vị trí..."
                className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-[12px] text-white outline-none focus:border-[#E84A27] placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#E84A27] hover:bg-[#c93d1f] text-white flex items-center justify-center transition-all shrink-0 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Danh sách các phòng Live khác đang diễn ra */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="font-extrabold text-[18px] text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                Các Quán Đang Có Người Livestream Trực Tiếp
              </h3>
              <p className="text-[12px] text-gray-400">Xem trực tiếp món ăn và không khí quán trước khi quyết định ghé</p>
            </div>

            {/* Tabs danh mục */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "Tất cả Live" },
                { id: "hotpot", label: "Nồi lèo & Món nóng" },
                { id: "street", label: "Bánh mì & Ăn vặt" },
                { id: "seafood", label: "Ốc & Hải sản" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredStreams.map((s) => {
              const isSelected = selectedStream.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStream(s)}
                  className={`bg-[#1c1c24] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between ${
                    isSelected
                      ? "border-[#E84A27] ring-2 ring-[#E84A27]/40 shadow-xl shadow-[#E84A27]/20"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={s.videoBg}
                      alt={s.placeName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-2 left-2 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-red-400">group</span>
                      {s.viewers.toLocaleString()}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-[10px] font-black text-orange-300 uppercase truncate block">
                        {s.placeName}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={s.streamerAvatar}
                          alt={s.streamer}
                          className="w-5 h-5 rounded-full object-cover border border-orange-400"
                        />
                        <span className="text-[11px] font-bold text-gray-300 truncate">{s.streamer}</span>
                      </div>
                      <h4 className="text-[12px] font-bold text-white group-hover:text-[#E84A27] transition-colors line-clamp-2 leading-snug">
                        {s.title}
                      </h4>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                      <span>🏷️ {s.tag}</span>
                      <span className="text-orange-400 font-bold">Xem phòng live →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
