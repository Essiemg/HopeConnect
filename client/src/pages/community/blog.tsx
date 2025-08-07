import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Stories & Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover inspiring stories, program updates, and insights from our community. 
              Read about the impact we're making together and the voices we're amplifying across Kenya.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-blog"
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Articles</h3>
                <p className="text-red-600">
                  We're having trouble loading our blog posts. Please try again later or contact us if the problem persists.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-8">
              {/* Featured post skeleton */}
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <Skeleton className="md:w-1/2 h-64 md:h-80" />
                  <div className="md:w-1/2 p-8">
                    <Skeleton className="h-8 w-48 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </Card>
              
              {/* Other posts skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          )}

          {/* Blog Content */}
          {!isLoading && !error && (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-6">Featured Story</h2>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300" data-testid="card-featured-post">
                    <div className="md:flex">
                      {featuredPost.imageUrl && (
                        <div className="md:w-1/2 h-64 md:h-80 overflow-hidden">
                          <img 
                            src={featuredPost.imageUrl} 
                            alt={featuredPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`${featuredPost.imageUrl ? 'md:w-1/2' : 'w-full'} p-8`}>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate((featuredPost.publishedAt || featuredPost.createdAt).toString())}</span>
                          <User className="h-4 w-4 ml-4 mr-2" />
                          <span>VOH-CBO Team</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
                          {featuredPost.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <Link href={`/community/blog/${featuredPost.slug}`}>
                          <Button className="bg-accent hover:bg-orange-600" data-testid={`button-read-featured-${featuredPost.id}`}>
                            Read Full Story
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Other Posts */}
              {otherPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-6">
                    {featuredPost ? 'More Stories' : 'Latest Stories'}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-testid={`card-blog-post-${post.id}`}>
                        {post.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate((post.publishedAt || post.createdAt).toString())}</span>
                          </div>
                          <CardTitle className="text-lg text-primary line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <Link href={`/community/blog/${post.slug}`}>
                            <Button variant="outline" className="w-full" data-testid={`button-read-more-${post.id}`}>
                              Read More
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchTerm && filteredPosts.length === 0 && posts && posts.length > 0 && (
                <div className="text-center py-16">
                  <Search className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Results Found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find any articles matching "{searchTerm}". Try different keywords or browse all our stories.
                  </p>
                  <Button 
                    onClick={() => setSearchTerm("")} 
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-clear-search"
                  >
                    Clear Search
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {posts && posts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Stories Yet</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We're working on bringing you inspiring stories and updates from our community. 
                    Check back soon for our latest features and impact stories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-primary hover:bg-primary/90" data-testid="button-contact-blog">
                      Contact Us
                    </Button>
                    <Button variant="outline" data-testid="button-newsletter-blog">
                      Subscribe for Updates
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Call to Action */}
          {posts && posts.length > 0 && (
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">Share Your Story</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Have an inspiring story or experience with VOH-CBO? We'd love to hear from you and 
                share your journey with our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-orange-600" data-testid="button-share-story">
                  Share Your Story
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  data-testid="button-newsletter-signup-blog"
                >
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
