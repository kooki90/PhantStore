
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ClipboardIcon, Copy, Link, BarChart3, UserRound, ShoppingCart, DollarSign, Wallet } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Referral, ReferralTransaction, WithdrawalMethod } from '@/types/referral';

// Mock data
const mockReferral: Referral = {
  id: 'ref1',
  userId: 'user1',
  code: 'PHANT20',
  url: 'https://phantdev.com/ref/PHANT20',
  createdAt: '2023-06-01T00:00:00Z',
  visits: 256,
  signups: 42,
  purchases: 18,
  earnings: 432.65,
  status: 'active'
};

const mockTransactions: ReferralTransaction[] = [
  {
    id: 'trans1',
    referralId: 'ref1',
    amount: 25.5,
    type: 'commission',
    status: 'completed',
    date: '2023-11-20T14:30:00Z',
    details: 'Commission from order #ORD-12345',
    referredUserId: 'user123',
    orderId: 'ORD-12345'
  },
  {
    id: 'trans2',
    referralId: 'ref1',
    amount: 100.0,
    type: 'withdrawal',
    status: 'completed',
    date: '2023-11-15T11:20:00Z',
    details: 'Withdrawal to PayPal'
  },
  {
    id: 'trans3',
    referralId: 'ref1',
    amount: 50.0,
    type: 'credit',
    status: 'completed',
    date: '2023-11-10T09:45:00Z',
    details: 'Converted to store credit'
  },
  {
    id: 'trans4',
    referralId: 'ref1',
    amount: 15.75,
    type: 'commission',
    status: 'pending',
    date: '2023-11-25T16:10:00Z',
    details: 'Commission from order #ORD-12346',
    referredUserId: 'user456',
    orderId: 'ORD-12346'
  }
];

const mockWithdrawalMethods: WithdrawalMethod[] = [
  {
    id: 'wm1',
    userId: 'user1',
    type: 'paypal',
    details: {
      email: 'example@email.com'
    },
    isDefault: true
  },
  {
    id: 'wm2',
    userId: 'user1',
    type: 'bank',
    details: {
      accountName: 'John Doe',
      accountNumber: '****7890',
      routingNumber: '****1234',
      bankName: 'Example Bank'
    },
    isDefault: false
  }
];

