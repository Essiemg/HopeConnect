import { useQuery } from "@tanstack/react-query";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { TeamMember } from "@shared/schema";

export default function TeamSection() {
  const { data: team, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-120 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-1" />
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex space-x-3">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated professionals and volunteers working tirelessly to empower women and girls across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team?.slice(0, 4).map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" data-testid={`card-team-member-${member.id}`}>
              {member.imageUrl && (
                <img 
                  src={member.imageUrl} 
                  alt={`${member.name} portrait`}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-primary mb-1" data-testid={`text-name-${member.id}`}>
                  {member.name}
                </h3>
                <p className="text-accent font-semibold mb-3" data-testid={`text-role-${member.id}`}>
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4" data-testid={`text-bio-${member.id}`}>
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

        {team && team.length > 4 && (
          <div className="text-center mt-12">
            <Link href="/about/team" data-testid="button-view-all-team">
              <Button className="bg-accent hover:bg-orange-600 text-white px-8 py-3 font-semibold">
                View All Team Members
              </Button>
            </Link>
          </div>
        )}

        {!team?.length && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
