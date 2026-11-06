function resolveApiBase() {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== "undefined") {
    const { hostname, port } = window.location;
    // Khi chạy trực tiếp trên VPS (cùng cổng 8080 hoặc qua đường hầm Bore / Tailscale / LAN)
    if (port === "8080" || hostname === "bore.pub" || hostname === "192.168.1.15" || hostname === "100.99.43.126") {
      return "/api";
    }
  }
  return "http://localhost:8080/api";
}

const API_BASE = resolveApiBase();

const ACCESS_TOKEN_KEY = "localeats_access_token";
const REFRESH_TOKEN_KEY = "localeats_refresh_token";
const USER_INFO_KEY = "localeats_user_info";

export function getStoredAuth() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_INFO_KEY);
    return {
      accessToken,
      refreshToken,
      user: userRaw ? JSON.parse(userRaw) : null,
    };
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
}

export function saveStoredAuth(authData) {
  if (!authData) return;
  try {
    if (authData.accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
    if (authData.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
    const userObj = {
      userId: authData.userId,
      role: authData.role,
      verified: authData.verified,
    };
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userObj));
  } catch {}
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    sessionStorage.removeItem("localeats_admin_auth");
    sessionStorage.removeItem("localeats_merchant_auth");
  } catch {}
}

let refreshPromise = null;

async function tryRefreshToken() {
  const { refreshToken } = getStoredAuth();
  if (!refreshToken) return null;
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) {
        clearStoredAuth();
        return null;
      }
      const json = await res.json();
      if (json?.success && json?.data?.accessToken) {
        saveStoredAuth(json.data);
        return json.data.accessToken;
      }
      clearStoredAuth();
      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiRequest(path, options = {}) {
  const { accessToken } = getStoredAuth();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && !path.startsWith("/auth/")) {
    const newAccess = await tryRefreshToken();
    if (newAccess) {
      headers["Authorization"] = `Bearer ${newAccess}`;
      res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
      });
    }
  }

  const json = await res.json().catch(() => ({ success: false, message: `HTTP ${res.status}` }));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Lỗi kết nối máy chủ (${res.status})`);
  }
  return json.data;
}

export function apiFetch(path, options = {}) {
  const cleanPath = path.startsWith("/api/") ? path.slice(4) : path;
  return apiRequest(cleanPath, options);
}

export const localeatsApi = {
  // Auth
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  resendOtp: (identifier) => apiRequest("/auth/resend-otp", { method: "POST", body: JSON.stringify({ identifier }) }),
  verifyOtp: (identifier, otpCode) => apiRequest("/auth/verify-otp", { method: "POST", body: JSON.stringify({ identifier, otpCode }) }),
  login: (identifier, password) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ identifier, password }) }),
  logout: () => {
    const { refreshToken } = getStoredAuth();
    clearStoredAuth();
    return apiRequest("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) }).catch(() => null);
  },

  // Stores & Search
  getStores: (params = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });
    const qStr = qs.toString();
    return apiRequest(`/stores${qStr ? `?${qStr}` : ""}`);
  },
  getHotStores: (range = "week", district = "all", lat, lng) => {
    const qs = new URLSearchParams({ range, district });
    if (lat && lng) {
      qs.set("lat", lat);
      qs.set("lng", lng);
    }
    return apiRequest(`/stores/hot?${qs.toString()}`);
  },
  getStoreDetail: (id, lat, lng) => {
    const qs = lat && lng ? `?lat=${lat}&lng=${lng}` : "";
    return apiRequest(`/stores/${id}${qs}`);
  },
  voteStore: (id) => apiRequest(`/stores/${id}/vote`, { method: "POST" }),
  saveStore: (id) => apiRequest(`/stores/${id}/save`, { method: "POST" }),

  // GPS Navigation & Dwell Confirmation
  startNavigationSession: (payload) =>
    apiRequest("/navigation/sessions", { method: "POST", body: JSON.stringify(payload) }),
  sendNavigationPing: (sessionId, payload) =>
    apiRequest(`/navigation/sessions/${sessionId}/pings`, { method: "POST", body: JSON.stringify(payload) }),
  cancelNavigationSession: (sessionId) =>
    apiRequest(`/navigation/sessions/${sessionId}/cancel`, { method: "POST" }),
  getMyVisits: () => apiRequest("/visits/me"),

  // Community, AI, Trips, VIP, Portals
  getReviews: (storeId, filter = "all") => {
    const qs = new URLSearchParams({ filter });
    if (storeId && storeId !== "all") qs.set("storeId", storeId);
    return apiRequest(`/reviews?${qs.toString()}`);
  },
  createReview: (payload) => apiRequest("/reviews", { method: "POST", body: JSON.stringify(payload) }),
  likeReview: (id) => apiRequest(`/reviews/${id}/like`, { method: "POST" }),
  aiRecommend: (payload) => apiRequest("/ai/recommend", { method: "POST", body: JSON.stringify(payload) }),
  getTrips: () => apiRequest("/trips"),
  saveTrip: (payload) => apiRequest("/trips", { method: "POST", body: JSON.stringify(payload) }),
  getActiveCampaigns: () => apiRequest("/campaigns/active"),
  claimVoucher: (id) => apiRequest(`/campaigns/${id}/claim`, { method: "POST" }),
  getMerchantOverview: (storeId) => apiRequest(`/merchant/overview${storeId ? `?storeId=${storeId}` : ""}`),
  createMerchantMenuItem: (payload) => apiRequest("/merchant/menu", { method: "POST", body: JSON.stringify(payload) }),
  getAdminOverview: () => apiRequest("/admin/overview"),
  adminCreateStore: (payload) => apiRequest("/admin/stores", { method: "POST", body: JSON.stringify(payload) }),
};

