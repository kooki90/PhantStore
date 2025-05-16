
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps extends Product {}

const ProductCard = ({
  title,
  description,
  price,
  discountPrice,
  rating,
  image,
  category,
  subcategory,
  badge,
  bybitUrl,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={bybitUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div
        className="relative group rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col bg-card shadow-sm hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500 backdrop-blur-sm border border-blue-500/30">
              {badge}
            </span>
          </div>
        )}
        
        <div className="overflow-hidden h-40 sm:h-48">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div className="p-4 relative z-10 flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">{category}</p>
                {subcategory && (
                  <p className="text-xs text-blue-400">{subcategory}</p>
                )}
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                <span className="text-xs ml-1">{rating}</span>
              </div>
            </div>
            
            <h3 className="text-md font-semibold mb-2 line-clamp-1">{title}</h3>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {discountPrice ? (
                  <div className="flex flex-col">
                    <span className="text-blue-500 font-semibold">${discountPrice}</span>
                    <span className="text-xs text-muted-foreground line-through">${price}</span>
                  </div>
                ) : (
                  <span className="text-blue-500 font-semibold">${price}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                  Buy on BuiltByBit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
