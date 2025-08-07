import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/dashboard";
import TeamManagement from "@/pages/admin/team-management";
import BlogManagement from "@/pages/admin/blog-management";
import EventsManagement from "@/pages/admin/events-management";
import GalleryManagement from "@/pages/admin/gallery-management";
import DonationPage from "@/pages/donation-page";
import TeamPage from "@/pages/about/team";
import HistoryPage from "@/pages/about/history";
import PartnershipsPage from "@/pages/about/partnerships";
import ScholarshipsPage from "@/pages/about/scholarships";
import EducationPage from "@/pages/programs/education";
import VoicesPage from "@/pages/programs/voices";
import BeneficiariesPage from "@/pages/programs/beneficiaries";
import EventsPage from "@/pages/community/events";
import BlogPage from "@/pages/community/blog";
import PhotosPage from "@/pages/community/photos";
import ShopPage from "@/pages/community/shop";
import ContactPage from "@/pages/contact";
import GiftsPage from "@/pages/donate/gifts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/donate" component={DonationPage} />
      <Route path="/about/team" component={TeamPage} />
      <Route path="/about/history" component={HistoryPage} />
      <Route path="/about/partnerships" component={PartnershipsPage} />
      <Route path="/about/scholarships" component={ScholarshipsPage} />
      <Route path="/programs/education" component={EducationPage} />
      <Route path="/programs/voices" component={VoicesPage} />
      <Route path="/programs/beneficiaries" component={BeneficiariesPage} />
      <Route path="/community/events" component={EventsPage} />
      <Route path="/community/blog" component={BlogPage} />
      <Route path="/community/photos" component={PhotosPage} />
      <Route path="/community/shop" component={ShopPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/donate/gifts" component={GiftsPage} />
      
      {/* Protected admin routes */}
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} />
      <ProtectedRoute path="/admin/team" component={TeamManagement} />
      <ProtectedRoute path="/admin/blog" component={BlogManagement} />
      <ProtectedRoute path="/admin/blog-management" component={BlogManagement} />
      <ProtectedRoute path="/admin/gallery-management" component={GalleryManagement} />
      <ProtectedRoute path="/admin/events" component={EventsManagement} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
