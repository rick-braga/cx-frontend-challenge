import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers/rootReducer';
import {
  setSortOption,
  toggleFilterVisibility,
  applyManualPriceFilter,
  applyPriceRangeFilter,
  searchProducts
} from '@/reducers/productsSlice';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '@/components/SearchResult/SearchResult.module.css';
import ProductFilter from '../ProductFilter/ProductFilter';
import SearchSort from '../SearchSort/SearchSort';
import { Product } from '@/types/types';
import { priceFilters, getPriceRange } from '@/utils/priceFilters';
import { AppDispatch } from '@/store/store';

const SearchResult: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryFromState = useSelector((state: RootState) => state.products.searchQuery);
  const products = useSelector((state: RootState) => state.products.products);
  const sortOption = useSelector((state: RootState) => state.products.sortOption);
  const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts);
  const selectedPriceFilter = useSelector((state: RootState) => state.products.selectedPriceFilter);
  const minPrice = useSelector((state: RootState) => state.products.minPrice);
  const maxPrice = useSelector((state: RootState) => state.products.maxPrice);
  const isFilterVisible = useSelector((state: RootState) => state.products.isFilterVisible);

  // Estado local para produtos filtrados
  const [localFilteredProducts, setLocalFilteredProducts] = useState<Product[]>(filteredProducts);

  useEffect(() => {
    dispatch(searchProducts(queryFromState));
  }, [dispatch, queryFromState]);

  useEffect(() => {
    setLocalFilteredProducts(filteredProducts);
  }, [filteredProducts]);

  const availableSorts = [
    { id: 'relevance', name: 'Más relevantes' },
    { id: 'price-high', name: 'Mayor precio' },
    { id: 'price-low', name: 'Menor precio' }
  ];

  const sortedProducts = (products: Product[]) => {
    switch (sortOption) {
      case 'relevance':
        return products;
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortOption(value));
  };

  const handleToggleFilterVisibility = () => {
    dispatch(toggleFilterVisibility());
  };

  const applyManualPriceFilterHandler = (min: number, max: number) => {
    dispatch(applyManualPriceFilter({ minPrice: min, maxPrice: max }));
  };

  const applyPriceRangeFilterHandler = (filterId: string) => {
    const { minAmount, maxAmount } = getPriceRange(filterId);
    dispatch(applyPriceRangeFilter({ minAmount, maxAmount }));
  };

  const applyPriceFilter = (filterId: string, min?: number, max?: number) => {
    if (min !== undefined && max !== undefined) {
      applyManualPriceFilterHandler(min, max);
    } else {
      applyPriceRangeFilterHandler(filterId);
    }
  };

  return (
    <div className={styles['ui-search']}>
      <section className={styles['ui-search-sort']}>
        <SearchSort
          handleSortChange={handleSortChange}
          availableSorts={availableSorts}
          toggleFilterVisibility={handleToggleFilterVisibility}
        />
      </section>
      <div className={styles['ui-search-main']}>
        <aside className={styles['ui-search-sidebar']}>
          <ProductFilter
            priceFilters={priceFilters}
            selectedFilter={selectedPriceFilter}
            applyPriceFilter={applyPriceFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            products={localFilteredProducts}
            isFilterVisible={isFilterVisible}
            toggleFilterVisibility={handleToggleFilterVisibility}
            setFilteredProducts={setLocalFilteredProducts}
          />
        </aside>
        <section className={styles['ui-search-results']}>
          {sortedProducts(localFilteredProducts).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SearchResult;
