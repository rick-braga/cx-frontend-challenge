import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { PriceFilter, Product } from '@/types/types';
import styles from '@/components/ProductFilter/ProductFilter.module.css';

interface PriceFilterListProps {
  priceFilters: PriceFilter[];
  selectedFilter: string | null;
  setSelectedFilter: Dispatch<SetStateAction<string | null>>;
  applyPriceFilter: (filterId: string, minPrice?: number, maxPrice?: number) => void;
  products: Product[];
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
  minPrice?: string;
  maxPrice?: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
}

const PriceFilterList: React.FC<PriceFilterListProps> = ({
  priceFilters,
  selectedFilter,
  setSelectedFilter,
  applyPriceFilter,
  products,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const quantityMap: { [key: string]: number } = {};
    priceFilters.forEach(filter => {
      const [minFilter, maxFilter] = filter.id.split('-').map(Number);
      quantityMap[filter.id] = products.reduce((sum, product) => {
        const productPrice = Math.round(product.price);
        return productPrice >= minFilter && productPrice <= maxFilter ? sum + 1 : sum;
      }, 0);
    });
    setTotalQuantity(quantityMap);
  }, [priceFilters, products]);
  

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    applyPriceFilter(filterId);
  };

  return (
    <ul>
    {priceFilters.map((filter: PriceFilter) => (
      <li key={filter.id} className={styles['ui-search-filter-container']}>
        <input
            className={styles['ui-search-link']}
            type="radio"
            id={filter.id}
            name="priceFilter"
            value={filter.id}
            checked={selectedFilter === filter.id}
            onChange={() => handleFilterChange(filter.id)}
          />
          <label htmlFor={filter.id} className={styles['ui-search-filter-name']}>{filter.name}</label>
          <span className={styles['ui-search-filter-results-qty']}>
            ({totalQuantity[filter.id] ?? 0})
          </span>
      </li>
    ))}
  </ul>
  );
};

export default PriceFilterList;
