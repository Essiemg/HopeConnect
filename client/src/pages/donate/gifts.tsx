import { Gift, Heart, Star, Check, ShoppingBag, Users, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function GiftsPage() {
  const gifts = [
    {
      id: 1,
      name: "School Supplies Kit",
      price: 500,
      description: "Complete school supplies for one girl for a full term",
      impact: "Helps 1 girl attend school without worrying about basic supplies",
      category: "Education",
      icon: BookOpen,
      popular: false,
      items: ["Textbooks", "Exercise books", "Pens & pencils", "School bag", "Uniform"]
    },
    {
      id: 2,
      name: "Monthly Scholarship",
      price: 2000,
      description: "One month of schooling including fees, meals, and transport",
      impact: "Provides full educational support for 1 girl for a month",
      category: "Education",
      icon: Star,
      popular: true,
      items: ["School fees", "Lunch program", "Transportation", "Extra tutoring", "Mentorship"]
    },
    {
      id: 3,
      name: "Skills Training Course",
      price: 3500,
      description: "Complete vocational training course for one woman",
      impact: "Equips 1 woman with marketable skills for employment",
      category: "Skills",
      icon: Users,
      popular: false,
      items: ["Course materials", "Training fees", "Certification", "Job placement support", "Startup kit"]
    },
    {
      id: 4,
      name: "Microfinance Startup Kit",
      price: 5000,
      description: "Business startup capital and training for an entrepreneur",
      impact: "Helps 1 woman start her own business and become self-sufficient",
      category: "Economic",
      icon: ShoppingBag,
      popular: true,
      items: ["Startup capital", "Business training", "Mentorship", "Marketing support", "Financial literacy"]
    },
    {
      id: 5,
      name: "Health & Wellness Package",
      price: 1500,
      description: "Health education and basic healthcare for a family",
      impact: "Improves health outcomes for 1 family (5-7 people)",
      category: "Health",
      icon: Heart,
      popular: false,
      items: ["Health screening", "Education materials", "First aid kit", "Nutrition counseling", "Hygiene supplies"]
    },
    {
      id: 6,
      name: "Leadership Training Program",
      price: 4000,
      description: "Comprehensive leadership development for emerging leaders",
      impact: "Develops 1 community leader who will impact hundreds more",
      category: "Leadership",
      icon: Star,
      popular: false,
      items: ["Workshop attendance", "Leadership materials", "Networking events", "Mentorship program", "Project funding"]
    },
    {
      id: 7,
      name: "Safe Housing Support",
      price: 8000,
      description: "Emergency housing and support for women in crisis",
      impact: "Provides safe shelter and support for 1 woman and her children",
      category: "Safety",
      icon: Home,
      popular: false,
      items: ["Emergency accommodation", "Counseling services", "Legal support", "Transition planning", "Life skills training"]
    },
    {
      id: 8,
      name: "Community Program Fund",
      price: 10000,
      description: "Fund an entire community program reaching multiple beneficiaries",
      impact: "Impacts entire community of 50-100 women and girls",
      category: "Community",
      icon: Users,
      popular: true,
      items: ["Program implementation", "Community mobilization", "Training materials", "Local coordinator", "Follow-up support"]
    }
  ];

  const categories = ["All", "Education", "Skills", "Economic", "Health", "Leadership", "Safety", "Community"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Meaningful Gifts
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Give gifts that make a real difference. Choose from our catalog of meaningful donations
                that directly support women and girls in their journey to empowerment.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Start Giving
              </Button>
            </div>
          </div>
        </div>

        {/* Gift Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Gift's Impact
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Every gift in our catalog has been carefully designed to create maximum impact
                for the women and girls we serve across Kenya.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">Direct</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your gift goes directly to specific programs and beneficiaries
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">Measurable</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Track the real-world impact of your contribution
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">Meaningful</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Creates lasting change in the lives of women and girls
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">Multiplied</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Beneficiaries become leaders who help others in their communities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gift Categories Filter */}
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={category === "All" ? "bg-primary text-white" : ""}
                  data-testid={`filter-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gifts Catalog */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {gifts.map((gift) => {
                const IconComponent = gift.icon;
                return (
                  <Card key={gift.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gift.popular ? 'ring-2 ring-primary' : ''}`} data-testid={`gift-card-${gift.id}`}>
                    {gift.popular && (
                      <div className="bg-primary text-white text-center py-2 text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{gift.category}</Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{gift.name}</CardTitle>
                      <div className="text-2xl font-bold text-primary mb-2">
                        KES {gift.price.toLocaleString()}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {gift.description}
                      </p>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                        <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                          <Check className="h-4 w-4 inline mr-1" />
                          {gift.impact}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Includes:</h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {gift.items.slice(0, 3).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                          {gift.items.length > 3 && (
                            <li className="text-gray-500">• +{gift.items.length - 3} more items</li>
                          )}
                        </ul>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90" data-testid={`button-give-${gift.id}`}>
                        <Gift className="mr-2 h-4 w-4" />
                        Give This Gift
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Custom Gift Option */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Create a Custom Gift
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Don't see exactly what you're looking for? Create a personalized gift
                    by combining different program elements or specifying how you'd like
                    your donation to be used.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Personalized Impact</h3>
                        <p className="text-gray-600 dark:text-gray-300">Choose specific programs or beneficiaries to support</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Flexible Amount</h3>
                        <p className="text-gray-600 dark:text-gray-300">Set your own donation amount and see how it's used</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Regular Updates</h3>
                        <p className="text-gray-600 dark:text-gray-300">Receive updates on how your custom gift is making a difference</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Design Your Gift
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Work with our team to create a meaningful gift that aligns perfectly
                    with your values and desired impact.
                  </p>
                  <div className="space-y-4">
                    <Button className="w-full bg-primary hover:bg-primary/90" data-testid="button-custom-gift">
                      <Gift className="mr-2 h-5 w-5" />
                      Create Custom Gift
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-speak-advisor">
                      Speak with Gift Advisor
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Certificates */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Gift Certificates Available
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Perfect for special occasions, our gift certificates allow your loved ones
                to choose how they want to make a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                    <Gift className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Birthday Gifts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Celebrate birthdays by giving the gift of education, empowerment,
                    and opportunity to women and girls in Kenya.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-birthday-gift">
                    Send Birthday Gift
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Holiday Gifts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Make holidays more meaningful by giving gifts that create
                    lasting change in communities across Kenya.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-holiday-gift">
                    Send Holiday Gift
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                    <Star className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Memorial Gifts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Honor the memory of loved ones by supporting causes they
                    cared about and creating a lasting legacy.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-memorial-gift">
                    Send Memorial Gift
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Giving Today
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Choose a meaningful gift that will transform lives and create
              lasting change for women and girls across Kenya.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              data-testid="button-browse-gifts"
            >
              <Gift className="mr-2 h-5 w-5" />
              Browse All Gifts
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}