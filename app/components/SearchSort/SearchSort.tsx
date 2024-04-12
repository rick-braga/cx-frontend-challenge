import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '@/components/SearchSort/SearchSort.module.css';

interface SortOption {
  id: string;
  name: string;
}

interface SearchSortProps {
  handleSortChange: (value: string) => void;
  availableSorts: SortOption[];
  toggleFilterVisibility?: () => void;
}

const SearchSort: React.FC<SearchSortProps> = ({ handleSortChange, availableSorts, toggleFilterVisibility }) => {
  const dispatch = useDispatch();

  const handleToggleFilterVisibility = () => {
    if (toggleFilterVisibility) {
      toggleFilterVisibility();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSortChange(e.target.value);
  };

  return (
    <div className={styles['ui-search-view-options']}>
      <div className={styles['ui-search-view-options__group']}>
        <button
          onClick={handleToggleFilterVisibility}
          className={styles['toggle-button']}
          data-testid="toggle-button" // Adiciona um ID para identificação nos testes
        >
          <span className={styles['toggle-icon']}></span>
        </button>
        <div className={styles['ui-search-view-options__title']}>
          <label htmlFor="sort-select" data-testid="sort-label">Ordenar por:</label> {/* Adiciona um ID para identificação nos testes */}
        </div>
        <div className={styles['ui-search-sort-filter']}>
          <select
            id="sort-select"
            onChange={handleOnChange}
            data-testid="sort-select" // Adiciona um ID para identificação nos testes
          >
            {availableSorts.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchSort;
