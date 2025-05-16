
import { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, HelpCircle } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const SupportCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  buttonLink 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  buttonText: string; 
  buttonLink: string; 
}) => {
  return (
    <div className="glassmorphism rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-phant-blue/20 text-phant-blue">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-phant-gray mb-6 flex-grow">{description}</p>
      <a 
        href={buttonLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full"
      >
        <Button className="w-full bg-phant-blue/20 hover:bg-phant-blue/30 text-phant-blue border border-phant-blue/30">
          {buttonText}
        </Button>
      </a>
    </div>
  );
};

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-phant-gray">Get help with your products or reach out to our team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <SupportCard 
              title="Live Chat" 
              description="Chat with our support team in real-time for immediate assistance with your products."
              icon={MessageSquare}
              buttonText="Start Chat"
              buttonLink="#chat"
            />
            <SupportCard 
              title="Email Support" 
              description="Send us an email and we'll respond within 24 hours. Best for detailed inquiries."
              icon={Mail}
              buttonText="Email Us"
              buttonLink="mailto:support@phantdev.com"
            />
            <SupportCard 
              title="Help Center" 
              description="Browse our knowledge base for tutorials, FAQs, and troubleshooting guides."
              icon={HelpCircle}
              buttonText="Visit Help Center"
              buttonLink="/help"
            />
          </div>
          
          <div className="glassmorphism rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="bg-phant-dark-blue border-phant-dark-gray focus:border-phant-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="bg-phant-dark-blue border-phant-dark-gray focus:border-phant-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm mb-2">Subject</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleChange}
                        required
                        placeholder="Enter subject"
                        className="bg-phant-dark-blue border-phant-dark-gray focus:border-phant-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm mb-2">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleChange}
                        required
                        placeholder="Enter your message"
                        className="min-h-[150px] bg-phant-dark-blue border-phant-dark-gray focus:border-phant-blue resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white transition-all duration-300 h-12"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="bg-gradient-to-br from-phant-dark-blue to-phant-dark p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-phant-blue mb-2">How do I get a refund?</h4>
                    <p className="text-phant-gray text-sm">We don't offer refund on all our products. Contact our support team to know more.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-phant-blue mb-2">Do you offer product customization?</h4>
                    <p className="text-phant-gray text-sm">Yes, we offer customization services for all our products. Contact us for a custom quote.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-phant-blue mb-2">How do I download my purchase?</h4>
                    <p className="text-phant-gray text-sm">After purchase, you'll receive a download link via email. You can also access your downloads from your account dashboard.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-phant-blue mb-2">Do you offer technical support?</h4>
                    <p className="text-phant-gray text-sm">Yes, we provide technical support for all our products. Response times vary based on your support plan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Support;
