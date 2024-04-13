import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductFilter from './ProductFilter';
import { Product } from '@/types/types';

// Mocks para as props necessárias
const mockPriceFilters = [
  { id: '1', name: 'Filter 1', minPrice: 0, maxPrice: 100 },
  { id: '2', name: 'Filter 2', minPrice: 101, maxPrice: 200 }
];
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    price: 50,
    installments: {
      quantity: 2,
      amount: 25,
      rate: 0,
      currency_id: 'ARS',
    },
    address: {
      state_name: 'Buenos Aires',
      city_name: 'Mar del Plata',
    },
    thumbnail: 'url-to-thumbnail-1',
    condition: 'new',
    free_shipping: true,
    available_quantity: 10,
  },
  {
    id: '2',
    title: 'Product 2',
    price: 150,
    installments: {
      quantity: 3,
      amount: 50,
      rate: 0,
      currency_id: 'ARS',
    },
    address: {
      state_name: 'Córdoba',
      city_name: 'Villa Carlos Paz',
    },
    thumbnail: 'url-to-thumbnail-2',
    condition: 'used',
    free_shipping: false,
    available_quantity: 5,
  },
  // ... mais produtos
];


const mockApplyPriceFilter = jest.fn();
const mockSetFilteredProducts = jest.fn();
const mockToggleFilterVisibility = jest.fn();

describe('ProductFilter', () => {
  it('deve renderizar o componente corretamente', () => {
    const { getByText } = render(
      <ProductFilter
        priceFilters={mockPriceFilters}
        applyPriceFilter={mockApplyPriceFilter}
        products={mockProducts}
        setFilteredProducts={mockSetFilteredProducts}
        isFilterVisible={true}
        toggleFilterVisibility={mockToggleFilterVisibility}
        selectedFilter={null}
      />
    );

    expect(getByText('Precio')).toBeInTheDocument();
  });

  it('deve chamar toggleFilterVisibility quando o botão de fechar é clicado', () => {
    const { getByRole } = render(
      <ProductFilter
        priceFilters={mockPriceFilters}
        applyPriceFilter={mockApplyPriceFilter}
        products={mockProducts}
        setFilteredProducts={mockSetFilteredProducts}
        isFilterVisible={true}
        toggleFilterVisibility={mockToggleFilterVisibility}
        selectedFilter={null}
      />
    );

    fireEvent.click(getByRole('button', { name: /close-button/i }));
    expect(mockToggleFilterVisibility).toHaveBeenCalled();
  });

  it('deve aplicar o filtro de preço quando um filtro é selecionado', () => {
    const { getByText } = render(
      <ProductFilter
        priceFilters={mockPriceFilters}
        applyPriceFilter={mockApplyPriceFilter}
        products={mockProducts}
        setFilteredProducts={mockSetFilteredProducts}
        isFilterVisible={true}
        toggleFilterVisibility={mockToggleFilterVisibility}
        selectedFilter={null}
      />
    );

    // Supondo que 'Filter 1' seja um texto renderizado pelo componente PriceFilterList
    fireEvent.click(getByText('Filter 1'));
    expect(mockApplyPriceFilter).toHaveBeenCalledWith('1', 0, 100);
  });
});