const Referrals = () => {
  const [referral, setReferral] = useState<Referral>(mockReferral);
  const [transactions, setTransactions] = useState<ReferralTransaction[]>(mockTransactions);
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>(mockWithdrawalMethods);
  const [activeTab, setActiveTab] = useState('overview');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [convertAmount, setConvertAmount] = useState('');
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState(withdrawalMethods[0]?.id || '');
  const [isAddingWithdrawalMethod, setIsAddingWithdrawalMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'paypal',
    email: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    walletAddress: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Your referral link has been copied to clipboard."
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive"
      });
      return;
    }

    if (amount > referral.earnings) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough earnings to withdraw this amount.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedWithdrawalMethod) {
      toast({
        title: "No withdrawal method",
        description: "Please select a withdrawal method.",
        variant: "destructive"
      });
      return;
    }

    // Simulate withdrawal
    const method = withdrawalMethods.find(m => m.id === selectedWithdrawalMethod);
    
    // Create new transaction
    const newTransaction: ReferralTransaction = {
      id: `trans${transactions.length + 1}`,
      referralId: referral.id,
      amount,
      type: 'withdrawal',
      status: 'pending',
      date: new Date().toISOString(),
      details: `Withdrawal to ${method?.type === 'paypal' ? 'PayPal' : method?.type === 'bank' ? 'Bank Account' : 'Crypto Wallet'}`
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Update earnings
    setReferral({
      ...referral,
      earnings: referral.earnings - amount
    });
    
    setWithdrawAmount('');
    
    toast({
      title: "Withdrawal requested",
      description: `Your withdrawal of $${amount.toFixed(2)} has been requested and is being processed.`
    });
  };

  const handleConvertToCredit = () => {
    const amount = parseFloat(convertAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to convert.",
        variant: "destructive"
      });
      return;
    }

    if (amount > referral.earnings) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough earnings to convert this amount.",
        variant: "destructive"
      });
      return;
    }

    // Create new transaction
    const newTransaction: ReferralTransaction = {
      id: `trans${transactions.length + 1}`,
      referralId: referral.id,
      amount,
      type: 'credit',
      status: 'completed',
      date: new Date().toISOString(),
      details: 'Converted to store credit'
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Update earnings
    setReferral({
      ...referral,
      earnings: referral.earnings - amount
    });
    
    setConvertAmount('');
    
    toast({
      title: "Conversion successful",
      description: `$${amount.toFixed(2)} has been converted to store credit.`
    });
  };

  const handleAddWithdrawalMethod = () => {
    // Validate based on type
    if (newMethod.type === 'paypal' && !newMethod.email) {
      toast({
        title: "Missing information",
        description: "Please enter your PayPal email address.",
        variant: "destructive"
      });
      return;
    } else if (newMethod.type === 'bank' && 
               (!newMethod.accountName || !newMethod.accountNumber || !newMethod.routingNumber || !newMethod.bankName)) {
      toast({
        title: "Missing information",
        description: "Please fill in all the bank account details.",
        variant: "destructive"
      });
      return;
    } else if (newMethod.type === 'crypto' && !newMethod.walletAddress) {
      toast({
        title: "Missing information",
        description: "Please enter your crypto wallet address.",
        variant: "destructive"
      });
      return;
    }

    // Create new withdrawal method
    const newWithdrawalMethod: WithdrawalMethod = {
      id: `wm${withdrawalMethods.length + 1}`,
      userId: 'user1',
      type: newMethod.type as 'paypal' | 'bank' | 'crypto',
      details: {
        email: newMethod.email || undefined,
        accountName: newMethod.accountName || undefined,
        accountNumber: newMethod.accountNumber || undefined,
        routingNumber: newMethod.routingNumber || undefined,
        bankName: newMethod.bankName || undefined,
        walletAddress: newMethod.walletAddress || undefined
      },
      isDefault: withdrawalMethods.length === 0
    };
    
    setWithdrawalMethods([...withdrawalMethods, newWithdrawalMethod]);
    setSelectedWithdrawalMethod(newWithdrawalMethod.id);
    setIsAddingWithdrawalMethod(false);
    
    // Reset form
    setNewMethod({
      type: 'paypal',
      email: '',
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
      walletAddress: ''
    });
    
    toast({
      title: "Withdrawal method added",
      description: "Your new withdrawal method has been added successfully."
    });
  };

  // Filter transactions based on type
  const getFilteredTransactions = (type: 'all' | 'commission' | 'withdrawal' | 'credit') => {
    if (type === 'all') return transactions;
    return transactions.filter(transaction => transaction.type === type);
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Referral Program</h1>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 glassmorphism p-1 w-full grid grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="glassmorphism rounded-xl p-6 mb-8">
                <h2 className="text-xl font-medium mb-6">Your Referral Link</h2>
                
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-grow">
                    <div className="relative">
                      <Input
                        readOnly
                        value={referral.url}
                        className="pr-12 bg-phant-dark-blue border-phant-dark-gray"
                      />
                      <button 
                        onClick={() => copyToClipboard(referral.url)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-phant-gray hover:text-phant-blue transition-colors"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => copyToClipboard(referral.url)}
                    className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue"
                  >
                    <ClipboardIcon className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-grow border border-phant-dark-gray rounded-lg p-4 bg-phant-dark-blue/30">
                    <h3 className="font-medium mb-1">Your Referral Code</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{referral.code}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(referral.code)}
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-grow border border-phant-dark-gray rounded-lg p-4 bg-phant-dark-blue/30">
                    <h3 className="font-medium mb-1">Available Earnings</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-500">${referral.earnings.toFixed(2)}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setActiveTab('withdraw')}
                      >
                        <Wallet className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">How it works</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-phant-blue/20 flex items-center justify-center flex-shrink-0">
                        <Link className="h-4 w-4 text-phant-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Share your unique referral link</h4>
                        <p className="text-sm text-phant-gray">Send your referral link to friends, share on social media, or embed on your website.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-phant-blue/20 flex items-center justify-center flex-shrink-0">
                        <UserRound className="h-4 w-4 text-phant-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Friends sign up using your link</h4>
                        <p className="text-sm text-phant-gray">When someone clicks your link and creates an account, they're linked to you.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-phant-blue/20 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-4 w-4 text-phant-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">They make a purchase</h4>
                        <p className="text-sm text-phant-gray">When they buy any product, you earn 15% commission on their first purchase.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-phant-blue/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-4 w-4 text-phant-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">Get paid or use store credit</h4>
                        <p className="text-sm text-phant-gray">Withdraw your earnings via PayPal, bank transfer, or convert to store credit for a 10% bonus.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Link Visits</h3>
                    <BarChart3 className="h-5 w-5 text-phant-blue" />
                  </div>
                  <p className="text-3xl font-bold">{referral.visits}</p>
                  <p className="text-sm text-phant-gray">Total clicks on your referral link</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Signups</h3>
                    <UserRound className="h-5 w-5 text-phant-blue" />
                  </div>
                  <p className="text-3xl font-bold">{referral.signups}</p>
                  <p className="text-sm text-phant-gray">Users who registered with your link</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Purchases</h3>
                    <ShoppingCart className="h-5 w-5 text-phant-blue" />
                  </div>
                  <p className="text-3xl font-bold">{referral.purchases}</p>
                  <p className="text-sm text-phant-gray">Completed purchases by your referrals</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Earnings</h3>
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-green-500">${referral.earnings.toFixed(2)}</p>
                  <p className="text-sm text-phant-gray">Total commission earned</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <div className="glassmorphism rounded-xl p-6 mb-8">
                <h2 className="text-xl font-medium mb-6">Performance Statistics</h2>
                
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-2">Conversion Rate</h3>
                  <div className="w-full h-4 bg-phant-dark-blue/50 rounded-full overflow-hidden">
                    {referral.visits > 0 && (
                      <div 
                        className="h-full bg-gradient-to-r from-phant-blue to-phant-neon-blue" 
                        style={{ width: `${(referral.signups / referral.visits) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Link Clicks to Signups</span>
                    <span>{referral.visits > 0 ? ((referral.signups / referral.visits) * 100).toFixed(1) : 0}%</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-2">Purchase Rate</h3>
                  <div className="w-full h-4 bg-phant-dark-blue/50 rounded-full overflow-hidden">
                    {referral.signups > 0 && (
                      <div 
                        className="h-full bg-gradient-to-r from-phant-blue to-phant-neon-blue" 
                        style={{ width: `${(referral.purchases / referral.signups) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Signups to Purchases</span>
                    <span>{referral.signups > 0 ? ((referral.purchases / referral.signups) * 100).toFixed(1) : 0}%</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Monthly Performance</h3>
                  <div className="relative">
                    <div className="flex items-end justify-between h-40 mb-2">
                      {/* This would be a real chart in a production app */}
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '20%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '35%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '42%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '28%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '50%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '65%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '45%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '70%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '85%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '100%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '75%' }}></div>
                      <div className="w-1/12 bg-phant-blue/20 rounded-t" style={{ height: '90%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-phant-gray">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-0">
              <div className="glassmorphism rounded-xl p-6">
                <h2 className="text-xl font-medium mb-6">Transaction History</h2>
                
                <Tabs defaultValue="all" className="w-full mb-6">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="commission">Commission</TabsTrigger>
                    <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
                    <TabsTrigger value="credit">Store Credit</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0 space-y-4">
                    {getFilteredTransactions('all').map((transaction) => (
                      <div key={transaction.id} className="border-b border-phant-dark-gray last:border-0 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{transaction.details}</p>
                            <p className="text-sm text-phant-gray">
                              {new Date(transaction.date).toLocaleDateString()} • 
                              <span className={`ml-1 ${
                                transaction.status === 'completed' ? 'text-green-500' : 
                                transaction.status === 'pending' ? 'text-yellow-500' : 
                                'text-red-500'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              transaction.type === 'commission' ? 'text-green-500' : 
                              ''
                            }`}>
                              {transaction.type === 'commission' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-phant-gray">
                              {transaction.type === 'commission' ? 'Commission' : 
                               transaction.type === 'withdrawal' ? 'Withdrawal' :
                               'Store Credit'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="commission" className="mt-0 space-y-4">
                    {getFilteredTransactions('commission').map((transaction) => (
                      <div key={transaction.id} className="border-b border-phant-dark-gray last:border-0 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{transaction.details}</p>
                            <p className="text-sm text-phant-gray">
                              {new Date(transaction.date).toLocaleDateString()} • 
                              <span className={`ml-1 ${
                                transaction.status === 'completed' ? 'text-green-500' : 
                                transaction.status === 'pending' ? 'text-yellow-500' : 
                                'text-red-500'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-500">+${transaction.amount.toFixed(2)}</p>
                            <p className="text-xs text-phant-gray">Commission</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getFilteredTransactions('commission').length === 0 && (
                      <div className="text-center py-10">
                        <DollarSign className="mx-auto h-12 w-12 text-phant-gray mb-3" />
                        <p className="text-phant-gray">No commission transactions yet</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="withdrawal" className="mt-0 space-y-4">
                    {getFilteredTransactions('withdrawal').map((transaction) => (
                      <div key={transaction.id} className="border-b border-phant-dark-gray last:border-0 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{transaction.details}</p>
                            <p className="text-sm text-phant-gray">
                              {new Date(transaction.date).toLocaleDateString()} • 
                              <span className={`ml-1 ${
                                transaction.status === 'completed' ? 'text-green-500' : 
                                transaction.status === 'pending' ? 'text-yellow-500' : 
                                'text-red-500'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">-${transaction.amount.toFixed(2)}</p>
                            <p className="text-xs text-phant-gray">Withdrawal</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getFilteredTransactions('withdrawal').length === 0 && (
                      <div className="text-center py-10">
                        <Wallet className="mx-auto h-12 w-12 text-phant-gray mb-3" />
                        <p className="text-phant-gray">No withdrawal transactions yet</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="credit" className="mt-0 space-y-4">
                    {getFilteredTransactions('credit').map((transaction) => (
                      <div key={transaction.id} className="border-b border-phant-dark-gray last:border-0 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{transaction.details}</p>
                            <p className="text-sm text-phant-gray">
                              {new Date(transaction.date).toLocaleDateString()} • 
                              <span className={`ml-1 ${
                                transaction.status === 'completed' ? 'text-green-500' : 
                                transaction.status === 'pending' ? 'text-yellow-500' : 
                                'text-red-500'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">-${transaction.amount.toFixed(2)}</p>
                            <p className="text-xs text-phant-gray">Store Credit</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getFilteredTransactions('credit').length === 0 && (
                      <div className="text-center py-10">
                        <ShoppingCart className="mx-auto h-12 w-12 text-phant-gray mb-3" />
                        <p className="text-phant-gray">No store credit transactions yet</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            
            <TabsContent value="withdraw" className="mt-0">
              <div className="glassmorphism rounded-xl p-6 mb-8">
                <h2 className="text-xl font-medium mb-6">Withdraw Earnings</h2>
                
                <div className="bg-phant-dark-blue/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Available Balance</h3>
                      <p className="text-2xl font-bold text-green-500">${referral.earnings.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-4">Withdraw to Payment Method</h3>
                    
                    {!isAddingWithdrawalMethod ? (
                      <>
                        {withdrawalMethods.length > 0 ? (
                          <div className="space-y-4 mb-6">
                            {withdrawalMethods.map((method) => (
                              <div 
                                key={method.id} 
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  selectedWithdrawalMethod === method.id 
                                    ? 'border-phant-blue bg-phant-blue/10' 
                                    : 'border-phant-dark-gray hover:border-phant-blue/50'
                                }`}
                                onClick={() => setSelectedWithdrawalMethod(method.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    {method.type === 'paypal' && (
                                      <>
                                        <h4 className="font-medium">PayPal</h4>
                                        <p className="text-sm text-phant-gray">{method.details.email}</p>
                                      </>
                                    )}
                                    {method.type === 'bank' && (
                                      <>
                                        <h4 className="font-medium">{method.details.bankName}</h4>
                                        <p className="text-sm text-phant-gray">Account: {method.details.accountNumber}</p>
                                      </>
                                    )}
                                    {method.type === 'crypto' && (
                                      <>
                                        <h4 className="font-medium">Crypto Wallet</h4>
                                        <p className="text-sm text-phant-gray">{method.details.walletAddress?.substring(0, 15)}...</p>
                                      </>
                                    )}
                                  </div>
                                  {selectedWithdrawalMethod === method.id && (
                                    <CheckIcon className="h-5 w-5 text-phant-blue" />
                                  )}
                                </div>
                                {method.isDefault && (
                                  <div className="mt-2 text-xs bg-phant-blue/20 text-phant-blue py-1 px-2 rounded inline-block">
                                    Default
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 mb-6">
                            <Wallet className="mx-auto h-12 w-12 text-phant-gray mb-3" />
                            <p className="text-phant-gray mb-4">No payment methods added yet</p>
                          </div>
                        )}
                        
                        <Button 
                          onClick={() => setIsAddingWithdrawalMethod(true)}
                          variant="outline"
                          className="w-full border-phant-dark-gray hover:bg-phant-dark-blue"
                        >
                          Add New Payment Method
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1">Payment Method Type</label>
                          <select
                            value={newMethod.type}
                            onChange={(e) => setNewMethod({...newMethod, type: e.target.value})}
                            className="w-full rounded-md bg-phant-dark-blue border-phant-dark-gray px-3 py-2"
                          >
                            <option value="paypal">PayPal</option>
                            <option value="bank">Bank Account</option>
                            <option value="crypto">Crypto Wallet</option>
                          </select>
                        </div>
                        
                        {newMethod.type === 'paypal' && (
                          <div>
                            <label className="block text-sm mb-1">PayPal Email</label>
                            <Input
                              value={newMethod.email}
                              onChange={(e) => setNewMethod({...newMethod, email: e.target.value})}
                              placeholder="your-email@example.com"
                              className="bg-phant-dark-blue border-phant-dark-gray"
                            />
                          </div>
                        )}
                        
                        {newMethod.type === 'bank' && (
                          <>
                            <div>
                              <label className="block text-sm mb-1">Account Holder Name</label>
                              <Input
                                value={newMethod.accountName}
                                onChange={(e) => setNewMethod({...newMethod, accountName: e.target.value})}
                                placeholder="John Doe"
                                className="bg-phant-dark-blue border-phant-dark-gray"
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Bank Name</label>
                              <Input
                                value={newMethod.bankName}
                                onChange={(e) => setNewMethod({...newMethod, bankName: e.target.value})}
                                placeholder="Bank of Example"
                                className="bg-phant-dark-blue border-phant-dark-gray"
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Account Number</label>
                              <Input
                                value={newMethod.accountNumber}
                                onChange={(e) => setNewMethod({...newMethod, accountNumber: e.target.value})}
                                placeholder="XXXXXXXXXXXX"
                                className="bg-phant-dark-blue border-phant-dark-gray"
                              />
                            </div>
                            <div>
                              <label className="block text-sm mb-1">Routing Number</label>
                              <Input
                                value={newMethod.routingNumber}
                                onChange={(e) => setNewMethod({...newMethod, routingNumber: e.target.value})}
                                placeholder="XXXXXXXXX"
                                className="bg-phant-dark-blue border-phant-dark-gray"
                              />
                            </div>
                          </>
                        )}
                        
                        {newMethod.type === 'crypto' && (
                          <div>
                            <label className="block text-sm mb-1">Wallet Address</label>
                            <Input
                              value={newMethod.walletAddress}
                              onChange={(e) => setNewMethod({...newMethod, walletAddress: e.target.value})}
                              placeholder="0x..."
                              className="bg-phant-dark-blue border-phant-dark-gray"
                            />
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => setIsAddingWithdrawalMethod(false)}
                            variant="outline"
                            className="flex-grow border-phant-dark-gray hover:bg-phant-dark-blue"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={handleAddWithdrawalMethod}
                            className="flex-grow bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue"
                          >
                            Add Method
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium mb-4">Withdraw Funds</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-1">Amount to Withdraw</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phant-gray">$</span>
                            <Input
                              type="number"
                              min="1"
                              step="0.01"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              placeholder="0.00"
                              className="pl-8 bg-phant-dark-blue border-phant-dark-gray"
                            />
                          </div>
                          <p className="text-xs text-phant-gray mt-1">Minimum withdrawal: $10.00</p>
                        </div>
                        
                        <Button 
                          onClick={handleWithdraw}
                          disabled={!selectedWithdrawalMethod || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
                          className="w-full bg-phant-blue/20 hover:bg-phant-blue/30 text-phant-blue border border-phant-blue/30"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Request Withdrawal
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Convert to Store Credit</h3>
                      <div className="space-y-4">
                        <div className="bg-phant-dark-blue/30 rounded-lg p-4">
                          <p className="text-sm">
                            Convert your earnings to store credit and get a <span className="text-green-500 font-bold">10% bonus</span>! 
                            Store credit can be used for any purchase on our platform.
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-1">Amount to Convert</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phant-gray">$</span>
                            <Input
                              type="number"
                              min="1"
                              step="0.01"
                              value={convertAmount}
                              onChange={(e) => setConvertAmount(e.target.value)}
                              placeholder="0.00"
                              className="pl-8 bg-phant-dark-blue border-phant-dark-gray"
                            />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleConvertToCredit}
                          disabled={!convertAmount || parseFloat(convertAmount) <= 0}
                          className="w-full bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Convert to Store Credit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default Referrals;
