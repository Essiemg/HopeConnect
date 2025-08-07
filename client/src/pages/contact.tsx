import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Layout from "@/components/Layout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    newsletter: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/contact", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        inquiryType: data.inquiryType,
        message: data.message,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
        newsletter: false,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to join our mission? Have questions about our programs? Want to get involved? 
              We'd love to hear from you and explore how we can work together to empower women and girls across Kenya.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary">Send us a message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName"
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName"
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input 
                        id="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+254 700 123 456"
                        data-testid="input-phone"
                      />
                    </div>
                    
                    <div>
                      <Label>Inquiry Type *</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger data-testid="select-inquiry-type">
                          <SelectValue placeholder="Select Inquiry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="donation">Donation Inquiry</SelectItem>
                          <SelectItem value="program">Program Information</SelectItem>
                          <SelectItem value="media">Media/Press</SelectItem>
                          <SelectItem value="scholarship">Scholarship Information</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea 
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your inquiry, how you'd like to get involved, or any questions you have..."
                        required
                        data-testid="textarea-message"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", !!checked)}
                        data-testid="checkbox-newsletter"
                      />
                      <Label htmlFor="newsletter" className="text-sm text-gray-600">
                        Subscribe to our newsletter for updates and impact stories
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-accent hover:bg-orange-600 text-white py-3 font-semibold"
                      data-testid="button-send-message"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary">Contact Information</CardTitle>
                  <p className="text-gray-600">
                    You can reach us through any of the following channels.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4" data-testid="contact-address">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Address</p>
                      <p className="text-gray-600">
                        Nairobi, Kenya<br/>
                        P.O. Box 12345-00100<br/>
                        Central Business District
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Phone</p>
                      <p className="text-gray-600">
                        +254 700 123 456<br/>
                        +254 722 987 654
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Email</p>
                      <p className="text-gray-600">
                        info@voh-cbo.org<br/>
                        programs@voh-cbo.org
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4" data-testid="contact-hours">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Office Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 5:00 PM<br/>
                        Saturday: 9:00 AM - 2:00 PM<br/>
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary">Follow Us</CardTitle>
                  <p className="text-gray-600">
                    Stay connected with us on social media for updates and stories.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors duration-200" 
                      data-testid="link-facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-colors duration-200" 
                      data-testid="link-twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white transition-colors duration-200" 
                      data-testid="link-instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white transition-colors duration-200" 
                      data-testid="link-linkedin"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors duration-200" 
                      data-testid="link-youtube"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">
                    Stay connected for updates, success stories, and ways to get involved in our mission.
                  </p>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary">Visit Us</CardTitle>
                  <p className="text-gray-600">
                    Find us in Nairobi's Central Business District.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center" data-testid="map-placeholder">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4" />
                      <p className="font-semibold">Interactive Map</p>
                      <p className="text-sm">Google Maps Integration</p>
                      <p className="text-xs mt-2">Nairobi Central Business District</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-primary mb-3">How can I volunteer with VOH-CBO?</h3>
                <p className="text-gray-600 text-sm">
                  We welcome volunteers in various capacities. Contact us through the form above or email 
                  programs@voh-cbo.org to learn about current volunteer opportunities.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-primary mb-3">Are donations tax-deductible?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, VOH-CBO is a registered nonprofit organization. All donations are tax-deductible. 
                  You'll receive a receipt for your tax records.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-primary mb-3">How do I apply for a scholarship?</h3>
                <p className="text-gray-600 text-sm">
                  Scholarship applications are typically available at the beginning of each academic year. 
                  Contact us for current application deadlines and requirements.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-primary mb-3">Can organizations partner with VOH-CBO?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We're always looking for strategic partnerships. Select "Partnership" in 
                  the inquiry form above to discuss collaboration opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Emergency or Urgent Matters</h2>
            <p className="mb-6 opacity-90">
              If you have an urgent matter or emergency that requires immediate attention, 
              please call us directly during office hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254700123456" 
                className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                data-testid="button-call-emergency"
              >
                Call: +254 700 123 456
              </a>
              <a 
                href="mailto:info@voh-cbo.org" 
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
                data-testid="button-email-emergency"
              >
                Email: info@voh-cbo.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
