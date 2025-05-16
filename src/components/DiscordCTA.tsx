
import { useState, useEffect } from 'react';
import { MessageSquare, Users, Headphones, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiscordCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById('discord-cta');
      
      if (element) {
        const elementPosition = element.offsetTop;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="discord-cta" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-phant-dark to-phant-dark-blue/80"></div>
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-phant-blue to-transparent"></div>
      <div className="absolute -left-40 bottom-0 w-80 h-80 bg-phant-blue/10 rounded-full blur-3xl"></div>
      
      <div 
        className={`container px-4 mx-auto relative z-10 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto glassmorphism rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-phant-blue/10 border border-phant-blue/20 text-phant-blue text-xs font-medium mb-3">
                Join Our Community
              </div>
              <h2 className="text-3xl font-bold mb-4">Connect with Us on Discord</h2>
              <p className="text-phant-gray mb-6">Join our thriving community of developers and creators. Get instant support, exclusive updates, and connect with like-minded professionals.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <MessageSquare className="h-5 w-5 text-phant-blue" />, text: "24/7 Support" },
                  { icon: <Users className="h-5 w-5 text-phant-blue" />, text: "Active Community" },
                  { icon: <Headphones className="h-5 w-5 text-phant-blue" />, text: "Voice Channels" },
                  { icon: <Sparkles className="h-5 w-5 text-phant-blue" />, text: "Exclusive Updates" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-300 gap-2"
                onClick={() => window.open('https://discord.gg/KPqTQTtdDA', '_blank')}
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.9308 1.25721C15.6561 0.667543 14.2892 0.235601 12.8599 0C12.6867 0.32358 12.4909 0.737852 12.3529 1.06784C10.825 0.852933 9.31047 0.852933 7.81193 1.06784C7.67391 0.737852 7.47307 0.32358 7.29747 0C5.86676 0.235601 4.49843 0.669369 3.22369 1.26086C0.463089 5.35489 -0.283563 9.35133 0.0887545 13.2889C1.8423 14.5931 3.54128 15.3824 5.21032 15.9001C5.62308 15.3332 5.99233 14.7273 6.31007 14.0869C5.70603 13.8574 5.12712 13.5747 4.58085 13.2435C4.71886 13.1435 4.85341 13.0391 4.98299 12.9312C8.31452 14.4644 11.941 14.4644 15.2245 12.9312C15.3558 13.0391 15.4903 13.1435 15.6266 13.2435C15.0786 13.5764 14.498 13.8592 13.8939 14.0887C14.2117 14.7273 14.5792 15.335 14.994 15.9019C16.665 15.3842 18.364 14.5949 20.1176 13.2889C20.5661 8.7331 19.3751 4.77314 16.9308 1.25721ZM6.74932 10.9311C5.74882 10.9311 4.929 10.0278 4.929 8.92525C4.929 7.82271 5.73032 6.91762 6.74932 6.91762C7.76831 6.91762 8.58813 7.8209 8.56964 8.92525C8.57108 10.0278 7.76831 10.9311 6.74932 10.9311ZM13.4171 10.9311C12.4166 10.9311 11.5968 10.0278 11.5968 8.92525C11.5968 7.82271 12.3981 6.91762 13.4171 6.91762C14.4361 6.91762 15.2559 7.8209 15.2374 8.92525C15.2374 10.0278 14.4361 10.9311 13.4171 10.9311Z"
                    fill="currentColor"
                  />
                </svg>
                Join our Discord
              </Button>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#5865F2]/30 blur-2xl animate-pulse-slow"></div>
                <div className="rounded-full bg-gradient-to-br from-[#5865F2] to-[#4752C4] p-6 relative animate-float">
                  <svg
                    width="80"
                    height="60"
                    viewBox="0 0 20 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M16.9308 1.25721C15.6561 0.667543 14.2892 0.235601 12.8599 0C12.6867 0.32358 12.4909 0.737852 12.3529 1.06784C10.825 0.852933 9.31047 0.852933 7.81193 1.06784C7.67391 0.737852 7.47307 0.32358 7.29747 0C5.86676 0.235601 4.49843 0.669369 3.22369 1.26086C0.463089 5.35489 -0.283563 9.35133 0.0887545 13.2889C1.8423 14.5931 3.54128 15.3824 5.21032 15.9001C5.62308 15.3332 5.99233 14.7273 6.31007 14.0869C5.70603 13.8574 5.12712 13.5747 4.58085 13.2435C4.71886 13.1435 4.85341 13.0391 4.98299 12.9312C8.31452 14.4644 11.941 14.4644 15.2245 12.9312C15.3558 13.0391 15.4903 13.1435 15.6266 13.2435C15.0786 13.5764 14.498 13.8592 13.8939 14.0887C14.2117 14.7273 14.5792 15.335 14.994 15.9019C16.665 15.3842 18.364 14.5949 20.1176 13.2889C20.5661 8.7331 19.3751 4.77314 16.9308 1.25721ZM6.74932 10.9311C5.74882 10.9311 4.929 10.0278 4.929 8.92525C4.929 7.82271 5.73032 6.91762 6.74932 6.91762C7.76831 6.91762 8.58813 7.8209 8.56964 8.92525C8.57108 10.0278 7.76831 10.9311 6.74932 10.9311ZM13.4171 10.9311C12.4166 10.9311 11.5968 10.0278 11.5968 8.92525C11.5968 7.82271 12.3981 6.91762 13.4171 6.91762C14.4361 6.91762 15.2559 7.8209 15.2374 8.92525C15.2374 10.0278 14.4361 10.9311 13.4171 10.9311Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordCTA;
