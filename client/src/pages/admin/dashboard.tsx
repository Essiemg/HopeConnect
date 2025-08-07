import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Calendar, Heart, MessageSquare, Image } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import type { TeamMember, BlogPost, Event, Donation, ContactMessage, GalleryImage } from "@shared/schema";

export default function AdminDashboard() {
  const { data: team } = useQuery<TeamMember[]>({ queryKey: ["/api/admin/team"] });
  const { data: blog } = useQuery<BlogPost[]>({ queryKey: ["/api/admin/blog"] });
  const { data: events } = useQuery<Event[]>({ queryKey: ["/api/admin/events"] });
  const { data: donations } = useQuery<Donation[]>({ queryKey: ["/api/admin/donations"] });
  const { data: messages } = useQuery<ContactMessage[]>({ queryKey: ["/api/admin/messages"] });
  const { data: gallery } = useQuery<GalleryImage[]>({ queryKey: ["/api/admin/gallery"] });
  const { data: loginLogs } = useQuery<LoginLog[]>({ queryKey: ["/api/admin/login-logs"], });

  const publishedBlogCount = blog?.filter(post => post.isPublished).length || 0;

  const stats = [
    {
      title: "Team Members",
      value: team?.length || 0,
      icon: Users,
      link: "/admin/team",
      description: "Active team members"
    },
    {
      title: "Blog Posts",
      value: `${publishedBlogCount}/${blog?.length || 0}`,
      icon: FileText,
      link: "/admin/blog",
      description: "Published / Total posts"
    },
    {
      title: "Events",
      value: events?.length || 0,
      icon: Calendar,
      link: "/admin/events",
      description: "Upcoming and past events"
    },
    {
      title: "Donations",
      value: donations?.length || 0,
      icon: Heart,
      link: "/admin/donations",
      description: "Total donations received"
    },
    {
      title: "Messages",
      value: messages?.filter(m => !m.isRead).length || 0,
      icon: MessageSquare,
      link: "/admin/messages",
      description: "Unread contact messages"
    },
    {
      title: "Gallery Images",
      value: gallery?.length || 0,
      icon: Image,
      link: "/admin/gallery",
      description: "Photos in gallery"
    },
  ];

  const totalDonations = donations?.reduce((sum, donation) => {
    return sum + parseFloat(donation.amount);
  }, 0) || 0;

  const recentMessages = messages?.filter(m => !m.isRead).slice(0, 5) || [];

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your VOH-CBO website content and track impact</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow" data-testid={`card-${stat.title.toLowerCase().replace(' ', '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <Link href={stat.link} className="mt-2 inline-block">
                    <Button variant="outline" size="sm" data-testid={`button-manage-${stat.title.toLowerCase().replace(' ', '-')}`}>
                      Manage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Donation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-accent" />
                  <span>Donation Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2" data-testid="text-total-donations">
                  ${totalDonations.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mb-4">Total donations received</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium">
                      {donations?.filter(d => d.status === 'completed').length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="text-sm font-medium">
                      {donations?.filter(d => d.status === 'pending').length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recurring</span>
                    <span className="text-sm font-medium">
                      {donations?.filter(d => d.isRecurring).length || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <span>Recent Messages</span>
                </CardTitle>
                <CardDescription>Unread contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="border-l-4 border-accent pl-4 py-2" data-testid={`message-${message.id}`}>
                        <h4 className="font-semibold text-sm">
                          {message.firstName} {message.lastName}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">{message.email}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                        <span className="text-xs text-gray-500">
                          {message.inquiryType} • {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    <Link href="/admin/messages">
                      <Button variant="outline" size="sm" className="w-full" data-testid="button-view-all-messages">
                        View All Messages
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No unread messages</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Login Activity */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Recent Login Activity</span>
              </CardTitle>
              <CardDescription>Last 10 admin login sessions for security monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              {loginLogs && loginLogs.length > 0 ? (
                <div className="space-y-3">
                  {loginLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50" data-testid={`login-log-${log.id}`}>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{log.email}</p>
                          <p className="text-xs text-gray-600">
                            {log.ipAddress} • {log.userAgent?.split(' ')[0] || 'Unknown Browser'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(log.loginTime).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(log.loginTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No login activity yet</h3>
                  <p className="text-gray-500">
                    Login tracking will appear here once you start logging in to the admin panel.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/team">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2" data-testid="button-add-team-member">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Add Team Member</span>
                  </Button>
                </Link>
                <Link href="/admin/blog-management">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2" data-testid="button-create-blog-post">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Create Blog Post</span>
                  </Button>
                </Link>
                <Link href="/admin/events">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2" data-testid="button-add-event">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Add Event</span>
                  </Button>
                </Link>
                <Link href="/admin/gallery-management">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2" data-testid="button-upload-images">
                    <Image className="h-6 w-6" />
                    <span className="text-sm">Upload Images</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
