import { Users, Heart, Target, Globe, Award, CheckCircle, BookOpen, Home, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function BeneficiariesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Target Beneficiaries
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our programs are designed to reach and empower specific groups of women and girls
                who face unique challenges and have the greatest potential for positive impact.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Learn How to Help
              </Button>
            </div>
          </div>
        </div>

        {/* Beneficiary Groups */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Who We Serve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We focus our efforts on reaching women and girls who face the greatest barriers
                to education, economic empowerment, and social participation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle>Girls Out of School</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Young girls who have dropped out of school due to poverty, early marriage,
                    pregnancy, or family responsibilities.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Ages 10-18</Badge>
                    <Badge variant="secondary">Rural & Urban</Badge>
                    <Badge variant="secondary">Second Chance Education</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Scholarship programs</li>
                      <li>• Flexible learning schedules</li>
                      <li>• Family engagement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Young Mothers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Young women who became mothers early and need support to continue
                    their education or develop skills for economic independence.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Ages 15-25</Badge>
                    <Badge variant="secondary">Teen Parents</Badge>
                    <Badge variant="secondary">Single Mothers</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Childcare support</li>
                      <li>• Parenting education</li>
                      <li>• Skills training</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Women in Rural Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Women living in remote rural communities with limited access to
                    education, healthcare, and economic opportunities.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Rural Communities</Badge>
                    <Badge variant="secondary">All Ages</Badge>
                    <Badge variant="secondary">Limited Resources</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Mobile outreach programs</li>
                      <li>• Agricultural training</li>
                      <li>• Health education</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Unemployed Women</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Women seeking employment or starting businesses but lacking
                    the necessary skills, capital, or network connections.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Adults 18+</Badge>
                    <Badge variant="secondary">Job Seekers</Badge>
                    <Badge variant="secondary">Entrepreneurs</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Vocational training</li>
                      <li>• Business mentorship</li>
                      <li>• Microfinance access</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Women with Disabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Women and girls with physical, intellectual, or sensory disabilities
                    who face additional barriers to education and employment.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">All Ages</Badge>
                    <Badge variant="secondary">Various Disabilities</Badge>
                    <Badge variant="secondary">Inclusive Programs</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Assistive technology</li>
                      <li>• Accessible facilities</li>
                      <li>• Specialized training</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle>Refugee & Displaced Women</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Women and girls who have been displaced by conflict, natural disasters,
                    or other circumstances and need support rebuilding their lives.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Refugees</Badge>
                    <Badge variant="secondary">IDPs</Badge>
                    <Badge variant="secondary">Emergency Support</Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Support:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Emergency education</li>
                      <li>• Trauma counseling</li>
                      <li>• Integration support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Reach & Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Since our inception, we've reached thousands of women and girls across Kenya,
                providing them with opportunities to transform their lives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                  <p className="text-gray-600 dark:text-gray-300">Direct Beneficiaries</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Women and girls directly served by our programs
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">8,000+</div>
                  <p className="text-gray-600 dark:text-gray-300">Indirect Beneficiaries</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Family and community members impacted
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                  <p className="text-gray-600 dark:text-gray-300">Counties Reached</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Across Kenya's 47 counties
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
                  <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Program completion and achievement
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  How We Select Beneficiaries
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We use a comprehensive selection process to ensure our programs reach
                  those who need them most and can benefit the greatest.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Outreach</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We work with local leaders, schools, and organizations to identify
                        women and girls who could benefit from our programs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Needs Assessment</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We conduct thorough assessments to understand each candidate's
                        specific needs, challenges, and potential.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Priority Scoring</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We use criteria including vulnerability, motivation, community impact
                        potential, and resource availability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Validation</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Local committees verify candidates and ensure fair, transparent
                        selection that reflects community priorities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Selection Criteria
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Demonstrated need and vulnerability
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Motivation and commitment to change
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Potential for community impact
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Support from family/community
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Geographic diversity
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Age-appropriate program alignment
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Beneficiary Success Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet some of our beneficiaries who have transformed their lives
                and are now empowering others in their communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      LM
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Lucy Mwangi
                    </h3>
                    <p className="text-primary font-medium">Former School Dropout → Teacher</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "I dropped out at 14 due to pregnancy. VOH-CBO helped me return to school
                    at 16. Now I'm a qualified teacher inspiring other young mothers."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      FN
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Faith Nyong'o
                    </h3>
                    <p className="text-primary font-medium">Rural Woman → Business Owner</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "As a rural farmer, I struggled to feed my family. Through business training,
                    I now run a successful agribusiness employing 12 women."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      AK
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Amina Kone
                    </h3>
                    <p className="text-primary font-medium">Refugee → Community Leader</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "I arrived as a refugee with nothing. The skills training and support
                    helped me integrate and now I lead programs for other refugees."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Help Us Reach More Women
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Your support helps us identify and empower more women and girls
              who can become agents of change in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
                data-testid="button-donate"
              >
                <Heart className="mr-2 h-5 w-5" />
                Support Our Work
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-nominate"
              >
                Nominate a Beneficiary
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}