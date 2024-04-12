import React, { Dispatch, SetStateAction, KeyboardEvent, useState } from 'react';
import styles from '@/components/ProductFilter/ProductFilter.module.css';

interface PriceInputProps {
  selectedFilter: string | null;
  setSelectedFilter: Dispatch<SetStateAction<string | null>>;
  applyPriceFilter: (filterId: string, minPrice?: number, maxPrice?: number) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({
  selectedFilter,
  applyPriceFilter,
}) => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyFilter();
    }
  };

  const handleApplyFilter = () => {
    applyFilter();
  };

  const applyFilter = () => {
    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);
    
    if (!isNaN(minPriceValue) || !isNaN(maxPriceValue)) {
      if (!isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
        applyPriceFilter(selectedFilter || '', minPriceValue, maxPriceValue);
      } else if (!isNaN(minPriceValue)) {
        applyPriceFilter(selectedFilter || '', minPriceValue, Infinity);
      } else if (!isNaN(maxPriceValue)) {
        applyPriceFilter(selectedFilter || '', -Infinity, maxPriceValue);
      }
    }
  };
  

  const isApplyButtonDisabled = () => {
    if (minPrice !== '' || maxPrice !== '') {
      const minPriceIsNumber = /^\d*\.?\d*$/.test(minPrice);
      const maxPriceIsNumber = /^\d*\.?\d*$/.test(maxPrice);
      return !(minPriceIsNumber && maxPriceIsNumber);
    }
    return true;
  };

  return (
    <div>
      <div className={styles['ui-search-price-filter']}>
        <div className={styles['ui-search-price-filter-container']}>
          <div className={styles['andes-form-control']}>
            <div className={styles['andes-form-control__control']}>
              <input
                className={styles['andes-form-control__field']}
                type="text"
                id="minPrice"
                value={minPrice}
                placeholder="Mínimo"
                onChange={handleMinPriceChange}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className={styles['ui-search-price-filter-container']}>
          <div className={styles['andes-form-control']}>
            <div className={styles['andes-form-control__control']}>
              <input
                className={styles['andes-form-control__field']}
                type="text"
                id="maxPrice"
                value={maxPrice}
                placeholder="Máximo"
                onChange={handleMaxPriceChange}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className={styles['ui-search-price-filter-container']}>
          <button
            onClick={handleApplyFilter}
            type="submit"
            className={styles['ui-search-price-filter-action-btn']}
            aria-label="Aplicar"
            disabled={isApplyButtonDisabled()}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="rgba(0, 0, 0, 0.9)">
              <path d="M8.27686 4.34644L7.42834 5.19496L12.224 9.99059L7.42334 14.7912L8.27187 15.6397L13.921 9.99059L8.27686 4.34644Z" fill="rgba(0, 0, 0, 0.9)"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
