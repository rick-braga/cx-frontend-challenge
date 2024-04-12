import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceInput from '@/components/ProductFilter/PriceInput';

// Função mock para simular a aplicação do filtro de preço
const applyPriceFilterMock = jest.fn();

// Função mock para simular a atualização do filtro selecionado
const setSelectedFilterMock = jest.fn();

describe('PriceInput Component', () => {
  beforeEach(() => {
    // Limpa todas as chamadas e instâncias das funções mock antes de cada teste
    applyPriceFilterMock.mockClear();
    setSelectedFilterMock.mockClear();
  });

  test('permite que o usuário insira preços mínimos e máximos', () => {
    render(<PriceInput selectedFilter={null} setSelectedFilter={setSelectedFilterMock} applyPriceFilter={applyPriceFilterMock} />);

    const minPriceInput = screen.getByPlaceholderText('Mínimo') as HTMLInputElement;
    const maxPriceInput = screen.getByPlaceholderText('Máximo') as HTMLInputElement;

    fireEvent.change(minPriceInput, { target: { value: '10' } });
    fireEvent.change(maxPriceInput, { target: { value: '50' } });

    expect(minPriceInput.value).toBe('10');
    expect(maxPriceInput.value).toBe('50');
  });

  test('chama applyPriceFilter com os valores corretos quando a tecla Enter é pressionada', () => {
    render(<PriceInput selectedFilter="filter-id" setSelectedFilter={setSelectedFilterMock} applyPriceFilter={applyPriceFilterMock} />);

    const minPriceInput = screen.getByPlaceholderText('Mínimo') as HTMLInputElement;
    fireEvent.change(minPriceInput, { target: { value: '5' } });
    fireEvent.keyDown(minPriceInput, { key: 'Enter' });

    expect(applyPriceFilterMock).toHaveBeenCalledWith('filter-id', 5, Infinity);
  });

  test('o botão de aplicar está desabilitado quando os campos de preço estão vazios', () => {
    render(<PriceInput selectedFilter={null} setSelectedFilter={setSelectedFilterMock} applyPriceFilter={applyPriceFilterMock} />);

    const applyButton = screen.getByRole('button', { name: 'Aplicar' });

    expect(applyButton).toBeDisabled();
  });

  test('o botão de aplicar está habilitado quando os campos de preço são válidos', () => {
    render(<PriceInput selectedFilter={null} setSelectedFilter={setSelectedFilterMock} applyPriceFilter={applyPriceFilterMock} />);

    const minPriceInput = screen.getByPlaceholderText('Mínimo') as HTMLInputElement;
    const maxPriceInput = screen.getByPlaceholderText('Máximo') as HTMLInputElement;
    const applyButton = screen.getByRole('button', { name: 'Aplicar' });

    fireEvent.change(minPriceInput, { target: { value: '10' } });
    fireEvent.change(maxPriceInput, { target: { value: '100' } });

    expect(applyButton).not.toBeDisabled();
  });

});
