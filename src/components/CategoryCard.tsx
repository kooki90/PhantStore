
import { Link } from 'react-router-dom';
import { ProductCategory, ProductSubcategory } from '@/types/product';

interface CategoryCardProps {
  category: ProductCategory | ProductSubcategory;
  isSubcategory?: boolean;
  parentCategory?: string;
}

const CategoryCard = ({ category, isSubcategory = false, parentCategory }: CategoryCardProps) => {
  // Determine the link URL based on whether this is a subcategory or main category
  const linkUrl = isSubcategory 
    ? `/products?category=${encodeURIComponent(parentCategory || '')}&subcategory=${encodeURIComponent(category.name)}`
    : `/products?category=${encodeURIComponent(category.name)}`;

  return (
    <Link 
      to={linkUrl}
      className="group glassmorphism rounded-xl overflow-hidden hover:border-phant-blue/30 border border-transparent transition-all duration-300"
    >
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-phant-blue/10 text-phant-blue">
          <span className="text-2xl" dangerouslySetInnerHTML={{ __html: category.icon }} />
        </div>
        <h3 className="text-lg font-medium mb-2 group-hover:text-phant-blue transition-colors">{category.name}</h3>
        <p className="text-sm text-phant-gray mb-3">{category.description}</p>
        <span className="text-xs bg-phant-dark-blue/50 px-2 py-1 rounded-full">
          {category.count} products
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
