import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./i18n/LanguageContext";
import { pageFromPath } from "./lib/siteRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        {pageFromPath() === 'privacy' ? <PrivacyPolicy /> : <Index />}
        <CookieConsent />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
