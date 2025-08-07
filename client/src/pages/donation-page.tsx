import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Heart, Lock, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Layout from "@/components/Layout";
import { Link } from "wouter";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const CheckoutForm = ({ donationData }: { donationData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-accent hover:bg-orange-600 text-white py-4 text-lg font-semibold"
        data-testid="button-confirm-payment"
      >
        <Heart className="mr-2 h-5 w-5" />
        {isProcessing ? "Processing..." : `Donate $${donationData.amount}`}
      </Button>
      <p className="text-xs text-gray-500 text-center">
        <Lock className="inline h-3 w-3 mr-1" />
        Your payment is secure and encrypted
      </p>
    </form>
  );
};

export default function DonationPage() {
  const [location] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [donationData, setDonationData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const amount = urlParams.get('amount');
    const type = urlParams.get('type');
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const method = urlParams.get('method');

    if (!amount) {
      toast({
        title: "Missing donation amount",
        description: "Please go back and select a donation amount",
        variant: "destructive",
      });
      return;
    }

    const data = {
      amount: parseFloat(amount),
      currency: "USD",
      donorName: `${firstName || ''} ${lastName || ''}`.trim(),
      donorEmail: email || '',
      isRecurring: type === 'monthly',
      paymentMethod: method || 'card',
    };

    setDonationData(data);

    // Create payment intent
    apiRequest("POST", "/api/create-payment-intent", data)
      .then((res) => res.json())
      .then((response) => {
        if (response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      })
      .catch((error) => {
        toast({
          title: "Failed to initialize payment",
          description: error.message,
          variant: "destructive",
        });
      });
  }, [location, toast]);

  if (!donationData) {
    return (
      <Layout>
        <div className="min-h-screen bg-earth-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Invalid Donation Request</h2>
            <p className="text-gray-600 mb-6">Please go back and select a donation amount.</p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!clientSecret) {
    return (
      <Layout>
        <div className="min-h-screen bg-earth-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Preparing your donation...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="font-serif text-4xl font-bold text-primary mb-2">Complete Your Donation</h1>
            <p className="text-gray-600">Your contribution makes a real difference in empowering women and girls in Kenya</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-accent" />
                    <span>Donation Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientSecret && (
                    <Elements 
                      stripe={stripePromise} 
                      options={{ 
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#8B4513',
                            colorBackground: '#ffffff',
                            colorText: '#30312e',
                            colorDanger: '#df1b41',
                            fontFamily: 'Inter, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '8px',
                          }
                        }
                      }}
                    >
                      <CheckoutForm donationData={donationData} />
                    </Elements>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Donation Summary & Impact */}
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">${donationData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{donationData.isRecurring ? 'Monthly' : 'One-time'}</span>
                  </div>
                  {donationData.donorName && (
                    <div className="flex justify-between">
                      <span>Donor:</span>
                      <span>{donationData.donorName}</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${donationData.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {donationData.amount >= 100 && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="text-white h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Scholarship Support</p>
                        <p className="text-sm text-gray-600">Supports one scholarship recipient for three months</p>
                      </div>
                    </div>
                  )}
                  {donationData.amount >= 50 && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="text-white h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Leadership Training</p>
                        <p className="text-sm text-gray-600">Funds leadership training workshop for 5 women</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="text-white h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Educational Materials</p>
                      <p className="text-sm text-gray-600">Provides educational materials for girls in need</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thank You Message */}
              <Card className="bg-gradient-to-br from-secondary/10 to-accent/10">
                <CardContent className="pt-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your generous donation directly supports our mission to empower women and girls across Kenya. 
                    Together, we're creating lasting change in communities.
                  </p>
                  <p className="text-sm text-gray-500">
                    You will receive an email confirmation once your donation is processed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
