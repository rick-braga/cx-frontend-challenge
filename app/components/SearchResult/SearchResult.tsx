import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers/rootReducer';
import { setSortOption, toggleFilterVisibility, applyManualPriceFilter, applyPriceRangeFilter, searchProducts } from '@/reducers/productsSlice'; // Importa as ações necessárias
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '@/components/SearchResult/SearchResult.module.css';
import ProductFilter from '../ProductFilter/ProductFilter';
import SearchSort from '../SearchSort/SearchSort';
import { Product } from '@/types/types';
import { priceFilters, getPriceRange } from '@/utils/priceFilters';
import { AppDispatch } from '@/store/store'; 


const SearchResult: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryFromState: string = useSelector((state: RootState) => state.products.searchQuery);
  const products = useSelector((state: RootState) => state.products.products);
  const sortOption = useSelector((state: RootState) => state.products.sortOption);
  const filteredProducts = useSelector((state: RootState) => state.products.filteredProducts); 
  const selectedPriceFilter = useSelector((state: RootState) => state.products.selectedPriceFilter);
  const minPrice = useSelector((state: RootState) => state.products.minPrice);
  const maxPrice = useSelector((state: RootState) => state.products.maxPrice);
  const isFilterVisible = useSelector((state: RootState) => state.products.isFilterVisible);

  useEffect(() => {
    const actionResultPromise = dispatch(searchProducts(queryFromState));
  
    actionResultPromise
      .then((actionResult) => {
        if (searchProducts.fulfilled.match(actionResult)) {
          // Ação foi cumprida, o payload é do tipo Product[]
          console.log('Produtos carregados:', actionResult.payload);
        } else if (searchProducts.rejected.match(actionResult)) {
          // Ação foi rejeitada, o payload pode ser de qualquer tipo
          console.error('Falha ao carregar produtos:', actionResult.payload);
        }
      })
      .catch((error) => {
        // Erro ao despachar a ação ou erro não relacionado ao Redux
        console.error('Erro ao buscar produtos:', error);
      });
  }, [dispatch, queryFromState]);
  

  const availableSorts = [
    { id: 'relevance', name: 'Mais relevante' },
    { id: 'price-high', name: 'Maior preço' },
    { id: 'price-low', name: 'Menor preço' }
  ];

  const sortedProducts = (filteredProducts: Product[]) => {
    switch (sortOption) {
      case 'relevance':
        return filteredProducts;
      case 'price-high':
        return [...filteredProducts].sort((a: Product, b: Product) => b.price - a.price);
      case 'price-low':
        return [...filteredProducts].sort((a: Product, b: Product) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortOption(value));
  };

  const handleToggleFilterVisibility = () => {
    dispatch(toggleFilterVisibility());
  };

  const applyManualPriceFilterHandler = (minPrice: number, maxPrice: number) => {
    dispatch(applyManualPriceFilter({ minPrice, maxPrice }));
  };

  const applyPriceRangeFilterHandler = (filterId: string) => {
    const { minAmount, maxAmount } = getPriceRange(filterId);
    dispatch(applyPriceRangeFilter({ minAmount, maxAmount }));
  };

  const applyPriceFilter = (filterId: string, minPrice?: number, maxPrice?: number) => {
    if (minPrice !== undefined && maxPrice !== undefined) {
      applyManualPriceFilterHandler(minPrice, maxPrice);
    } else {
      applyPriceRangeFilterHandler(filterId);
    }
  };

  return (
    <div className={styles['ui-search']}>
      <section className={styles['ui-search-sort']}>
        <SearchSort handleSortChange={handleSortChange} availableSorts={availableSorts} toggleFilterVisibility={handleToggleFilterVisibility} />
      </section>
      <div className={styles['ui-search-main']}>
        <aside className={styles['ui-search-sidebar']}>
          <ProductFilter
              priceFilters={priceFilters}
              selectedFilter={selectedPriceFilter}
              applyPriceFilter={applyPriceFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              products={filteredProducts}
              isFilterVisible={isFilterVisible}
              toggleFilterVisibility={handleToggleFilterVisibility}
            />
        </aside>
        <section className={styles['ui-search-results']}>
          {sortedProducts(filteredProducts).map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SearchResult;
