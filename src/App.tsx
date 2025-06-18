import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict if page uses its own Toaster
// import { Toaster as Sonner } from "@/components/ui/sonner"; // Sonner is now imported and used in MinimalistLandingPage.tsx directly
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MinimalistLandingPage from "./pages/MinimalistLandingPage"; // Import new page
import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

const App = () => {
  console.log('App loaded');
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShadcnToaster />
      {/* Sonner is now page-specific if needed, or could be global here if multiple pages use it */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          {/* Set MinimalistLandingPage as the index route */}
          <Route path="/" element={<MinimalistLandingPage />} />
          
          {/* Add other routes here if any in the future, for example: */}
          {/* <Route path="/about" element={<AboutPage />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
           <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;