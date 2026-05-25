import { useState } from "react";
import { useNavigate, useLocation, HashRouter, Routes, Route } from "react-router";
import { Page } from "./types";
import { GlobalAnimations } from "./components/GlobalAnimations";
import { FloatingIcons } from "./components/FloatingIcons";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { PlatformModal } from "./components/PlatformModal";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { FutureExpansionPage } from "./pages/FutureExpansionPage";
import { ContactPage } from "./pages/ContactPage";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeService, setActiveService] = useState<string | null>(null);

  const getPageFromPath = (path: string): Page => {
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/services")) return "services";
    if (path.startsWith("/future")) return "future";
    if (path.startsWith("/contact")) return "contact";
    return "home";
  };

  const page = getPageFromPath(location.pathname);

  const setPageAndScroll = (p: Page) => {
    if (p === "home") {
      navigate("/");
    } else {
      navigate(`/${p}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <GlobalAnimations />
      <FloatingIcons />
      <Navbar page={page} setPage={setPageAndScroll} />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage setPage={setPageAndScroll} />} />
          <Route path="/home" element={<HomePage setPage={setPageAndScroll} />} />
          <Route path="/about" element={<AboutPage setPage={setPageAndScroll} />} />
          <Route path="/services" element={<ServicesPage setPage={setPageAndScroll} />} />
          <Route path="/future" element={<FutureExpansionPage setPage={setPageAndScroll} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage setPage={setPageAndScroll} />} />
        </Routes>
      </main>
      <Footer setPage={setPageAndScroll} onSelectService={setActiveService} />
      <ScrollToTop />
      <FloatingWhatsApp />
      <PlatformModal activeService={activeService} onClose={() => setActiveService(null)} setPage={setPageAndScroll} />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
