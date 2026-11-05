// Tiện ích giải quyết tọa độ điểm đến (Destination Coordinate Resolver)
// Hỗ trợ từ điển địa danh du lịch / tỉnh thành Việt Nam + Geocoding Nominatim OpenStreetMap

export const KNOWN_DESTINATIONS = {
  // Vũng Tàu
  "vũng tàu": { lat: 10.3460, lng: 107.0843, name: "Bãi Sau, TP. Vũng Tàu", address: "Thùy Vân, Phường Thắng Tam, TP. Vũng Tàu" },
  "bãi sau": { lat: 10.3392, lng: 107.0843, name: "Bãi Sau Vũng Tàu", address: "Bãi Sau, TP. Vũng Tàu" },
  "bãi trước": { lat: 10.3475, lng: 107.0722, name: "Bãi Trước Vũng Tàu", address: "Bãi Trước, TP. Vũng Tàu" },
  "hồ tràm": { lat: 10.4907, lng: 107.4520, name: "Biển Hồ Tràm", address: "Xuyên Mộc, Bà Rịa - Vũng Tàu" },

  // Đà Lạt & Tây Nguyên
  "đà lạt": { lat: 11.9404, lng: 108.4377, name: "Chợ Đêm Đà Lạt", address: "Nguyễn Thị Minh Khai, Phường 1, TP. Đà Lạt" },
  "chợ đêm đà lạt": { lat: 11.9424, lng: 108.4373, name: "Chợ Đêm Đà Lạt", address: "Phường 1, TP. Đà Lạt" },
  "hồ xuân hương": { lat: 11.9400, lng: 108.4450, name: "Hồ Xuân Hương, Đà Lạt", address: "TP. Đà Lạt, Lâm Đồng" },
  "bảo lộc": { lat: 11.5476, lng: 107.8080, name: "TP. Bảo Lộc", address: "Lâm Đồng" },

  // Bình Thuận / Phan Thiết / Mũi Né
  "mũi né": { lat: 10.9333, lng: 108.2872, name: "Mũi Né, Phan Thiết", address: "TP. Phan Thiết, Bình Thuận" },
  "phan thiết": { lat: 10.9333, lng: 108.2872, name: "TP. Phan Thiết", address: "Bình Thuận" },

  // Miền Tây (Cần Thơ, Bến Tre, Tiền Giang, An Giang)
  "cần thơ": { lat: 10.0336, lng: 105.7876, name: "Bến Ninh Kiều, Cần Thơ", address: "Bến Ninh Kiều, Cần Thơ" },
  "bến ninh kiều": { lat: 10.0336, lng: 105.7876, name: "Bến Ninh Kiều", address: "Quận Ninh Kiều, Cần Thơ" },
  "chợ nổi": { lat: 10.0055, lng: 105.7460, name: "Chợ Nổi Cái Răng", address: "Cái Răng, Cần Thơ" },
  "mỹ tho": { lat: 10.3600, lng: 106.3600, name: "TP. Mỹ Tho", address: "Tiền Giang" },
  "bến tre": { lat: 10.2415, lng: 106.3759, name: "TP. Bến Tre", address: "Bến Tre" },
  "châu đốc": { lat: 10.7042, lng: 105.1197, name: "Miếu Bà Chúa Xứ Núi Sam", address: "Châu Đốc, An Giang" },

  // Miền Trung (Đà Nẵng, Hội An, Huế, Nha Trang, Quy Nhơn)
  "đà nẵng": { lat: 16.0592, lng: 108.2435, name: "Biển Mỹ Khê, Đà Nẵng", address: "Sơn Trà, Đà Nẵng" },
  "biển mỹ khê": { lat: 16.0592, lng: 108.2435, name: "Biển Mỹ Khê", address: "Sơn Trà, Đà Nẵng" },
  "cầu rồng": { lat: 16.0611, lng: 108.2208, name: "Cầu Rồng, Đà Nẵng", address: "Hải Châu, Đà Nẵng" },
  "bà nà": { lat: 15.9988, lng: 107.9964, name: "Bà Nà Hills", address: "Hòa Vang, Đà Nẵng" },
  "hội an": { lat: 15.8801, lng: 108.3380, name: "Phố Cổ Hội An", address: "Hội An, Quảng Nam" },
  "huế": { lat: 16.4637, lng: 107.5909, name: "Đại Nội Huế", address: "TP. Huế, Thừa Thiên Huế" },
  "nha trang": { lat: 12.2388, lng: 109.1967, name: "Biển Trần Phú, Nha Trang", address: "TP. Nha Trang, Khánh Hòa" },
  "quy nhơn": { lat: 13.7820, lng: 109.2190, name: "TP. Quy Nhơn", address: "Bình Định" },
  "phú yên": { lat: 13.0882, lng: 109.3175, name: "Gành Đá Đĩa, Phú Yên", address: "Tuy An, Phú Yên" },

  // Miền Bắc (Hà Nội, Hạ Long, Ninh Bình, Sa Pa)
  "hà nội": { lat: 21.0285, lng: 105.8542, name: "Hồ Hoàn Kiếm, Hà Nội", address: "Hoàn Kiếm, Hà Nội" },
  "hồ hoàn kiếm": { lat: 21.0285, lng: 105.8542, name: "Hồ Hoàn Kiếm", address: "Hoàn Kiếm, Hà Nội" },
  "hồ gươm": { lat: 21.0285, lng: 105.8542, name: "Hồ Gươm", address: "Hoàn Kiếm, Hà Nội" },
  "hồ tây": { lat: 21.0583, lng: 105.8236, name: "Hồ Tây, Hà Nội", address: "Tây Hồ, Hà Nội" },
  "hạ long": { lat: 20.9505, lng: 107.0734, name: "Vịnh Hạ Long", address: "Quảng Ninh" },
  "ninh bình": { lat: 20.2506, lng: 105.9745, name: "Tràng An, Ninh Bình", address: "Hoa Lư, Ninh Bình" },
  "sa pa": { lat: 22.3364, lng: 103.8438, name: "Thị Trấn Sa Pa", address: "Lào Cai" },

  // TP. Hồ Chí Minh & Khu vực lân cận
  "bến thành": { lat: 10.7725, lng: 106.6980, name: "Chợ Bến Thành", address: "Lê Lợi, Bến Thành, Quận 1, TP.HCM" },
  "nguyễn huệ": { lat: 10.7743, lng: 106.7037, name: "Phố Đi Bộ Nguyễn Huệ", address: "Quận 1, TP.HCM" },
  "bitexco": { lat: 10.7716, lng: 106.7044, name: "Bitexco Financial Tower", address: "Hải Triều, Quận 1, TP.HCM" },
  "landmark 81": { lat: 10.7951, lng: 106.7218, name: "Landmark 81", address: "Vinhomes Central Park, Bình Thạnh" },
  "tân sơn nhất": { lat: 10.8185, lng: 106.6588, name: "Sân Bay Tân Sơn Nhất", address: "Trường Sơn, Tân Bình, TP.HCM" },
  "bùi viện": { lat: 10.7672, lng: 106.6934, name: "Phố Tây Bùi Viện", address: "Phạm Ngũ Lão, Quận 1, TP.HCM" },
  "thảo cầm viên": { lat: 10.7875, lng: 106.7053, name: "Thảo Cầm Viên Sài Gòn", address: "2 Nguyễn Bỉnh Khiêm, Quận 1" },
  "nhà thờ đức bà": { lat: 10.7798, lng: 106.6990, name: "Nhà Thờ Đức Bà", address: "Công xã Paris, Quận 1, TP.HCM" },
  "hồ con rùa": { lat: 10.7828, lng: 106.6961, name: "Hồ Con Rùa", address: "Công Trường Quốc Tế, Quận 3" },
  "thủ thiêm": { lat: 10.7788, lng: 106.7188, name: "Khu Đô Thị Thủ Thiêm", address: "TP. Thủ Đức, TP.HCM" },
  "bình dương": { lat: 10.9804, lng: 106.6519, name: "TP. Thủ Dầu Một", address: "Bình Dương" },
  "biên hòa": { lat: 10.9447, lng: 106.8243, name: "TP. Biên Hòa", address: "Đồng Nai" },
  "phú quốc": { lat: 10.2899, lng: 103.9840, name: "Đảo Ngọc Phú Quốc", address: "Kiên Giang" },
};

