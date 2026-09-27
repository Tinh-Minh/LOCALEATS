export const places = [
  {
    id: 1,
    name: "Phở Thìn Lò Đúc",
    address: "138 Lê Duẩn, Q.1",
    rating: 4.9,
    reviews: 4820,
    price: "65.000đ - 90.000đ",
    hot: true,
    lat: 10.7745,
    lng: 106.7005,
    fx: 62,
    fy: 32,
    category: "Phở",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80",
  },
  {
    id: 2,
    name: "Bánh Mì Huỳnh Hoa",
    address: "26 Lê Thị Riêng, Q.1",
    rating: 4.8,
    reviews: 6100,
    price: "55.000đ - 75.000đ",
    hot: true,
    lat: 10.7715,
    lng: 106.6905,
    fx: 38,
    fy: 38,
    category: "Bánh Mì",
    image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400&q=80",
  },
  {
    id: 3,
    name: "Ốc Oanh",
    address: "534 Vĩnh Khánh, Q.4",
    rating: 4.7,
    reviews: 1900,
    price: "80.000đ - 200.000đ",
    hot: false,
    lat: 10.7615,
    lng: 106.704,
    fx: 27,
    fy: 72,
    category: "Hải Sản",
    image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&q=80",
  },
  {
    id: 4,
    name: "Bún Đậu A Chảnh",
    address: "Q.1",
    rating: 4.4,
    reviews: 900,
    price: "50.000đ - 90.000đ",
    hot: false,
    lat: 10.77,
    lng: 106.695,
    fx: 50,
    fy: 78,
    category: "Bún Đậu",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
  },
  {
    id: 5,
    name: "Cơm Tấm Thuận Kiều",
    address: "432 Thuận Kiều, Q.11",
    rating: 4.6,
    reviews: 3200,
    price: "45.000đ - 70.000đ",
    hot: true,
    lat: 10.762,
    lng: 106.658,
    fx: 15,
    fy: 55,
    category: "Cơm Tấm",
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80",
  },
];

export const navItems = [
  { id: "map", label: "🗺️ Bản đồ HOT", path: "/" },
  { id: "hotlist", label: "🏆 Bảng xếp hạng", path: "/hotlist" },
  { id: "ai", label: "🤖 AI Gợi Ý", path: "/ai" },
  { id: "vip", label: "💎 VIP & Ưu đãi", path: "/vip" },
];

export const filterChips = [
  { id: "hot", label: "🔥 Đang Hot" },
  { id: "pho", label: "🍜 Phở & Bún" },
  { id: "banhmi", label: "🥖 Bánh Mì" },
  { id: "seafood", label: "🦐 Hải Sản" },
  { id: "rice", label: "🍚 Cơm" },
  { id: "dessert", label: "🍡 Tráng Miệng" },
  { id: "open247", label: "🕐 Mở 24/7" },
];

export const sidebarItems = [
  { id: "nearby",    label: "Quanh đây & Xu hướng",         path: "/",          icon: "explore",          badge: null },
  { id: "vip",       label: "Quán Tài Trợ & Ưu đãi VIP",   path: "/vip",       icon: "card_giftcard",    badge: "VIP",   badgeStyle: "vip" },
  { id: "hot",       label: "Đang HOT",                     path: "/hotlist",   icon: "local_fire_department", badge: "BÙNG NỔ", badgeStyle: "hot" },
  { id: "ai",        label: "AI Gợi ý món ăn",              path: "/ai",        icon: "auto_awesome",     badge: "SMART", badgeStyle: "smart" },
  { id: "review",    label: "Góc Review",                    path: "/review",    icon: "rate_review",      badge: "MỚI",   badgeStyle: "new" },
  { id: "direction", label: "Tìm đường đa phương tiện",     path: "/direction", icon: "directions",       badge: null },
  { id: "saved",     label: "Bộ sưu tập yêu thích",         path: "/saved",     icon: "collections_bookmark", badge: null },
  { id: "live",      label: "Mức độ sôi động Live",         path: "/live",      icon: "cell_tower",       badge: null },
];

