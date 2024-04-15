import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/types';
import { searchProductsAPI } from '@/pages/api/search'; // Importa a função de busca da API

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    return searchProductsAPI(query);
  }
);

interface ProductsState {
  products: Product[];
  sortOption: string;
  filteredProducts: Product[];
  selectedPriceFilter: string | null;
  minPrice: number;
  maxPrice: number;
  isFilterVisible: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  products: [],
  sortOption: 'relevance',
  filteredProducts: [],
  selectedPriceFilter: null,
  minPrice: 0,
  maxPrice: 0,
  isFilterVisible: false,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFilterVisibility(state) {
      state.isFilterVisible = !state.isFilterVisible;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
    applyManualPriceFilter(state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) {
      const { minPrice, maxPrice } = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    },
    applyPriceRangeFilter(state, action: PayloadAction<{ minAmount: number; maxAmount: number }>) {
      const { minAmount, maxAmount } = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        return product.price >= minAmount && product.price <= maxAmount;
      });
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (action.payload) {
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
    updateFilteredProducts(state, action: PayloadAction<Product[]>) {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchProducts.pending, (state) => {
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
    });
  },
});

export const {
  toggleFilterVisibility,
  setProducts,
  setSortOption,
  applyManualPriceFilter,
  applyPriceRangeFilter,
  setSearchQuery,
  updateFilteredProducts, // Exporta a nova ação
} = productsSlice.actions;

export default productsSlice.reducer;
