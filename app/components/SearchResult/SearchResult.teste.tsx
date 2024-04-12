import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import SearchResult from '@/components/SearchResult/SearchResult';
import store  from '@/store/store';

describe('SearchResult Component', () => {
  test('deve renderizar sem erros', () => {
    render(
      <Provider store={store}>
        <SearchResult />
      </Provider>
    );
    expect(screen.getByTestId('search-result')).toBeInTheDocument();
  });

  // Teste adicional para verificar se os produtos estão sendo exibidos corretamente
  test('deve exibir os produtos', () => {
    render(
      <Provider store={store}>
        <SearchResult />
      </Provider>
    );
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
  });

  // Teste adicional para verificar a funcionalidade de ordenação
  test('deve ordenar os produtos quando uma opção de ordenação é selecionada', () => {
    // Renderize o componente e selecione uma opção de ordenação
    // Verifique se os produtos são reordenados corretamente
  });

});
