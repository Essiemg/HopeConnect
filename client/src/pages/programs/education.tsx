import { useQuery } from "@tanstack/react-query";
import { BookOpen, Users, Award, Target, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import type { Program } from "@shared/schema";

export default function EducationPage() {
  const { data: programs, isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const educationPrograms = programs?.filter(program => 
    program.category === 'education' || 
    program.title.toLowerCase().includes('education') ||
    program.title.toLowerCase().includes('leadership') ||
    program.title.toLowerCase().includes('digital')
  ) || [];

  const programCategories = [
    {
      title: "Digital Literacy",
      description: "Empowering women with essential digital skills for the modern world",
      icon: BookOpen,
      programs: educationPrograms.filter(p => p.title.toLowerCase().includes('digital')),
    },
    {
      title: "Leadership Development",
      description: "Building confident leaders who can drive change in their communities",
      icon: Target,
      programs: educationPrograms.filter(p => p.title.toLowerCase().includes('leadership')),
    },
    {
      title: "Education Support",
      description: "Providing educational resources and opportunities for academic success",
      icon: Award,
      programs: educationPrograms.filter(p => p.title.toLowerCase().includes('education')),
    },
    {
      title: "Mentorship Programs",
      description: "Connecting young women with experienced mentors for guidance and support",
      icon: Users,
      programs: educationPrograms.filter(p => p.title.toLowerCase().includes('mentor')),
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Education & Programs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive educational initiatives designed to empower, educate, and elevate women and girls 
              across Kenya through innovative learning opportunities and skill development programs.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">1,250+</div>
              <div className="text-sm text-gray-600">Women Educated</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">89</div>
              <div className="text-sm text-gray-600">Scholarships Awarded</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-gray-600">Active Programs</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <div className="text-sm text-gray-600">Communities Served</div>
            </div>
          </div>

          {/* Program Categories */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">Our Program Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {programCategories.map((category) => (
                <Card key={category.title} className="p-6 hover:shadow-xl transition-shadow duration-300" data-testid={`card-${category.title.toLowerCase().replace(' ', '-')}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 mb-2">
                      {category.programs.length} active program{category.programs.length !== 1 ? 's' : ''}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Programs */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">Featured Programs</h2>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-32 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {educationPrograms.slice(0, 6).map((program) => (
                  <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300" data-testid={`card-program-${program.id}`}>
                    {program.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={program.imageUrl} 
                          alt={program.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-3">{program.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                      <Button variant="outline" size="sm" data-testid={`button-learn-more-${program.id}`}>
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && educationPrograms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No programs available at the moment. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Scholarship Information */}
          <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">Scholarship Program</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our scholarship program provides financial support to deserving girls and young women 
                  who demonstrate academic excellence and leadership potential but face financial barriers 
                  to their education.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-accent mr-3" />
                    <span className="text-gray-700">89 scholarships awarded to date</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-accent mr-3" />
                    <span className="text-gray-700">Covers tuition, books, and supplies</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-accent mr-3" />
                    <span className="text-gray-700">Mentorship and career guidance included</span>
                  </div>
                </div>
                <Link href="/about/scholarships">
                  <Button className="bg-accent hover:bg-orange-600" data-testid="button-scholarship-info">
                    Scholarship Information
                  </Button>
                </Link>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-serif text-xl font-bold text-primary mb-4">Success Story</h3>
                <blockquote className="text-gray-600 italic mb-4">
                  "The VOH-CBO scholarship program changed my life. Not only did it help me complete 
                  my education, but the mentorship I received gave me the confidence to pursue my 
                  dreams in technology."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">AM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Amina M.</p>
                    <p className="text-sm text-gray-500">Computer Science Graduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join us in our mission to empower women and girls through education. 
              Whether through volunteering, donations, or partnerships, your support makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-donate-programs">
                  <Heart className="mr-2 h-5 w-5" />
                  Support Our Programs
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  data-testid="button-volunteer-programs"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