/**
 * Phân giải tọa độ địa lý (lat, lng) cho địa chỉ hoặc địa điểm điểm đến
 * Ưu tiên:
 * 1. Từ điển địa danh du lịch / tỉnh thành Việt Nam
 * 2. Geocoding mở rộng OpenStreetMap Nominatim
 * 3. Fallback có tính toán từ vị trí quán cuối cùng
 */
export async function resolveDestinationCoords(query, fallbackReferencePlace = null) {
  if (!query || !query.trim()) {
    return null;
  }

  const cleanQ = query.trim();
  const lowerQ = cleanQ.toLowerCase();

  // 1. Kiểm tra từ điển địa danh nội bộ
  for (const [key, dest] of Object.entries(KNOWN_DESTINATIONS)) {
    if (lowerQ.includes(key) || key.includes(lowerQ)) {
      return {
        lat: dest.lat,
        lng: dest.lng,
        name: cleanQ,
        address: dest.address,
        isDestination: true,
      };
    }
  }

  // 2. Tra cứu OpenStreetMap Nominatim API
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      cleanQ + ", Việt Nam"
    )}&limit=1&addressdetails=1`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "vi" },
      signal: AbortSignal.timeout ? AbortSignal.timeout(3500) : undefined,
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          name: cleanQ,
          address: data[0].display_name || cleanQ,
          isDestination: true,
        };
      }
    }
  } catch (err) {
    console.warn("[DestinationResolver] Geocoding network lookup failed/timeout, using fallback:", err);
  }

  // 3. Fallback: Nếu không tìm thấy hoặc offline, tính tọa độ dịch chuyển hợp lý từ quán cuối
  if (fallbackReferencePlace?.lat && fallbackReferencePlace?.lng) {
    return {
      lat: fallbackReferencePlace.lat + 0.015,
      lng: fallbackReferencePlace.lng + 0.015,
      name: cleanQ,
      address: cleanQ,
      isDestination: true,
    };
  }

  // Fallback mặc định về trung tâm TP.HCM
  return {
    lat: 10.7769,
    lng: 106.7009,
    name: cleanQ,
    address: cleanQ,
    isDestination: true,
  };
}

