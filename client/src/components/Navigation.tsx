import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Heart className="text-white text-xl" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary">VOH-CBO</h1>
              <p className="text-xs text-gray-600">Voices of Hope</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium" data-testid="nav-home">
              Home
            </Link>
            
            {/* Who We Are Dropdown */}
            <div className="dropdown relative group">
              <button className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium flex items-center" data-testid="nav-who-we-are">
                Who We Are <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="dropdown-menu absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/about/history" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-history">
                  Our History
                </Link>
                <Link href="/about/team" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-team">
                  Our Team
                </Link>
                <Link href="/about/partnerships" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-partnerships">
                  Community & Partnerships
                </Link>
                <Link href="/about/scholarships" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-scholarships">
                  Scholarships
                </Link>
              </div>
            </div>

            {/* What We Do Dropdown */}
            <div className="dropdown relative group">
              <button className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium flex items-center" data-testid="nav-what-we-do">
                What We Do <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="dropdown-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/programs/voices" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-voices">
                  Give Voices to Women
                </Link>
                <Link href="/programs/education" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-education">
                  Education & Programs
                </Link>
                <Link href="/programs/beneficiaries" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-beneficiaries">
                  Target Beneficiaries
                </Link>
              </div>
            </div>

            {/* Community Dropdown */}
            <div className="dropdown relative group">
              <button className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium flex items-center" data-testid="nav-community">
                Community <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="dropdown-menu absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/community/events" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-events">
                  Events
                </Link>
                <Link href="/community/photos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-photos">
                  Photos
                </Link>
                <Link href="/community/blog" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-blog">
                  Blogs & Features
                </Link>
                <Link href="/community/shop" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-shop">
                  Shop
                </Link>
              </div>
            </div>

            {/* Donate Dropdown */}
            <div className="dropdown relative group">
              <button className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium flex items-center" data-testid="nav-donate">
                Donate <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="dropdown-menu absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/donate" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-general-donations">
                  General Donations
                </Link>
                <Link href="/donate/gifts" className="block px-4 py-3 text-sm text-gray-700 hover:bg-earth-100 transition-colors" data-testid="nav-gifts">
                  Gifts
                </Link>
              </div>
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium" data-testid="nav-contact">
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/admin" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium" data-testid="nav-admin">
                  Admin
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm" data-testid="button-logout">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth" data-testid="nav-auth">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
            
            <Link href="/donate" data-testid="button-donate-header">
              <Button className="bg-accent text-white hover:bg-orange-600">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2" 
            onClick={toggleMobileMenu}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 font-medium" data-testid="mobile-nav-home">
              Home
            </Link>
            <div className="border-l-2 border-earth-300 pl-4 space-y-2">
              <p className="font-medium text-primary">Who We Are</p>
              <Link href="/about/history" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-history">
                Our History
              </Link>
              <Link href="/about/team" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-team">
                Our Team
              </Link>
              <Link href="/about/partnerships" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-partnerships">
                Community & Partnerships
              </Link>
              <Link href="/about/scholarships" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-scholarships">
                Scholarships
              </Link>
            </div>
            <div className="border-l-2 border-earth-300 pl-4 space-y-2">
              <p className="font-medium text-primary">What We Do</p>
              <Link href="/programs/voices" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-voices">
                Give Voices to Women
              </Link>
              <Link href="/programs/education" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-education">
                Education & Programs
              </Link>
              <Link href="/programs/beneficiaries" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-beneficiaries">
                Target Beneficiaries
              </Link>
            </div>
            <div className="border-l-2 border-earth-300 pl-4 space-y-2">
              <p className="font-medium text-primary">Community</p>
              <Link href="/community/events" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-events">
                Events
              </Link>
              <Link href="/community/photos" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-photos">
                Photos
              </Link>
              <Link href="/community/blog" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-blog">
                Blogs & Features
              </Link>
              <Link href="/community/shop" className="block py-1 text-sm text-gray-600" data-testid="mobile-nav-shop">
                Shop
              </Link>
            </div>
            <Link href="/contact" className="block py-2 text-gray-700 font-medium" data-testid="mobile-nav-contact">
              Contact
            </Link>
            {user && (
              <Link href="/admin" className="block py-2 text-gray-700 font-medium" data-testid="mobile-nav-admin">
                Admin Dashboard
              </Link>
            )}
            <Button className="w-full bg-accent text-white font-medium mt-4" data-testid="mobile-button-donate">
              Donate Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
