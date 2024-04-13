export const priceFilters = [
  { id: '0-3000', name: 'Hasta $ 3.000' },
  { id: '3000-9500', name: 'De $ 3.000 a $ 9.500' },
  { id: '9500-40000', name: 'De $ 9.500 a $ 40.000' }
];

export const getPriceRange = (filterId: string) => {
  switch (filterId) {
    case '0-3000':
      return { minAmount: 0, maxAmount: 3000 };
    case '3000-9500':
      return { minAmount: 3000, maxAmount: 9500 };
    case '9500-40000':
      return { minAmount: 9500, maxAmount: 40000 };
    default:
      return { minAmount: 0, maxAmount: Number.POSITIVE_INFINITY };
  }
};
