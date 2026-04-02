
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CareerLanding from "./pages/CareerLanding";
import CareerCV from "./pages/CareerCV";
import CareerPortfolio from "./pages/CareerPortfolio";
import HumanSide from "./pages/HumanSide";
import Partners from "./pages/Partners";
import Handbook from "./pages/Handbook";
import SweetSpice from "./pages/SweetSpice";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<CareerLanding />} />
          <Route path="/career/cv" element={<CareerCV />} />
          <Route path="/career/portfolio" element={<CareerPortfolio />} />
          <Route path="/human" element={<HumanSide />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/handbook" element={<Handbook />} />
          <Route path="/sweet-spice" element={<SweetSpice />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
