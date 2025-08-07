import { Camera, Heart, Calendar, MapPin, Users, Download, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function PhotosPage() {
  // Mock data for gallery - replace with actual API call
  const photoCategories = [
    { name: "All Photos", count: 150, active: true },
    { name: "Events", count: 45 },
    { name: "Programs", count: 38 },
    { name: "Team", count: 22 },
    { name: "Community", count: 35 },
    { name: "Achievements", count: 10 }
  ];

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop",
      title: "Women's Leadership Workshop",
      description: "Empowering women with leadership skills in Nairobi",
      category: "Programs",
      date: "2024-01-15",
      location: "Nairobi, Kenya",
      views: 245
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=300&fit=crop",
      title: "Scholarship Recipients Graduation",
      description: "Celebrating our scholarship recipients' achievements",
      category: "Achievements",
      date: "2024-02-10",
      location: "Kisumu, Kenya",
      views: 312
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop",
      title: "Community Outreach Program",
      description: "Reaching rural communities with health education",
      category: "Community",
      date: "2024-01-28",
      location: "Nakuru County",
      views: 189
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=300&fit=crop",
      title: "Skills Training Workshop",
      description: "Vocational skills training for young women",
      category: "Programs",
      date: "2024-02-05",
      location: "Mombasa, Kenya",
      views: 176
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop",
      title: "Annual Team Meeting",
      description: "Our dedicated team planning future programs",
      category: "Team",
      date: "2024-01-20",
      location: "Nairobi, Kenya",
      views: 134
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop",
      title: "International Women's Day Celebration",
      description: "Celebrating women's achievements and potential",
      category: "Events",
      date: "2024-03-08",
      location: "Nairobi, Kenya",
      views: 398
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=300&fit=crop",
      title: "Microfinance Group Meeting",
      description: "Women's savings and loan association meeting",
      category: "Community",
      date: "2024-02-15",
      location: "Eldoret, Kenya",
      views: 156
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=300&fit=crop",
      title: "Youth Mentorship Program",
      description: "Connecting young women with role models",
      category: "Programs",
      date: "2024-02-22",
      location: "Thika, Kenya",
      views: 203
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop",
      title: "Health Awareness Campaign",
      description: "Promoting health and wellness in communities",
      category: "Community",
      date: "2024-01-30",
      location: "Kakamega County",
      views: 167
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Photo Gallery
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Discover moments of transformation, celebration, and empowerment through our
                visual stories of women and girls changing their lives and communities.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">150+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Photos</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">50+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Events Documented</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">12</h3>
                  <p className="text-gray-600 dark:text-gray-300">Counties Featured</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-2">25K+</h3>
                  <p className="text-gray-600 dark:text-gray-300">Total Views</p>
                </CardContent>
              </Card>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {photoCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  className={`${category.active ? "bg-primary text-white" : ""}`}
                  data-testid={`filter-${category.name.toLowerCase().replace(' ', '-')}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group" data-testid={`photo-card-${photo.id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" data-testid={`button-share-${photo.id}`}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" data-testid={`button-download-${photo.id}`}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Badge className="absolute bottom-4 left-4 bg-primary text-white">
                      {photo.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {photo.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{photo.views}</span>
                      </div>
                    </div>
                    
                    {photo.location && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" data-testid="button-load-more">
                Load More Photos
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Collection
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Highlighting some of our most impactful moments and transformative stories
                captured through the lens of our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop"
                    alt="Success Stories Collection"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Success Stories</h3>
                    <p className="text-white/90 mb-4">
                      Celebrating the achievements and transformations of our beneficiaries
                    </p>
                    <Button variant="secondary" size="sm" data-testid="button-view-success-stories">
                      View Collection (25 photos)
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                    alt="Community Impact Collection"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Community Impact</h3>
                    <p className="text-white/90 mb-4">
                      Documenting the positive changes in communities across Kenya
                    </p>
                    <Button variant="secondary" size="sm" data-testid="button-view-community-impact">
                      View Collection (35 photos)
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Share Your Story
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Have photos from our programs or events? We'd love to feature your moments
              and help tell the story of women's empowerment in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
                data-testid="button-submit-photos"
              >
                <Camera className="mr-2 h-5 w-5" />
                Submit Photos
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-photography-guidelines"
              >
                Photography Guidelines
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}