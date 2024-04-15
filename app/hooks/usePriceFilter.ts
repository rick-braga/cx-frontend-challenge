import { useState, useEffect } from 'react';
import { Product } from '@/types/types';

interface PriceFilter {
  id: string;
  name: string;
}

const usePriceFilter = (products: Product[], priceFilters: PriceFilter[]) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;
  
    if (selectedFilter) {
      const [minFilterPrice, maxFilterPrice] = selectedFilter.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.price >= minFilterPrice && product.price <= maxFilterPrice
      );
    }
  
    const minPriceValue = minPrice ? Number(minPrice) : null;
    const maxPriceValue = maxPrice ? Number(maxPrice) : null;
  
    if (minPriceValue !== null) {
      filtered = filtered.filter(product => product.price >= minPriceValue);
    }
  
    if (maxPriceValue !== null) {
      filtered = filtered.filter(product => product.price <= maxPriceValue);
    }
  
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, selectedFilter, products]);
  

  return {
    selectedFilter,
    setSelectedFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    setFilteredProducts
  };
};

export default usePriceFilter;
