import { Heart, Handshake, Users, Building2, Globe, Target, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function PartnershipsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Handshake className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Community & Partnerships
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Building stronger communities through meaningful collaborations and strategic partnerships
                that amplify our impact in empowering women and girls across Kenya.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Partner With Us
              </Button>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Community Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Through our partnerships, we've created lasting change in communities across Kenya,
                reaching thousands of women and girls with life-changing programs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">2,500+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Women & Girls Reached</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">15</h3>
                  <p className="text-gray-600 dark:text-gray-300">Community Centers</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">50+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Active Programs</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">8</h3>
                  <p className="text-gray-600 dark:text-gray-300">Counties Served</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Partners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We work with organizations that share our vision of empowering women and girls
                through education, advocacy, and community development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-3 h-6 w-6 text-primary" />
                    Local Government
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Collaborating with county governments to implement policies that support
                    women's empowerment and gender equality initiatives.
                  </p>
                  <Badge variant="secondary">Policy Advocacy</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-3 h-6 w-6 text-green-600" />
                    Educational Institutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Partnering with schools and universities to provide scholarships and
                    educational opportunities for girls and young women.
                  </p>
                  <Badge variant="secondary">Education</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-3 h-6 w-6 text-red-500" />
                    NGO Networks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Working with other NGOs and community organizations to amplify our reach
                    and share resources for maximum impact.
                  </p>
                  <Badge variant="secondary">Community Development</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-3 h-6 w-6 text-blue-600" />
                    International Organizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Collaborating with global partners to bring international expertise and
                    funding to support local initiatives.
                  </p>
                  <Badge variant="secondary">Global Partnership</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-3 h-6 w-6 text-purple-600" />
                    Community Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Working directly with traditional and religious leaders to promote
                    cultural change and community acceptance of women's empowerment.
                  </p>
                  <Badge variant="secondary">Community Engagement</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-3 h-6 w-6 text-orange-600" />
                    Private Sector
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Engaging with businesses to create employment opportunities and
                    entrepreneurship programs for women in our communities.
                  </p>
                  <Badge variant="secondary">Economic Empowerment</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Partner With Us?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Join us in creating sustainable change that empowers women and girls to reach
                  their full potential and contribute meaningfully to their communities.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Proven Impact</h3>
                      <p className="text-gray-600 dark:text-gray-300">Track record of successful programs with measurable outcomes</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Community Trust</h3>
                      <p className="text-gray-600 dark:text-gray-300">Deep relationships with communities we serve</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Transparency</h3>
                      <p className="text-gray-600 dark:text-gray-300">Regular reporting and accountability in all our programs</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Innovation</h3>
                      <p className="text-gray-600 dark:text-gray-300">Creative approaches to addressing complex social challenges</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to Partner?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Let's discuss how we can work together to create meaningful change
                  in communities across Kenya.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-primary hover:bg-primary/90" data-testid="button-contact-partnership">
                    Contact Us for Partnership
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-download-info">
                    Download Partnership Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}