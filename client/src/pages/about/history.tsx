import { History, CheckCircle, Users, Award, Heart } from "lucide-react";
import Layout from "@/components/Layout";

export default function HistoryPage() {
  const milestones = [
    {
      year: "2016",
      title: "Foundation of VOH-CBO",
      description: "Voices of Hope Community-Based Organisation was founded with a vision to amplify the voices of girls and women in Kenya.",
      icon: Heart,
    },
    {
      year: "2017",
      title: "First Education Program Launched",
      description: "Started our flagship digital literacy program, reaching 50 young women in rural communities.",
      icon: CheckCircle,
    },
    {
      year: "2018",
      title: "Community Partnerships Established",
      description: "Formed strategic partnerships with local schools and women's groups to expand our reach.",
      icon: Users,
    },
    {
      year: "2019",
      title: "Leadership Training Initiative",
      description: "Launched comprehensive leadership development programs for women and girls.",
      icon: Award,
    },
    {
      year: "2020",
      title: "Digital Expansion",
      description: "Adapted to COVID-19 by expanding online programs and virtual mentorship opportunities.",
      icon: CheckCircle,
    },
    {
      year: "2021",
      title: "Scholarship Program",
      description: "Established scholarship fund providing educational support to underprivileged girls.",
      icon: Award,
    },
    {
      year: "2022",
      title: "1000+ Women Empowered Milestone",
      description: "Reached our milestone of empowering over 1,000 women and girls across Kenya.",
      icon: Users,
    },
    {
      year: "2023",
      title: "International Recognition",
      description: "Received recognition from international organizations for our impactful community work.",
      icon: Award,
    },
    {
      year: "2024",
      title: "Digital Platform Launch",
      description: "Launched our comprehensive digital platform to better serve our community and supporters.",
      icon: CheckCircle,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Our History</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to transformative impact. Discover the journey of Voices of Hope 
              Community-Based Organisation and how we've grown to empower thousands of women and girls across Kenya.
            </p>
          </div>

          {/* Mission Origin Story */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">Where It All Began</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    In 2016, a group of passionate advocates recognized a critical need in Kenyan communities: 
                    the voices of girls and women were often unheard, their potential untapped, and their 
                    opportunities limited by systemic barriers.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    What started as informal mentorship sessions in local community centers has grown into 
                    a comprehensive organization that addresses education, advocacy, leadership development, 
                    and community inclusion.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Today, VOH-CBO stands as a beacon of hope, having directly impacted over 1,250 women 
                    and girls, provided 89 scholarships, and reached 24 communities across Kenya.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8">
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Our Founding Principles</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Every woman's voice matters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Education is a fundamental right</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Community-driven solutions work</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Sustainable change takes time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* History line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-0.5"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year} 
                    className={`relative flex items-start ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    data-testid={`milestone-${milestone.year}`}
                  >
                    {/* History dot */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full transform md:-translate-x-4 flex items-center justify-center z-10">
                      <milestone.icon className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-3">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-primary mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center">
            <h2 className="font-serif text-3xl font-bold mb-8">8 Years of Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">1,250+</div>
                <div className="text-lg opacity-90">Women Empowered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">89</div>
                <div className="text-lg opacity-90">Scholarships Provided</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24</div>
                <div className="text-lg opacity-90">Communities Reached</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Partnerships Formed</div>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-20 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Looking Forward</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              As we continue our journey, we remain committed to our mission of amplifying voices and 
              creating opportunities. Our vision for the future includes expanding to reach even more 
              communities, developing innovative programs, and building lasting partnerships that create 
              sustainable change.
            </p>
            <a 
              href="/programs/education" 
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors inline-block"
              data-testid="button-learn-programs"
            >
              Learn About Our Programs
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
