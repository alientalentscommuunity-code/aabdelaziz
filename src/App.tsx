
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { trackPageView, trackEngagement } from "@/lib/analytics";
import { BackToTop } from "@/components/BackToTop";
import { CommandPalette } from "@/components/CommandPalette";
import { AuroraBackground } from "@/components/AuroraBackground";
import Home from "./pages/home/Home";
import CareerLanding from "./pages/career-galaxy/CareerLanding";
import CareerCV from "./pages/career-galaxy/CareerCV";
import CareerPortfolio from "./pages/career-galaxy/CareerPortfolio";
import HumanSide from "./pages/human-angel/HumanSide";
import Partners from "./pages/collaboration/Partners";
import Handbook from "./pages/startup-handbook/Handbook";
import SweetSpice from "./pages/sweet-spicy/SweetSpice";
import VisionBoard from "./pages/vision-board/VisionBoard";
import Blog from "./pages/blog/Blog";
import NotFound from "./pages/not-found/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

// Page Tracking Component
const PageTracker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const previousPathRef = useRef<string>("");

  useEffect(() => {
    // Track engagement time on previous page before navigating
    if (previousPathRef.current && previousPathRef.current !== location.pathname) {
      const engagementTime = Date.now() - startTimeRef.current;
      trackEngagement(engagementTime);
    }

    // Track the new page view
    const pageTitle = document.title;
    const pagePath = location.pathname + location.search;
    
    // Small delay to ensure the page has rendered
    const timeoutId = setTimeout(() => {
      trackPageView(pagePath, pageTitle);
    }, 100);

    // Reset the start time for the new page
    startTimeRef.current = Date.now();
    previousPathRef.current = location.pathname;

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  // Track engagement when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const engagementTime = Date.now() - startTimeRef.current;
      trackEngagement(engagementTime);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuroraBackground />
        <CommandPalette />
        <PageTracker>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career" element={<CareerLanding />} />
            <Route path="/career/cv" element={<CareerCV />} />
            <Route path="/career/portfolio" element={<CareerPortfolio />} />
            <Route path="/human" element={<HumanSide />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/sweet-spice" element={<SweetSpice />} />
            <Route path="/vision-board" element={<VisionBoard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTracker>
        <BackToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
