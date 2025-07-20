import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectCrowdfunding from "./pages/features/ProjectCrowdfunding";
import CollaborativeInvestments from "./pages/features/CollaborativeInvestments";
import RealEstateInvestment from "./pages/features/RealEstateInvestment";
import TransparentTenders from "./pages/features/TransparentTenders";
import SocialWelfare from "./pages/features/SocialWelfare";
import GreenProjects from "./pages/features/GreenProjects";
import ArtsCreative from "./pages/features/ArtsCreative";
import PoolFundingMain from "./pages/poolfunding/PoolFundingMain";
import CampaignDetails from "./pages/poolfunding/CampaignDetails";
import CreatorDashboard from "./pages/poolfunding/CreatorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="chainfund-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/poolfunding" element={<PoolFundingMain />} />
            <Route path="/poolfunding/campaign/:id" element={<CampaignDetails />} />
            <Route path="/poolfunding/create" element={<CreatorDashboard />} />
            <Route path="/features/project-crowdfunding" element={<ProjectCrowdfunding />} />
            <Route path="/features/collaborative-investments" element={<CollaborativeInvestments />} />
            <Route path="/features/real-estate-investment" element={<RealEstateInvestment />} />
            <Route path="/features/transparent-tenders" element={<TransparentTenders />} />
            <Route path="/features/social-welfare" element={<SocialWelfare />} />
            <Route path="/features/green-projects" element={<GreenProjects />} />
            <Route path="/features/arts-creative" element={<ArtsCreative />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
