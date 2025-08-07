import { Megaphone, Heart, Users, Award, Target, CheckCircle, Mic, Radio, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function VoicesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Megaphone className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Give Voices to Women
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Amplifying women's voices through advocacy, media, and community platforms.
                We believe every woman deserves to be heard and to shape the conversations that affect her life.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Join Our Voice
              </Button>
            </div>
          </div>
        </div>

        {/* Program Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Amplifying Voices Across Kenya
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Through our voice amplification programs, we've helped thousands of women
                share their stories, advocate for their rights, and lead change in their communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">1,200+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Women Speakers Trained</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Radio className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">50+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Media Appearances</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">25</h3>
                  <p className="text-gray-600 dark:text-gray-300">Stories Published</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">15</h3>
                  <p className="text-gray-600 dark:text-gray-300">Policy Changes Influenced</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Voice Programs */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Voice Programs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We provide multiple platforms and training opportunities for women to find,
                develop, and amplify their voices in various contexts and communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                    <Mic className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle>Public Speaking Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comprehensive training programs to help women develop confidence
                    and skills in public speaking and presentation.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Confidence Building</Badge>
                    <Badge variant="secondary">Presentation Skills</Badge>
                    <Badge variant="secondary">Voice Coaching</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Radio className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Media Training & Advocacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Training women to effectively engage with media, share their stories,
                    and advocate for causes they care about.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Media Relations</Badge>
                    <Badge variant="secondary">Interview Skills</Badge>
                    <Badge variant="secondary">Message Crafting</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Storytelling Workshops</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Helping women craft and share their personal stories to inspire
                    others and create meaningful connections.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Story Development</Badge>
                    <Badge variant="secondary">Writing Skills</Badge>
                    <Badge variant="secondary">Performance</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Community Forums</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Regular community meetings and forums where women can discuss
                    issues, share experiences, and plan collective action.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Community Dialogue</Badge>
                    <Badge variant="secondary">Issue Advocacy</Badge>
                    <Badge variant="secondary">Collective Action</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Policy Advocacy Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Empowering women with knowledge and skills to engage in policy
                    discussions and advocate for legislative changes.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Policy Analysis</Badge>
                    <Badge variant="secondary">Government Relations</Badge>
                    <Badge variant="secondary">Campaign Strategy</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle>Mentorship Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Pairing emerging women leaders with experienced mentors who provide
                    guidance on voice development and leadership skills.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">One-on-One Mentoring</Badge>
                    <Badge variant="secondary">Leadership Development</Badge>
                    <Badge variant="secondary">Network Building</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Transforming Lives Through Voice
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  When women find their voice, they don't just change their own lives –
                  they transform their families, communities, and society as a whole.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Policy Influence</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our participants have successfully advocated for 15 policy changes
                        affecting women's rights and community development.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Leadership Positions</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Over 300 program graduates now hold leadership positions in their
                        communities, organizations, and local government.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Media Representation</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Women from our programs regularly appear in media as experts
                        and advocates on issues affecting their communities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Change</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Communities with active program participants show measurable
                        improvements in women's participation and gender equality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">85%</div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Increased confidence in public speaking
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">72%</div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Took on leadership roles after training
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Report feeling empowered to speak up
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Would recommend program to others
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Voice?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of women who have transformed their lives and communities
              through our voice amplification programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
                data-testid="button-join-program"
              >
                <Megaphone className="mr-2 h-5 w-5" />
                Join Our Program
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Voices of Change
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear from women who have found their voice and are making a difference
                in their communities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      SM
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Sarah Muthoni
                    </h3>
                    <p className="text-primary font-medium">Community Leader</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    "Before joining VOH-CBO's voice program, I was afraid to speak in public.
                    Now I lead community meetings and advocate for women's rights in my area."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      JW
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Joyce Wanjama
                    </h3>
                    <p className="text-primary font-medium">Policy Advocate</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    "The media training helped me become a spokesperson for our cause.
                    I've appeared on radio and TV, sharing our community's story."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      EA
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      Esther Akinyi
                    </h3>
                    <p className="text-primary font-medium">Entrepreneur</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    "Finding my voice helped me start my own business and inspire other women
                    to become entrepreneurs. We're changing our economic story."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}