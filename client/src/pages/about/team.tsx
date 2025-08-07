import { useQuery } from "@tanstack/react-query";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import type { TeamMember } from "@shared/schema";

export default function TeamPage() {
  const { data: team, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals and volunteers who work tirelessly to empower women and girls across Kenya. 
              Our diverse team brings together expertise in education, advocacy, community development, and social impact.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Team Members Grid */}
          {team && team.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  data-testid={`card-team-member-${member.id}`}
                >
                  {member.imageUrl && (
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={member.imageUrl} 
                        alt={`${member.name} portrait`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-primary mb-1" data-testid={`text-name-${member.id}`}>
                      {member.name}
                    </h3>
                    <p className="text-accent font-semibold mb-3" data-testid={`text-role-${member.id}`}>
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed" data-testid={`text-bio-${member.id}`}>
                      {member.bio}
                    </p>
                    <div className="flex space-x-3">
                      {member.linkedinUrl && (
                        <a 
                          href={member.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                          data-testid={`link-linkedin-${member.id}`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.twitterUrl && (
                        <a 
                          href={member.twitterUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                          data-testid={`link-twitter-${member.id}`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-primary transition-colors"
                          data-testid={`link-email-${member.id}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {team && team.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Team Members Found</h3>
              <p className="text-gray-500">Our team information will be updated soon.</p>
            </div>
          )}

          {/* Join Our Team Section */}
          <div className="mt-20 bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-white text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Are you passionate about empowering women and girls? We're always looking for dedicated individuals 
              to join our team and make a lasting impact in communities across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                data-testid="button-join-team"
              >
                Get In Touch
              </a>
              <a 
                href="/volunteer" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
                data-testid="button-volunteer"
              >
                Volunteer With Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
