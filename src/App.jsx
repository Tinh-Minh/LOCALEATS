import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapPage from "./pages/MapPage";
import HotListPage from "./pages/HotListPage";
import AIPage from "./pages/AIPage";
import VIPPage from "./pages/VIPPage";
import SavedPage from "./pages/SavedPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden bg-[#FDFBF7]">
        {/* Top navbar */}
        <Navbar />

        {/* Body: sidebar + content */}
        <div className="flex flex-1 overflow-hidden pt-14">
          <Sidebar />
          <main className="flex-1 flex overflow-hidden">
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/hotlist" element={<HotListPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/vip" element={<VIPPage />} />
              <Route path="/saved" element={<SavedPage />} />
              {/* Fallback for sidebar items not yet implemented */}
              <Route path="*" element={<HotListPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}