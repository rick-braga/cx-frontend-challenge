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
    { id: 'relevance', name: 'Más relevantes' },
    { id: 'price-high', name: 'Mayor precio' },
    { id: 'price-low', name: 'Menor precio' }
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

    const sortLabel = getByTestId('sort-label');
    expect(sortLabel).toBeInTheDocument();
    expect(sortLabel.textContent).toBe('Ordenar por:');
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
    fireEvent.click(sortSelect);
    const option = getByTestId('price-high');
    fireEvent.click(option);
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
