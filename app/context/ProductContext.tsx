import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types/types';
import { searchProductsAPI } from '@/pages/api/search';

// Define a interface para o contexto de produtos
interface ProductContextProps {
  products: Product[];
  searchProducts: (query: string) => void;
}

// Cria o contexto de produtos
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Hook personalizado para usar o contexto de produtos
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

// Componente de provedor para envolver a aplicação e fornecer o contexto de produtos
export const ProductProvider: React.FC<any> = (props) => { // Use props:any
  // Estado para armazenar os produtos
  const [products, setProducts] = useState<Product[]>([]);

  // Função para buscar produtos com base no texto de pesquisa
  const searchProducts = async (query: string) => {
    const results = await searchProductsAPI(query); // Use a função da API
    setProducts(results);
  };

  // Retorna o contexto de produtos com o estado e a função de busca
  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {props.children} {/* Use props.any */}
    </ProductContext.Provider>
  );
};
