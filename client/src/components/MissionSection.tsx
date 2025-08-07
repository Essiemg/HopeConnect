import { Target, Eye, HandHeart } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="py-20 bg-white" id="mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Our Foundation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on the pillars of empowerment, education, and community transformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-earth-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-mission">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="text-white h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To amplify the voices of girls and women by promoting education, advocacy, leadership, and community inclusion, creating lasting positive change in their lives and communities.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-earth-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-vision">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="text-white h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where every girl and woman has the opportunity to thrive, lead, and contribute meaningfully to their communities and society at large.
            </p>
          </div>

          {/* Values */}
          <div className="bg-earth-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-values">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-6">
              <HandHeart className="text-white h-8 w-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Core Values</h3>
            <p className="text-gray-600 leading-relaxed">
              Empowerment, Integrity, Inclusivity, Excellence, and Community-driven approach guide everything we do in our mission to transform lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
