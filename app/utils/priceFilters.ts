export const priceFilters = [
  { id: '*-3000.0', name: 'Até $ 3.000' },
  { id: '3000.0-9500.0', name: 'De $ 3.000 a $ 9.500' },
  { id: '9500.0-40000.0', name: 'De $ 9.500 a $ 40.000' }
];

export const getPriceRange = (filterId: string) => {
  switch (filterId) {
    case '*-3000.0':
      return { minAmount: 0, maxAmount: 3000 };
    case '3000.0-9500.0':
      return { minAmount: 3000, maxAmount: 9500 };
    case '9500.0-40000.0':
      return { minAmount: 9500, maxAmount: 40000 };
    default:
      return { minAmount: 0, maxAmount: Number.POSITIVE_INFINITY };
  }
};
