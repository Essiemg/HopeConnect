import { Heart, Users, Book, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40">
        <img 
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Kenyan women empowerment community" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Raising Her Voice,<br/>
          <span className="text-secondary">Lifting Her Future</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
          Amplifying the voices of girls and women through education, advocacy, leadership, and community inclusion across Kenya.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link href="/donate" data-testid="button-donate-hero">
            <Button size="lg" className="bg-accent hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
              <Heart className="mr-2 h-5 w-5" />
              Donate Today
            </Button>
          </Link>
          <Link href="/community/events" data-testid="button-join-community">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
          </Link>
          <Link href="/programs/education" data-testid="button-learn-more">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <Book className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-secondary transition-colors"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
