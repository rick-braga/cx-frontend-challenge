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
}

const PriceFilterList: React.FC<PriceFilterListProps> = ({
  priceFilters,
  selectedFilter,
  setSelectedFilter,
  applyPriceFilter,
  products,
  setFilteredProducts,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const quantityMap: { [key: string]: number } = {};
    priceFilters.forEach(filter => {
      const [minFilter, maxFilter] = filter.id.split('-').map(parseFloat);
      quantityMap[filter.id] = products.reduce((sum, product) => {
        return product.price >= minFilter && product.price <= maxFilter ? sum + product.available_quantity : sum;
      }, 0);
    });
    setTotalQuantity(quantityMap);
  }, [products, priceFilters]);

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
          <span className={styles['ui-search-filter-results-qty']}>({totalQuantity[filter.id]})</span>
        </li>
      ))}
    </ul>
  );
};

export default PriceFilterList;
