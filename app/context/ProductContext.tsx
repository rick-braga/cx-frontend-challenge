import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types/types';
import { searchProductsAPI } from '@/pages/api/search';

interface ProductContextProps {
  products: Product[];
  searchProducts: (query: string) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<any> = (props) => { 

  const [products, setProducts] = useState<Product[]>([]);

  const searchProducts = async (query: string) => {
    const results = await searchProductsAPI(query);
    setProducts(results);
  };

  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {props.children} {/* Use props.any */}
    </ProductContext.Provider>
  );
};
