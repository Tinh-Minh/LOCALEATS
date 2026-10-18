import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { places } from "../data/places";

// Dữ liệu đánh giá thực tế từ cộng đồng Foodie
const initialReviews = [
  {
    id: 1,
    placeId: 1,
    placeName: "Phở Thìn Lò Đúc",
    dishName: "Phở Bò Tái Lăn Sốt Vang",
    author: "Hoàng Minh (Food Reviewer)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    rating: 5,
    date: "Hôm nay, 11:30",
    verifiedVisit: true,
    billAmount: "85.000đ",
    title: "Nước dùng béo ngậy xào lăn thơm nức mũi, chuẩn vị phở Hà Nội!",
    content:
      "Thịt bò được xào lăn trực tiếp trên lửa lớn trước khi chan nước dùng, hành lá thái phủ đầy ắp bát. Nước dùng hầm xương ngọt sâu, thêm quẩy giòn và chút dấm tỏi ớt cay là đúng điệu. Quán đông nhưng phục vụ ra đồ nhanh.",
    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80",
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80",
    ],
    tags: ["Thơm mùi chảo lửa", "Nhiều hành lá", "Quẩy giòn rụm"],
    likes: 142,
    comments: 18,
    badge: "Food Reviewer Uy Tín",
  },
  {
    id: 2,
    placeId: 2,
    placeName: "Bánh Mì Huỳnh Hoa",
    dishName: "Bánh Mì Pate Trứng Đặc Biệt",
    author: "Linh Đan (Thổ Địa Sài Gòn)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    date: "Hôm qua, 18:45",
    verifiedVisit: true,
    billAmount: "68.000đ",
    title: "Ổ bánh mì ngập tràn pate và chả lụa, ăn một ổ là no tới chiều",
    content:
      "Một ổ bánh mì nặng tay xấp xỉ nửa ký, lớp pate béo ngậy quết dày, bơ vàng óng và các loại chả, giò thủ, chà bông phủ kín. Đồ chua dưa leo được để riêng tránh làm ỉu bánh. Giá hơi nhỉnh nhưng chất lượng quá tương xứng.",
    images: [
      "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=500&q=80",
    ],
    tags: ["Pate béo ngậy", "Đầy đặn no lâu", "Đồ chua riêng"],
    likes: 219,
    comments: 34,
    badge: "Top Contributor",
  },
  {
    id: 3,
    placeId: 3,
    placeName: "Ốc Oanh",
    dishName: "Ốc Hương Nướng Muối Ớt & Càng Ghẹ",
    author: "Tuấn Vũ (Ăn Đêm Sài Thành)",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
    rating: 4,
    date: "2 ngày trước",
    verifiedVisit: true,
    billAmount: "240.000đ",
    title: "Ốc tươi roi rói, sốt mỡ hành và muối ớt đậm đà đúng gu nhậu",
    content:
      "Nước chấm mắm tắc và muối tiêu chanh ở đây pha rất đỉnh. Ốc hương con nào con nấy to đều, giòn sần sật. Buổi tối ngồi vỉa hè Vĩnh Khánh gió mát, không khí náo nhiệt. Trừ điểm nhỏ là đông quá nên phải chờ nướng tầm 15 phút.",
    images: [
      "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=500&q=80",
    ],
    tags: ["Hải sản tươi sống", "Nước chấm đỉnh", "Không khí sôi động"],
    likes: 98,
    comments: 12,
    badge: "Local Guide Lv.5",
  },
  {
    id: 4,
    placeId: 5,
    placeName: "Cơm Tấm Thuận Kiều",
    dishName: "Cơm Tấm Sườn Cốt Lết Nướng Than",
    author: "Thu Trang (Văn Phòng Q.1)",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    date: "3 ngày trước",
    verifiedVisit: true,
    billAmount: "65.000đ",
    title: "Miếng sườn dày ướp mật ong nướng xém cạnh thơm phức",
    content:
      "Hạt cơm tấm tơi xốp, bì trộn thính thơm thoang thoảng, chả trứng hấp mềm không bị khô. Nước mắm kẹo sền sệt pha chua ngọt vừa miệng. Trưa nào làm việc mệt ghé ăn đĩa cơm tấm là nạp đầy năng lượng ngay.",
    images: [
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=500&q=80",
    ],
    tags: ["Sườn nướng than", "Cơm tấm chuẩn vị", "Nước mắm kẹo"],
    likes: 85,
    comments: 9,
    badge: "Foodie Tích Cực",
  },
];

