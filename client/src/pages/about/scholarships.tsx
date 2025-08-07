import { GraduationCap, Heart, Star, Users, BookOpen, Award, CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function ScholarshipsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Education Scholarships
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Empowering women and girls through education. Our scholarship programs provide
                financial support and mentorship to help students achieve their academic dreams.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Apply for Scholarship
              </Button>
            </div>
          </div>
        </div>

        {/* Scholarship Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Scholarship Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Since our inception, we've supported hundreds of students in their educational journey,
                breaking barriers and creating opportunities for success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">500+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Scholarships Awarded</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">85%</h3>
                  <p className="text-gray-600 dark:text-gray-300">Graduation Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">12</h3>
                  <p className="text-gray-600 dark:text-gray-300">Partner Schools</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">95%</h3>
                  <p className="text-gray-600 dark:text-gray-300">Employment Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scholarship Programs */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Scholarship Programs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We offer various scholarship programs tailored to different educational levels
                and specific needs of our beneficiaries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Primary Education Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Supporting girls from disadvantaged backgrounds to complete their primary education
                    and transition successfully to secondary school.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Ages 6-14</Badge>
                    <Badge variant="secondary">Full Tuition</Badge>
                    <Badge variant="secondary">School Supplies</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Secondary Education Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Empowering young women to complete their secondary education and prepare
                    for higher education or vocational training.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Ages 14-18</Badge>
                    <Badge variant="secondary">Boarding Fees</Badge>
                    <Badge variant="secondary">Mentorship</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Higher Education Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Supporting exceptional students to pursue university degrees, professional
                    courses, and specialized training programs.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">University Level</Badge>
                    <Badge variant="secondary">Professional Courses</Badge>
                    <Badge variant="secondary">Career Guidance</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Vocational Training Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Providing opportunities for skills development in trades, technology,
                    and entrepreneurship for immediate employment prospects.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Skills Training</Badge>
                    <Badge variant="secondary">Certification</Badge>
                    <Badge variant="secondary">Job Placement</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle>Emergency Education Fund</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Providing urgent educational support for students facing unexpected
                    financial hardships that threaten their academic progress.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Emergency Support</Badge>
                    <Badge variant="secondary">Quick Processing</Badge>
                    <Badge variant="secondary">Counseling</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle>Leadership Development Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Special program for promising students showing leadership potential,
                    combining education support with leadership training.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Leadership Training</Badge>
                    <Badge variant="secondary">Mentorship Program</Badge>
                    <Badge variant="secondary">Community Service</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  How to Apply
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our application process is designed to be accessible and fair,
                  ensuring deserving students get the support they need.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Check Eligibility</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Review our scholarship criteria to ensure you meet the requirements
                        for your desired program level.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Prepare Documents</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Gather required documents including academic records, financial statements,
                        and recommendation letters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Submit Application</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Complete and submit your application with all required documents
                        before the deadline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interview Process</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Shortlisted candidates will be invited for interviews to assess
                        their motivation and commitment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Ready to Apply?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start your educational journey with our scholarship programs.
                    Applications are reviewed quarterly.
                  </p>
                  <div className="space-y-4">
                    <Button className="w-full bg-primary hover:bg-primary/90" data-testid="button-apply-scholarship">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-download-guidelines">
                      Download Application Guidelines
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Next Application Deadline
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200">
                      March 31, 2025
                    </p>
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
                Success Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet some of our scholarship recipients who have gone on to make significant
                impacts in their communities and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    AK
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Ann Kamau
                  </h3>
                  <p className="text-primary font-medium mb-4">Medical Doctor</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "The scholarship didn't just pay for my education - it gave me hope and
                    the confidence to dream big. Now I'm serving my community as a doctor."
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    MW
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Mary Wanjiku
                  </h3>
                  <p className="text-primary font-medium mb-4">Teacher & Education Advocate</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "VOH-CBO believed in me when no one else did. Now I'm empowering the next
                    generation of girls to pursue their dreams through education."
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    GO
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Grace Ochieng
                  </h3>
                  <p className="text-primary font-medium mb-4">Software Engineer</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "From a rural village to working in tech - this journey wouldn't have been
                    possible without VOH-CBO's support and mentorship program."
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