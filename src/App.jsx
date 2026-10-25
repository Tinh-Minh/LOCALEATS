import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import MapPage from "./pages/MapPage";
import HotListPage from "./pages/HotListPage";
import AIPage from "./pages/AIPage";
import VIPPage from "./pages/VIPPage";
import SavedPage from "./pages/SavedPage";
import ReviewPage from "./pages/ReviewPage";
import LivePulsePage from "./pages/LivePulsePage";
import TripPlannerPage from "./pages/TripPlannerPage";
import MysteryFoodPage from "./pages/MysteryFoodPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MerchantDashboardPage from "./pages/MerchantDashboardPage";
import PortalLoginPage from "./pages/PortalLoginPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Cổng đăng nhập độc lập dành riêng cho Admin và Chủ Quán */}
        <Route path="/portal" element={<PortalLoginPage />} />
        <Route path="/login" element={<PortalLoginPage />} />

        {/* Dashboard Quản Trị Viên toàn màn hình riêng biệt */}
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* Dashboard Chủ Quán toàn màn hình riêng biệt */}
        <Route path="/merchant" element={<MerchantDashboardPage />} />

        {/* Giao diện Ứng dụng Khách Hàng (kèm Navbar + Sidebar + BottomNav) */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col h-screen overflow-hidden bg-[#FDFBF7]">
              {/* Top navbar */}
              <Navbar />

              {/* Body: sidebar + content */}
              <div className="flex flex-1 overflow-hidden pt-16">
                <Sidebar />
                <main className="flex-1 flex overflow-hidden pb-14 md:pb-0 relative">
                  <Routes>
                    <Route path="/" element={<MapPage />} />
                    <Route path="/hotlist" element={<HotListPage />} />
                    <Route path="/ai" element={<AIPage />} />
                    <Route path="/vip" element={<VIPPage />} />
                    <Route path="/saved" element={<SavedPage />} />
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/live" element={<LivePulsePage />} />
                    <Route path="/trip" element={<TripPlannerPage />} />
                    <Route path="/trip-planner" element={<TripPlannerPage />} />
                    <Route path="/mystery" element={<MysteryFoodPage />} />
                    {/* Fallback for sidebar items not yet implemented */}
                    <Route path="*" element={<HotListPage />} />
                  </Routes>
                </main>
              </div>

              {/* Mobile bottom navigation bar */}
              <BottomNav />
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}