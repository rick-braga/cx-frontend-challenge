import { Product } from '@/types/types';

export const searchProductsAPI = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching for products:', error);
    return [];
  }
};