const categoryFilters = [
  { id: "all", label: "Tất cả bài review", icon: "forum" },
  { id: "verified", label: "Đã xác thực dùng tại quán", icon: "verified" },
  { id: "photo", label: "Có hình ảnh thực tế", icon: "photo_camera" },
  { id: "top", label: "Đánh giá 5 sao", icon: "star" },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(initialReviews);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPlaceFilter, setSelectedPlaceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedReviews, setLikedReviews] = useState({});

  // Modal viết review mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    placeId: 1,
    rating: 5,
    billAmount: "",
    title: "",
    content: "",
    tags: "",
  });

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.title || !newReview.content) return;

    const chosenPlace = places.find((p) => p.id === Number(newReview.placeId)) || places[0];

    const item = {
      id: Date.now(),
      placeId: chosenPlace.id,
      placeName: chosenPlace.name,
      dishName: chosenPlace.specialty || "Món ăn yêu thích",
      author: "Bạn (Reviewer Mới)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      rating: Number(newReview.rating),
      date: "Vừa xong",
      verifiedVisit: true,
      billAmount: newReview.billAmount || "50.000đ",
      title: newReview.title,
      content: newReview.content,
      images: [chosenPlace.image],
      tags: newReview.tags
        ? newReview.tags.split(",").map((t) => t.trim())
        : ["Món ngon nên thử", "Đã ghé ăn"],
      likes: 1,
      comments: 0,
      badge: "Thành Viên Mới",
    };

    setReviews([item, ...reviews]);
    setShowAddModal(false);
    setNewReview({
      placeId: 1,
      rating: 5,
      billAmount: "",
      title: "",
      content: "",
      tags: "",
    });
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedPlaceFilter !== "all" && r.placeId !== Number(selectedPlaceFilter)) return false;
    if (activeFilter === "verified" && !r.verifiedVisit) return false;
    if (activeFilter === "top" && r.rating < 5) return false;
    if (activeFilter === "photo" && (!r.images || r.images.length === 0)) return false;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FDFBF7] page-enter pb-16">
      {/* Top Banner Tiêu Chuẩn Review */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-b border-orange-200/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-orange-100 text-[#E84A27] text-[11px] font-black px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">rate_review</span>
            GÓC REVIEW CỘNG ĐỒNG THẬT 100%
          </span>
          <span className="text-[12px] text-gray-700 hidden sm:inline">
            Đánh giá khách quan, có hóa đơn & ảnh chụp tại bàn từ các tín đồ ẩm thực
          </span>
        </div>
        <span className="text-[11px] font-bold text-gray-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-gray-200">
          Chống review ảo & seeding
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Góc Review Ẩm Thực <span className="gradient-text-premium">Thực Tế</span>
            </h1>
            <p className="text-[13px] text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Trải nghiệm ăn uống chân thật của người bản địa. Bạn có thể đọc cảm nhận chi tiết về hương vị, giá cả, thái độ phục vụ trước khi quyết định ghé quán.
            </p>
          </div>

          {/* Nút Viết Review */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 h-11 rounded-full bg-[#E84A27] text-white text-[13px] font-bold shadow-md shadow-[#E84A27]/25 hover:bg-[#c93d1f] transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            Viết đánh giá của bạn
          </button>
        </div>

        {/* Thanh tìm kiếm & Lọc nhanh */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6 animate-slideInUp">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 gap-2.5 h-11 shadow-sm focus-within:border-[#E84A27] transition-colors">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 text-[13px] outline-none text-gray-800 placeholder-gray-400 font-medium"
              placeholder="Tìm theo quán ăn, món ăn hoặc cảm nhận hương vị..."
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Lọc theo quán */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 h-11 shadow-sm">
            <span className="material-symbols-outlined text-gray-400 text-[18px] mr-1">storefront</span>
            <select
              value={selectedPlaceFilter}
              onChange={(e) => setSelectedPlaceFilter(e.target.value)}
              className="bg-transparent text-[12px] font-semibold text-gray-700 outline-none pr-2 cursor-pointer"
            >
              <option value="all">Tất cả quán ăn</option>
              {places.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter categories pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {categoryFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[12px] font-bold whitespace-nowrap transition-all shadow-sm ${
                activeFilter === tab.id
                  ? "bg-[#E84A27] text-white shadow-md shadow-[#E84A27]/25"
                  : "bg-white text-gray-700 hover:bg-orange-50/50 border border-gray-200"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Danh sách các bài Review chân thực */}
        <div className="space-y-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];
            const currentLikes = rev.likes + (isLiked ? 1 : 0);

            return (
              <article
                key={rev.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-5 sm:p-6 animate-slideInUp"
              >
                {/* Header người review & quán ăn */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-orange-100 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[14px] text-gray-900">{rev.author}</span>
                        <span className="bg-orange-50 text-[#E84A27] text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                          {rev.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <span>{rev.date}</span>
                        {rev.verifiedVisit && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">verified</span>
                              Đã ăn tại quán (Bill ~{rev.billAmount})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quán liên quan & Nút chỉ đường */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 bg-gray-50 p-2 sm:px-3 rounded-xl border border-gray-100">
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Đang review quán</div>
                      <div className="text-[13px] font-extrabold text-gray-900 leading-tight">
                        {rev.placeName}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/', { state: { selectedPlaceId: rev.placeId } })}
                      className="flex items-center gap-1 h-8 px-3 rounded-full bg-[#E84A27] text-white text-[11px] font-bold hover:bg-[#c93d1f] shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[14px]">near_me</span>
                      Chỉ đường
                    </button>
                  </div>
                </div>

                {/* Nội dung bài review */}
                <div className="pt-4">
                  {/* Số sao & Tiêu đề */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-500 text-[16px]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <span className="font-black text-[13px] text-gray-800">
                      {rev.rating === 5 ? "Tuyệt vời" : rev.rating === 4 ? "Rất ngon" : "Khá ổn"}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[12px] font-bold text-[#E84A27] bg-red-50 px-2 py-0.5 rounded">
                      Món: {rev.dishName}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[16px] text-gray-900 mb-2 leading-snug">
                    {rev.title}
                  </h3>

                  <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
                    {rev.content}
                  </p>

                  {/* Ảnh chụp thực tế nếu có */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="flex gap-3 mb-4 overflow-x-auto no-scrollbar py-1">
                      {rev.images.map((imgUrl, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={imgUrl}
                          alt="Review shot"
                          className="w-36 h-28 sm:w-48 sm:h-36 rounded-xl object-cover shadow-sm border border-gray-100 hover:scale-105 transition-transform cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  {/* Tags cảm nhận */}
                  {rev.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {rev.tags.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tương tác: Thích & Bình luận */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[12px] text-gray-500">
                    <button
                      onClick={() => toggleLike(rev.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                        isLiked
                          ? "bg-red-50 text-[#E84A27] font-bold"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {isLiked ? "favorite" : "favorite_border"}
                      </span>
                      Hữu ích ({currentLikes})
                    </button>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-all">
                      <span className="material-symbols-outlined text-[17px]">chat_bubble_outline</span>
                      Bình luận ({rev.comments})
                    </button>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-all">
                      <span className="material-symbols-outlined text-[17px]">share</span>
                      Chia sẻ
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredReviews.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">rate_review</span>
              <p className="font-bold text-gray-700 text-base">Chưa có bài review nào phù hợp</p>
              <p className="text-gray-500 text-[12px] mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc viết review đầu tiên!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Viết Đánh Giá Mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-scaleIn">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-[#E84A27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">rate_review</span>
                </span>
                <h3 className="font-extrabold text-[16px] text-gray-900">Chia Sẻ Trải Nghiệm Ẩm Thực</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Chọn quán ăn bạn đã dùng bữa *
                </label>
                <select
                  value={newReview.placeId}
                  onChange={(e) => setNewReview({ ...newReview, placeId: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-medium outline-none focus:border-[#E84A27]"
                >
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.address})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Đánh giá chất lượng
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-medium outline-none focus:border-[#E84A27]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 sao - Tuyệt phẩm)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 sao - Rất ngon)</option>
                    <option value={3}>⭐⭐⭐ (3 sao - Tạm ổn)</option>
                    <option value={2}>⭐⭐ (2 sao - Cần cải thiện)</option>
                    <option value={1}>⭐ (1 sao - Không hài lòng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Giá bill trung bình
                  </label>
                  <input
                    type="text"
                    value={newReview.billAmount}
                    onChange={(e) => setNewReview({ ...newReview, billAmount: e.target.value })}
                    placeholder="Ví dụ: 60.000đ"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#E84A27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Tiêu đề tóm tắt cảm nhận *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Ví dụ: Nước dùng thơm ngọt sâu, thịt sườn nướng mọng nước..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#E84A27]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Cảm nhận chi tiết (Hương vị, phục vụ, không gian) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Kể về trải nghiệm của bạn: Món nào ngon nhất? Nên ghé vào lúc nào? Điểm cộng hay điểm trừ của quán..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-[13px] outline-none focus:border-[#E84A27] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Tags nổi bật (phân tách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={newReview.tags}
                  onChange={(e) => setNewReview({ ...newReview, tags: e.target.value })}
                  placeholder="Đậm vị, Quẩy giòn, Phục vụ nhanh"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#E84A27]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-10 rounded-full border border-gray-200 text-gray-700 font-bold text-[12px] hover:bg-gray-100"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-full bg-[#E84A27] text-white font-bold text-[12px] shadow-md hover:bg-[#c93d1f]"
                >
                  Đăng đánh giá ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
