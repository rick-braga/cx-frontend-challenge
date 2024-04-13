import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/types';
import { searchProductsAPI } from '@/pages/api/search'; // Importa a função de busca da API

// Define a ação assíncrona para buscar produtos
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
  searchQuery: '', // Inicialize searchQuery como uma string vazia
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
      // Quando os produtos são definidos, atualize filteredProducts para incluir todos os produtos
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
      // Filtrar os produtos com base na nova consulta de pesquisa
      if (action.payload) {
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
    // Ação para atualizar os produtos filtrados
    updateFilteredProducts(state, action: PayloadAction<Product[]>) {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchProducts.pending, (state) => {
      // Aqui você pode atualizar o estado enquanto a solicitação está pendente, se necessário
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      // Aqui você atualiza o estado com os resultados da pesquisa quando a solicitação é concluída com sucesso
      state.products = action.payload;
      state.filteredProducts = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      // Aqui você pode lidar com erros ou atualizar o estado se a solicitação for rejeitada
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
