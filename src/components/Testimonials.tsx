
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Ph4ntom",
    role: "Ph4ntomizations Owner",
    avatar: "https://media.discordapp.net/attachments/1357250118746902598/1357659574160588820/Profile.png?ex=67f10282&is=67efb102&hm=14f05edd493ef8b95d5afd5ca19e6da7dc1e9168847726bf023779b2adcd60b2&=&format=webp&quality=lossless&width=656&height=656",
    content: "Excellent skript, very helpful for me to use in my server while prioritizing performance!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Discord Community Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I've tried many Discord bots, but the ones from Phant are leagues ahead. The moderation suite has saved me countless hours of work. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Game Developer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "The Roblox templates are incredibly well-designed and easy to customize. My development time was cut in half. The support team is also very responsive.",
    rating: 4,
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Web Developer",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    content: "The website templates are not only beautiful but also optimized for performance. I've purchased multiple products and have never been disappointed.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-phant-dark-blue/30 bg-hero-pattern"></div>
      <div className="absolute -bottom-40 right-0 w-80 h-80 bg-phant-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-lg mx-auto text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-phant-blue/10 border border-phant-blue/20 text-phant-blue text-xs font-medium mb-3">
            Customer Stories
          </div>
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-phant-gray">Discover why developers and digital creators choose our products</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative glassmorphism rounded-2xl p-6 md:p-10">
            {/* Quote decoration */}
            <div className="absolute top-6 left-8 text-6xl text-phant-blue/10 font-serif">"</div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-phant-blue/30 p-1">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 mr-1" 
                      fill={i < testimonials[activeIndex].rating ? "#4FACFE" : "none"}
                      color={i < testimonials[activeIndex].rating ? "#4FACFE" : "#4FACFE"}
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl font-medium mb-4 leading-relaxed">
                  {testimonials[activeIndex].content}
                </blockquote>
                
                <div>
                  <p className="font-semibold">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-phant-gray">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-phant-blue w-6' 
                        : 'bg-phant-dark-gray'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevTestimonial}
                  disabled={isAnimating}
                  className="h-8 w-8 rounded-full border-phant-dark-gray hover:bg-phant-blue/10 hover:border-phant-blue/30"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextTestimonial}
                  disabled={isAnimating}
                  className="h-8 w-8 rounded-full border-phant-dark-gray hover:bg-phant-blue/10 hover:border-phant-blue/30"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
