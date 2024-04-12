import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard/ProductCard';

// Mock do objeto 'Product' para ser usado nos testes
const mockProduct = {
  id: '1',
  title: 'Produto Teste',
  price: 100, // Preço como número
  thumbnail: '/path/to/image.jpg',
  condition: 'new',
  free_shipping: true,
  available_quantity: 10,
  installments: {
    quantity: 2, // Quantidade como número
    amount: 50,  // Valor da parcela como número
    rate: 0,     // Taxa de juros, ajuste conforme necessário
    currency_id: 'ARS' // ID da moeda, ajuste conforme necessário
  },
  address: {
    state_name: 'Estado Teste',
    city_name: 'Cidade Teste'
  }
};

describe('ProductCard Component', () => {
  it('deve renderizar o título do produto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
  });

  it('deve renderizar o preço do produto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('deve renderizar "Envío gratis" se o produto tiver frete grátis', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });

  it('não deve renderizar "Envío gratis" se o produto não tiver frete grátis', () => {
    const productWithoutFreeShipping = {
      ...mockProduct,
      shipping: { free_shipping: false }
    };
    render(<ProductCard product={productWithoutFreeShipping} />);
    expect(screen.queryByText('Envío gratis')).not.toBeInTheDocument();
  });

  it('deve renderizar as parcelas se o produto tiver opção de parcelamento', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('En 2 cuotas de $50')).toBeInTheDocument();
  });
});
