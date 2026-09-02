import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider, type Language } from "./i18n/LanguageContext";
import { pageFromPath, type SitePage } from "./lib/siteRoute";

const queryClient = new QueryClient();

type AppProps = {
  initialLanguage?: Language;
  initialPage?: SitePage;
};

const App = ({ initialLanguage, initialPage }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider initialLanguage={initialLanguage}>
        <Toaster />
        <Sonner />
        {(initialPage ?? pageFromPath()) === 'privacy' ? <PrivacyPolicy /> : <Index />}
        <CookieConsent />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
