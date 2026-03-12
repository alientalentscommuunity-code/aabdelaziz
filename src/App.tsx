
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CareerFramework from "./pages/CareerFramework";
import CareerLanding from "./pages/CareerLanding";
import CareerCV from "./pages/CareerCV";
import CareerPortfolio from "./pages/CareerPortfolio";
import CareerICP from "./pages/CareerICP";
import CareerProgress from "./pages/CareerProgress";
import CareerVision from "./pages/CareerVision";
import HumanSide from "./pages/HumanSide";
import Partners from "./pages/Partners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-framework" element={<CareerFramework />} />
          <Route path="/career" element={<CareerLanding />} />
          <Route path="/career/cv" element={<CareerCV />} />
          <Route path="/career/portfolio" element={<CareerPortfolio />} />
          <Route path="/career/icp" element={<CareerICP />} />
          <Route path="/career/progress" element={<CareerProgress />} />
          <Route path="/career/vision" element={<CareerVision />} />
          <Route path="/human" element={<HumanSide />} />
          <Route path="/partners" element={<Partners />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
