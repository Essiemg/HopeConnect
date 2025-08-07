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
import DonationPage from "@/pages/donation-page";
import TeamPage from "@/pages/about/team";
import HistoryPage from "@/pages/about/history";
import EducationPage from "@/pages/programs/education";
import EventsPage from "@/pages/community/events";
import BlogPage from "@/pages/community/blog";
import ShopPage from "@/pages/community/shop";
import ContactPage from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/donate" component={DonationPage} />
      <Route path="/about/team" component={TeamPage} />
      <Route path="/about/history" component={HistoryPage} />
      <Route path="/programs/education" component={EducationPage} />
      <Route path="/community/events" component={EventsPage} />
      <Route path="/community/blog" component={BlogPage} />
      <Route path="/community/shop" component={ShopPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Protected admin routes */}
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/team" component={TeamManagement} />
      <ProtectedRoute path="/admin/blog" component={BlogManagement} />
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
