
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BillingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CheckoutFormProps {
  billingDetails: BillingDetails;
  onBillingDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CheckoutForm = ({ billingDetails, onBillingDetailsChange }: CheckoutFormProps) => {
  return (
    <div className="glassmorphism rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="fullName"
            name="fullName"
            value={billingDetails.fullName}
            onChange={onBillingDetailsChange}
            placeholder="PhantWalker"
            required
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={billingDetails.email}
            onChange={onBillingDetailsChange}
            placeholder="phant@example.com"
            required
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
          <Input
            id="address"
            name="address"
            value={billingDetails.address}
            onChange={onBillingDetailsChange}
            placeholder="123 Main St"
            required
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
          <Input
            id="city"
            name="city"
            value={billingDetails.city}
            onChange={onBillingDetailsChange}
            placeholder="New York"
            required
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            name="state"
            value={billingDetails.state}
            onChange={onBillingDetailsChange}
            placeholder="NY"
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP/Postal Code <span className="text-red-500">*</span></Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={billingDetails.zipCode}
            onChange={onBillingDetailsChange}
            placeholder="10001"
            required
            className="border border-phant-dark-gray bg-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
          <select
            id="country"
            name="country"
            value={billingDetails.country}
            onChange={onBillingDetailsChange}
            required
            className="flex h-10 w-full rounded-md border border-phant-dark-gray bg-transparent px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="IN">India</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
