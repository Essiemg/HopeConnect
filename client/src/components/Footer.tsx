import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Heart className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-white">VOH-CBO</h1>
                <p className="text-xs text-gray-300">Voices of Hope</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Amplifying the voices of girls and women through education, advocacy, leadership, and community inclusion across Kenya. Together, we're building a future where every woman can thrive.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200" data-testid="footer-facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200" data-testid="footer-twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200" data-testid="footer-instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200" data-testid="footer-linkedin">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-about">About Us</Link></li>
              <li><Link href="/programs" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-programs">Our Programs</Link></li>
              <li><Link href="/about/team" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-team">Our Team</Link></li>
              <li><Link href="/#impact" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-impact">Impact</Link></li>
              <li><Link href="/community/events" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-events">Events</Link></li>
              <li><Link href="/community/blog" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-blog">Blog</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><Link href="/donate" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-donate">Donate</Link></li>
              <li><Link href="/volunteer" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-volunteer">Volunteer</Link></li>
              <li><Link href="/partnerships" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-partnerships">Partner With Us</Link></li>
              <li><Link href="/fundraise" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-fundraise">Fundraise</Link></li>
              <li><Link href="/community/shop" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-shop">Shop</Link></li>
              <li><Link href="/newsletter" className="text-gray-300 hover:text-accent transition-colors" data-testid="footer-newsletter">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-serif text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">Get the latest news and impact stories delivered to your inbox.</p>
            </div>
            <div className="flex max-w-md">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                data-testid="input-newsletter-email"
              />
              <Button className="bg-accent hover:bg-orange-600 ml-2" data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 md:flex md:items-center md:justify-between">
          <div className="text-gray-300 text-sm">
            <p>&copy; 2024 Voices of Hope Community-Based Organisation (VOH-CBO). All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-300">
              <li><Link href="/privacy" className="hover:text-accent transition-colors" data-testid="footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors" data-testid="footer-terms">Terms of Service</Link></li>
              <li><Link href="/accessibility" className="hover:text-accent transition-colors" data-testid="footer-accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
