
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();
  // Typing effect for tagline
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = 'Premium Digital Products for Developers';

  useEffect(() => {
    if (isTyping) {
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
        
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        
        // Start blinking cursor effect
        const resetTimeout = setTimeout(() => {
          setDisplayText('');
          setIsTyping(true);
        }, 5000);
        
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [displayText, isTyping]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-40 -left-10 w-72 h-72 bg-phant-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-60 right-0 w-64 h-64 bg-phant-neon-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo animation */}
          <div className="relative mb-4 animate-float">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-phant-blue/20 to-phant-neon-blue/20 absolute inset-0 blur-lg"></div>
            <div className="w-20 h-20 rounded-full bg-phant-dark-blue relative flex items-center justify-center border border-phant-blue/30">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-phant-blue to-phant-neon-blue">P</span>
            </div>
          </div>
          
          {/* Brand name with animated text reveal */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
            <span className="text-white">Phant</span>
            <span className="text-gradient">Development</span>
          </h1>
          
          {/* Tagline with typing effect */}
          <div className="h-8 mb-6">
            <p className="text-phant-silver text-lg inline-block">
              {displayText}
              <span className={`inline-block w-0.5 h-5 ml-1 bg-phant-blue ${isTyping ? 'animate-pulse-slow' : ''}`}></span>
            </p>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full justify-center sm:w-auto animate-slide-up-fade">
            <Button 
              className="bg-gradient-to-r from-phant-blue to-phant-neon-blue hover:from-phant-neon-blue hover:to-phant-blue text-white font-medium px-8 py-6 transition-all duration-300 shadow-neon hover:shadow-neon-hover group"
              onClick={() => navigate('/products')}
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              className="border-phant-blue/30 text-phant-blue hover:bg-phant-blue/10 px-8 py-6"
              onClick={() => window.open('https://discord.gg/KPqTQTtdDA', '_blank')}
            >
              Join Discord
            </Button>
          </div>
          
          {/* Feature badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-3xl animate-slide-up-fade [animation-delay:200ms]">
            {[
              { icon: <Bot className="h-5 w-5" />, text: "AI-Powered Products" },
              { icon: <ShieldCheck className="h-5 w-5" />, text: "Secure Transactions" },
              { icon: <Zap className="h-5 w-5" />, text: "Instant Delivery" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="glassmorphism flex items-center justify-center gap-2 py-3 px-4 rounded-xl"
              >
                <span className="text-phant-blue">{feature.icon}</span>
                <span className="text-sm font-medium text-phant-silver">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
