import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/reducers/rootReducer';
import SearchSort from './SearchSort';

// Crie uma store de teste com o rootReducer da sua aplicação usando configureStore
const store = configureStore({ reducer: rootReducer });

describe('SearchSort component', () => {
  const handleSortChangeMock = jest.fn();
  const toggleFilterVisibilityMock = jest.fn();
  const availableSortsMock = [
    { id: 'relevance', name: 'Mais relevante' },
    { id: 'price-high', name: 'Maior preço' },
    { id: 'price-low', name: 'Menor preço' }
  ];

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchSort
          handleSortChange={handleSortChangeMock}
          availableSorts={availableSortsMock}
          toggleFilterVisibility={toggleFilterVisibilityMock}
        />
      </Provider>
    );

    const sortSelect = getByTestId('sort-select');
    expect(sortSelect).toBeInTheDocument();
    expect(sortSelect).toHaveValue('relevance');
  });

  it('calls handleSortChange when a new option is selected', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchSort
          handleSortChange={handleSortChangeMock}
          availableSorts={availableSortsMock}
          toggleFilterVisibility={toggleFilterVisibilityMock}
        />
      </Provider>
    );

    const sortSelect = getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'price-high' } });
    expect(handleSortChangeMock).toHaveBeenCalledWith('price-high');
  });

  it('calls toggleFilterVisibility when the toggle button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchSort
          handleSortChange={handleSortChangeMock}
          availableSorts={availableSortsMock}
          toggleFilterVisibility={toggleFilterVisibilityMock}
        />
      </Provider>
    );

    const toggleButton = getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    expect(toggleFilterVisibilityMock).toHaveBeenCalled();
  });
});