export const trendingFoods = [
  { id: 1, rank: 1, name: "Phở Bò Tái Lăn Sốt Vang", tag: "HOT", trend: "+142%", desc: "Đặc trưng phở Hà Nội chuẩn vị truyền thống với nước dùng hầm 12 giờ.", nearbyCount: 24, weekOrders: "18.4k lượt tuần", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80" },
  { id: 2, rank: 2, name: "Bánh Mì Chảo Trứng Bò", tag: "TRENDING", trend: "+98%", desc: "Bánh mì giòn tan, trứng ốp la chảy vàng, bò sốt tiêu thơm lừng.", nearbyCount: 31, weekOrders: "12.1k lượt tuần", image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400&q=80" },
  { id: 3, rank: 3, name: "Bún Bò Huế Cay Sả", tag: "VIRAL", trend: "+76%", desc: "Sợi bún to, nước lèo cay nồng sả hành, chân giò giòn mềm.", nearbyCount: 17, weekOrders: "9.3k lượt tuần", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { id: 4, rank: 4, name: "Cơm Tấm Sườn Bì Chả", tag: "CLASSIC", trend: "+54%", desc: "Cơm tấm Sài Gòn chính hiệu, sườn nướng than hoa, bì trộn đều tay.", nearbyCount: 42, weekOrders: "22.7k lượt tuần", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80" },
];

export const aiDishes = [
  { id: 1, name: "Phở Bò Tái Nạm Đặc Biệt", restaurant: "Phở Thìn Lò Đúc", tag: "CHUẨN KHẨU VỊ • Đang mở cửa", rating: 4.9, reviews: "4.8k", price: "75.000đ", distanceKm: 1.2, bikeMin: 8, matchPct: 97, matchLabel: "Khớp khẩu vị", aiReason: "Trời mưa lạnh, bạn chọn tâm trạng 'đậm đà nóng hổi' — phở bò nước lèo hầm 12h tại đây xuất sắc 100% phù hợp.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80" },
  { id: 2, name: "Bún Bò Huế Sả Ớt Cay", restaurant: "Bún Bò Cô Ba Huế Gốc", tag: "GỢI Ý AI • Gần bạn nhất", rating: 4.7, reviews: "2.1k", price: "55.000đ", distanceKm: 0.8, bikeMin: 5, matchPct: 93, matchLabel: "Rất phù hợp", aiReason: "Trong bán kính 1km, đây là quán cay nồng nhất với đánh giá cao nhất — chuẩn tâm trạng 'thèm cay ấm bụng' hôm nay.", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80" },
  { id: 3, name: "Bánh Mì Chảo Bò Sốt Tiêu", restaurant: "Tiệm Bánh Mì 37 Nguyễn Trãi", tag: "PHỔ BIẾN NHẤT • Tuần này", rating: 4.6, reviews: "3.3k", price: "45.000đ", distanceKm: 1.5, bikeMin: 10, matchPct: 88, matchLabel: "Phù hợp tốt", aiReason: "Ngân sách dưới 60k + thời tiết mưa: bánh mì chảo nóng giòn là lựa chọn hoàn hảo cho bữa trưa linh hoạt.", image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400&q=80" },
  { id: 4, name: "Cơm Tấm Sườn Bì Chả", restaurant: "Cơm Tấm Thuận Kiều Cổ Truyền", tag: "GIÁ TRỊ NHẤT • Cách 2km", rating: 4.5, reviews: "5.6k", price: "50.000đ", distanceKm: 2.0, bikeMin: 13, matchPct: 84, matchLabel: "Gợi ý thêm", aiReason: "Cơm tấm nhiều reviews nhất khu vực, giá tốt nhất trong ngân sách — lý tưởng nếu bạn muốn no bụng lâu.", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80" },
];

export const vipRestaurants = [
  { id: 1, name: "Nhà Hàng TRẤN THÀNH QUÁN", category: "Lẩu Thái & Hải Sản Cao Cấp", rating: 4.9, reviews: 3200, address: "12 Lê Lợi, Q.1", distanceKm: 1.4, partnerTier: "💛 ĐỐI TÁC VÀNG", status: "Mở đến 23:00", offer: "Miễn phí 1 phần lẩu Thái cho bàn từ 4 người khi xuất trình ứng dụng LOCALEATS.", voucher: "VIP-LAUTHAI-FREE", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
  { id: 2, name: "The Sushi Bar Signature", category: "Nhật Bản Cao Cấp & Omakase", rating: 4.8, reviews: 1800, address: "Tầng 5, Saigon Centre, Q.1", distanceKm: 0.9, partnerTier: "💜 ĐỐI TÁC PLATINUM", status: "Mở đến 22:30", offer: "Giảm 30% tổng hoá đơn cho thực đơn Omakase khi đặt bàn qua LOCALEATS.", voucher: "SUSHI-VIP30", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80" },
  { id: 3, name: "Quán Nhậu Sân Bay Tân Sơn Nhất", category: "Đồ Nhậu & Bia Thủ Công", rating: 4.6, reviews: 4500, address: "218 Hoàng Văn Thụ, Phú Nhuận", distanceKm: 3.2, partnerTier: "🥈 ĐỐI TÁC BẠC", status: "Mở đến 01:00", offer: "Tặng 2 lon bia Craft Beer khi order từ 300k.", voucher: "BEERCRAFT2X", voucherDesc: "1 lon/người, tối đa 2 lon/bàn, áp dụng T2-T5.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 4, name: "Phở Lệ - Phở Sài Gòn Xưa", category: "Phở Truyền Thống", rating: 4.7, reviews: 7800, address: "413 Võ Văn Tần, Q.3", distanceKm: 2.1, partnerTier: "💛 ĐỐI TÁC VÀNG", status: "Mở 06:00–14:00", offer: "Giảm 20% tô phở đặc biệt khi check-in LOCALEATS.", voucher: "PHO20-LOCALEATS", voucherDesc: "Áp dụng cho 1 tô/lượt, từ T2-CN.", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80" },
  { id: 5, name: "Bếp Nhà - Home Kitchen", category: "Cơm Nhà & Món Thuần Việt", rating: 4.5, reviews: 2100, address: "67 Trần Hưng Đạo, Q.5", distanceKm: 2.8, partnerTier: "🥉 ĐỐI TÁC ĐỒNG", status: "Mở 10:00–21:00", offer: "Tặng 1 tô canh chua khi gọi set cơm gia đình từ 2 người.", voucher: "BEPNHA-FREE", voucherDesc: "Xuất trình app LOCALEATS khi gọi món.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
];

