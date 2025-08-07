import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Star, Heart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useState } from "react";
import type { Merchandise } from "@shared/schema";

export default function ShopPage() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  
  const { data: merchandise, isLoading, error } = useQuery<Merchandise[]>({
    queryKey: ["/api/merchandise"],
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getCartItemCount = (itemId: string) => cart[itemId] || 0;
  const getTotalItems = () => Object.values(cart).reduce((sum, count) => sum + count, 0);

  const categories = [...new Set(merchandise?.map(item => item.category) || [])];

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">VOH-CBO Shop</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Support our mission while showing your commitment to empowering women and girls. 
              Every purchase helps fund our programs and creates lasting change in communities across Kenya.
            </p>
            
            {/* Cart Summary */}
            {getTotalItems() > 0 && (
              <div className="bg-white rounded-lg p-4 max-w-md mx-auto mt-8 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 text-accent mr-2" />
                    <span className="font-semibold">Cart: {getTotalItems()} items</span>
                  </div>
                  <Button size="sm" className="bg-accent hover:bg-orange-600" data-testid="button-view-cart">
                    View Cart
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Shop</h3>
                <p className="text-red-600">
                  We're having trouble loading our merchandise. Please try again later or contact us if the problem persists.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-20 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Shop Content */}
          {!isLoading && !error && (
            <>
              {/* Category Filter */}
              {categories.length > 1 && (
                <div className="mb-8">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">
                      All Items
                    </Badge>
                    {categories.map((category) => (
                      <Badge 
                        key={category} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-white capitalize"
                        data-testid={`filter-${category}`}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Merchandise Grid */}
              {merchandise && merchandise.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                  {merchandise.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-testid={`card-product-${item.id}`}>
                      {item.imageUrl && (
                        <div className="h-64 overflow-hidden relative group">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.inventory === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                            </div>
                          )}
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-primary pr-2">{item.name}</CardTitle>
                          <Badge variant="outline" className="capitalize text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-primary">
                            ${parseFloat(item.price).toFixed(2)}
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        </div>

                        {item.inventory !== null && item.inventory > 0 && (
                          <p className="text-sm text-gray-500 mb-4">
                            {item.inventory} in stock
                          </p>
                        )}

                        <div className="space-y-2">
                          {getCartItemCount(item.id) > 0 && (
                            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                              <span className="text-green-800 text-sm font-medium">
                                {getCartItemCount(item.id)} in cart
                              </span>
                            </div>
                          )}
                          
                          <Button 
                            onClick={() => addToCart(item.id)}
                            disabled={item.inventory === 0}
                            className="w-full bg-accent hover:bg-orange-600 disabled:bg-gray-300"
                            data-testid={`button-add-to-cart-${item.id}`}
                          >
                            {item.inventory === 0 ? (
                              "Out of Stock"
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {merchandise && merchandise.length === 0 && (
                <div className="text-center py-16">
                  <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">Shop Coming Soon</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We're preparing amazing merchandise to help you support our mission. 
                    Check back soon for VOH-CBO branded items and more ways to show your support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-primary hover:bg-primary/90" data-testid="button-contact-shop">
                      Contact Us for Updates
                    </Button>
                    <Button variant="outline" data-testid="button-donate-instead">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Instead
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Impact Message */}
          {merchandise && merchandise.length > 0 && (
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 mb-16">
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">Your Purchase Makes a Difference</h2>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                  Every item you purchase directly supports our programs and helps us continue empowering 
                  women and girls across Kenya. Your support creates lasting change in communities.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">Funds Programs</h3>
                    <p className="text-sm text-gray-600">
                      Supports education, leadership training, and community initiatives
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">Quality Products</h3>
                    <p className="text-sm text-gray-600">
                      Ethically sourced, high-quality merchandise you can be proud to wear
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">Spreads Awareness</h3>
                    <p className="text-sm text-gray-600">
                      Helps share our mission and inspire others to get involved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          {merchandise && merchandise.length > 0 && (
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">More Ways to Support</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Shopping is just one way to support our mission. Explore other ways to get involved 
                and make a lasting impact in communities across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-donate-cta">
                  <Heart className="mr-2 h-5 w-5" />
                  Make a Donation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  data-testid="button-volunteer-cta"
                >
                  Volunteer With Us
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
