import { useState } from "react";
import { Heart, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const donationAmounts = [25, 50, 100, 250];

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { toast } = useToast();

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  };

  const handleDonation = () => {
    const amount = getCurrentAmount();
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to dedicated donation page with parameters
    const params = new URLSearchParams({
      amount: amount.toString(),
      type: donationType,
      firstName: donorInfo.firstName,
      lastName: donorInfo.lastName,
      email: donorInfo.email,
      method: paymentMethod,
    });
    
    window.location.href = `/donate?${params.toString()}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-earth-100 to-earth-200" id="donate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Make a Difference</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your contribution helps us continue empowering women and girls across Kenya. Every donation creates lasting impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Donation Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Support Our Mission</h3>
            
            {/* Donation Amount Selection */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-3">Select Donation Amount</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${
                      selectedAmount === amount
                        ? 'bg-accent text-white'
                        : 'bg-earth-100 hover:bg-accent hover:text-white text-gray-700'
                    }`}
                    data-testid={`button-amount-${amount}`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <Input 
                type="number" 
                placeholder="Custom amount" 
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full"
                data-testid="input-custom-amount"
              />
            </div>

            {/* Donation Type */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</Label>
              <RadioGroup value={donationType} onValueChange={setDonationType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" data-testid="radio-one-time" />
                  <Label htmlFor="one-time">One-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" data-testid="radio-monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Donor Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Input 
                type="text" 
                placeholder="First Name" 
                value={donorInfo.firstName}
                onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                required
                data-testid="input-first-name"
              />
              <Input 
                type="text" 
                placeholder="Last Name" 
                value={donorInfo.lastName}
                onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
                required
                data-testid="input-last-name"
              />
            </div>
            <Input 
              type="email" 
              placeholder="Email Address" 
              value={donorInfo.email}
              onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
              className="mb-6"
              required
              data-testid="input-email"
            />

            {/* Payment Method */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-earth-50">
                  <RadioGroupItem value="card" id="card" data-testid="radio-card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-earth-50">
                  <RadioGroupItem value="paypal" id="paypal" data-testid="radio-paypal" />
                  <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-earth-50">
                  <RadioGroupItem value="mpesa" id="mpesa" data-testid="radio-mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center cursor-pointer">
                    M-Pesa
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleDonation}
              className="w-full bg-accent hover:bg-orange-600 text-white py-4 text-lg font-semibold"
              data-testid="button-complete-donation"
            >
              <Heart className="mr-2 h-5 w-5" />
              Complete Donation
            </Button>

            {/* Security Note */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              <Lock className="inline h-3 w-3 mr-1" />
              Your donation is secure and encrypted
            </p>
          </div>

          {/* Impact Story */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h4 className="font-serif text-xl font-bold text-primary mb-4">Your Impact</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3" data-testid="impact-25">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">$25</p>
                    <p className="text-sm text-gray-600">Provides educational materials for one girl for a month</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="impact-50">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">$50</p>
                    <p className="text-sm text-gray-600">Funds leadership training workshop for 5 women</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="impact-100">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">$100</p>
                    <p className="text-sm text-gray-600">Supports one scholarship recipient for three months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Story */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8">
              <h4 className="font-serif text-xl font-bold text-primary mb-4">Success Story</h4>
              <p className="text-gray-600 mb-4 italic">
                "Thanks to VOH-CBO's scholarship program, I was able to complete my secondary education and am now pursuing a degree in computer science. I want to use technology to solve problems in my community."
              </p>
              <div className="flex items-center space-x-3" data-testid="testimonial">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AM</span>
                </div>
                <div>
                  <p className="font-semibold">Amina M.</p>
                  <p className="text-sm text-gray-500">Scholarship Recipient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
