import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Heart, Phone, ArrowLeft, Check, Smartphone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const MPesaCheckoutForm = ({ donationData }: { donationData: any }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'pending' | 'success' | 'failed'>('idle');
  const [checkoutRequestId, setCheckoutRequestId] = useState("");

  const formatPhoneNumber = (phoneNumber: string) => {
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.startsWith('254')) {
      return cleaned;
    } else if (cleaned.startsWith('0')) {
      return '254' + cleaned.slice(1);
    } else if (cleaned.length === 9) {
      return '254' + cleaned;
    }
    
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive",
      });
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);
    
    if (formattedPhone.length !== 12 || !formattedPhone.startsWith('254')) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Kenyan phone number (e.g., 0712345678)",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      const response = await apiRequest("/api/mpesa/stkpush", "POST", {
        phone: formattedPhone,
        amount: donationData.amount,
        donorName: donationData.donorName,
        donorEmail: donationData.donorEmail,
        message: donationData.message,
        accountReference: `VOH-${Date.now()}`
      });

      if (response.success) {
        setCheckoutRequestId(response.checkoutRequestId);
        setPaymentStatus('pending');
        
        toast({
          title: "Payment request sent!",
          description: "Please check your phone and enter your M-Pesa PIN to complete the donation.",
        });

        pollPaymentStatus(response.checkoutRequestId);
      } else {
        throw new Error(response.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error('M-Pesa payment error:', error);
      setPaymentStatus('failed');
      toast({
        title: "Payment Failed",
        description: error.message || "Unable to process M-Pesa payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const pollPaymentStatus = async (requestId: string) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await apiRequest("/api/mpesa/query", "POST", {
          checkoutRequestId: requestId
        });

        if (response.ResultCode === "0") {
          setPaymentStatus('success');
          toast({
            title: "Donation successful!",
            description: "Thank you for your generous donation to Voices of Hope.",
          });
          return;
        } else if (response.ResultCode && response.ResultCode !== "1037") {
          setPaymentStatus('failed');
          toast({
            title: "Payment failed",
            description: response.ResultDesc || "The payment was not completed successfully.",
            variant: "destructive",
          });
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        } else {
          setPaymentStatus('failed');
          toast({
            title: "Payment timeout",
            description: "The payment is taking longer than expected. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        } else {
          setPaymentStatus('failed');
        }
      }
    };

    setTimeout(poll, 5000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Donation Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for your generous donation of KES {donationData.amount} to Voices of Hope.
          </p>
        </div>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Pay with M-Pesa
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter your M-Pesa phone number to complete your donation of KES {donationData.amount}
        </p>
      </div>

      {paymentStatus === 'pending' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Payment request sent to your phone
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Please check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
                This may take up to 2 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="phone">
            M-Pesa Phone Number
          </label>
          <Input
            id="phone"
            data-testid="input-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0712345678 or 254712345678"
            required
            disabled={paymentStatus === 'pending'}
            className="text-lg"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter the phone number registered with M-Pesa
          </p>
        </div>

        <Button
          type="submit"
          disabled={isProcessing || paymentStatus === 'pending'}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
          data-testid="button-confirm-mpesa-payment"
        >
          <Heart className="mr-2 h-5 w-5" />
          {isProcessing 
            ? "Initiating payment..." 
            : paymentStatus === 'pending' 
              ? "Waiting for confirmation..." 
              : `Donate KES ${donationData.amount}`
          }
        </Button>

        {paymentStatus === 'failed' && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setPaymentStatus('idle');
              setCheckoutRequestId("");
            }}
            className="w-full"
            data-testid="button-retry-payment"
          >
            Try Again
          </Button>
        )}
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <Phone className="inline h-3 w-3 mr-1" />
          Secure M-Pesa payment • Your transaction is protected
        </p>
      </div>
    </div>
  );
};

export default function DonationPage() {
  const [location] = useLocation();
  const [donationData, setDonationData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const amount = urlParams.get('amount');
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const message = urlParams.get('message');

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
      currency: "KES",
      donorName: `${firstName || ''} ${lastName || ''}`.trim() || "Anonymous",
      donorEmail: email || '',
      message: message || '',
    };

    setDonationData(data);
  }, [location, toast]);

  if (!donationData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading donation details...</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" data-testid="link-back-home">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Complete Your Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MPesaCheckoutForm donationData={donationData} />
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your donation helps empower women and girls through education and advocacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
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
