import React, { useState } from 'react';
import { PriceFilter, Product } from '@/types/types';
import PriceFilterList from './PriceFilterList';
import styles from '@/components/ProductFilter/ProductFilter.module.css';
import PriceInput from './PriceInput';

interface ProductFilterProps {
  priceFilters: PriceFilter[];
  applyPriceFilter: (filterId: string, minPrice?: number, maxPrice?: number) => void;
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isFilterVisible: boolean;
  toggleFilterVisibility: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  priceFilters,
  applyPriceFilter,
  products,
  setFilteredProducts,
  isFilterVisible,
  toggleFilterVisibility,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Função para aplicar o filtro selecionado
  const handleApplyFilter = (filterId: string, min?: number, max?: number) => {
    setSelectedFilter(filterId);
    applyPriceFilter(filterId, min, max);
  };

  return (
    <div className={`${styles['ui-search-filter-dl']} ${isFilterVisible ? styles['visible'] : styles['hidden']}`}>
      <div className={styles['close-button']} onClick={toggleFilterVisibility}></div>
      <h3 className={styles['ui-search-filter-dt-title']}>Precio</h3>
      <PriceFilterList
        priceFilters={priceFilters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        applyPriceFilter={handleApplyFilter}
        products={products}
        setFilteredProducts={setFilteredProducts}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <PriceInput
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        applyPriceFilter={handleApplyFilter}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
    </div>
  );
};

export default ProductFilter;
