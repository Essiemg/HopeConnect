import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import type { Event } from "@shared/schema";

export default function EventsPage() {
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingEvents = events?.filter(event => isUpcoming(event.startDate)) || [];
  const pastEvents = events?.filter(event => !isUpcoming(event.startDate)) || [];

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Community Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for meaningful events that bring our community together, celebrate achievements, 
              and create opportunities for learning, networking, and empowerment.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Events</h3>
                <p className="text-red-600">
                  We're having trouble loading our events. Please try again later or contact us if the problem persists.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-8">
              <div>
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-6">
                        <Skeleton className="h-6 w-32 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Events Content */}
          {!isLoading && !error && (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary mb-8">Upcoming Events</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-testid={`card-upcoming-event-${event.id}`}>
                        {event.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={event.imageUrl} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg text-primary pr-2">{event.title}</CardTitle>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Upcoming
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="space-y-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-accent" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-accent" />
                              <span>{formatTime(event.startDate)}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-accent" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.maxAttendees && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-accent" />
                                <span>Max {event.maxAttendees} attendees</span>
                              </div>
                            )}
                          </div>
                          
                          <Button className="w-full bg-accent hover:bg-orange-600" data-testid={`button-register-${event.id}`}>
                            Register Interest
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary mb-8">Past Events</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.slice(0, 6).map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300" data-testid={`card-past-event-${event.id}`}>
                        {event.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={event.imageUrl} 
                              alt={event.title}
                              className="w-full h-full object-cover opacity-75"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg text-primary pr-2">{event.title}</CardTitle>
                            <Badge variant="outline" className="text-gray-500">
                              Past Event
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {pastEvents.length > 6 && (
                    <div className="text-center mt-8">
                      <Button variant="outline" data-testid="button-view-more-past">
                        View More Past Events
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {events && events.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Events Found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We don't have any events scheduled at the moment. Check back soon for upcoming 
                    community gatherings, workshops, and celebrations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-primary hover:bg-primary/90" data-testid="button-contact-events">
                      Contact Us for Updates
                    </Button>
                    <Button variant="outline" data-testid="button-newsletter-signup">
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Call to Action */}
          {events && events.length > 0 && (
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">Stay Connected</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Don't miss out on our upcoming events! Subscribe to our newsletter to get the latest 
                updates on workshops, celebrations, and community gatherings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100" data-testid="button-newsletter-cta">
                  Subscribe to Newsletter
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  data-testid="button-contact-cta"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
