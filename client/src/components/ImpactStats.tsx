export default function ImpactStats() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Creating meaningful change in communities across Kenya through dedicated programs and initiatives
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center" data-testid="stat-women-empowered">
            <div className="text-5xl font-bold mb-2">1,250+</div>
            <p className="text-lg opacity-90">Women Empowered</p>
          </div>
          <div className="text-center" data-testid="stat-scholarships">
            <div className="text-5xl font-bold mb-2">89</div>
            <p className="text-lg opacity-90">Scholarships Provided</p>
          </div>
          <div className="text-center" data-testid="stat-communities">
            <div className="text-5xl font-bold mb-2">24</div>
            <p className="text-lg opacity-90">Communities Reached</p>
          </div>
          <div className="text-center" data-testid="stat-years">
            <div className="text-5xl font-bold mb-2">8</div>
            <p className="text-lg opacity-90">Years of Service</p>
          </div>
        </div>
      </div>
    </section>
  );
}
