export interface Product {
  id: string;
  title: string;
  price: number;
  installments: {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
  };
  address: {
    state_name: string;
    city_name: string;
  };
  thumbnail: string;
  condition: string;
  free_shipping: boolean;
  available_quantity: number;
}

export interface PriceFilter {
  id: string;
  name: string;
}
