import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import DashboardPage from "./pages/DashboardPage";
import LandRecordsPage from "./pages/LandRecordsPage";
import DocumentsPage from "./pages/DocumentsPage";
import LoansPage from "./pages/LoansPage";
import SchemesPage from "./pages/SchemesPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/land-records" element={<LandRecordsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
