import React, { useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState<string | null>(availableSorts[0]?.id);
  const [isSortListVisible, setIsSortListVisible] = useState<boolean>(false);

  const handleToggleFilterVisibility = () => {
    if (toggleFilterVisibility) {
      toggleFilterVisibility();
    }
  };

  const handleOnClick = (optionId: string) => {
    handleSortChange(optionId);
    setSelectedOption(optionId);
    setIsSortListVisible(false);
  };

  const handleDropdownClick = () => {
    setIsSortListVisible(!isSortListVisible);
  };

  const selectedOptionName = availableSorts.find(option => option.id === selectedOption)?.name || 'Más relevantes';

  return (
    <section className={styles['options__container']}>
      <div className={styles['view-options']}>
        <button
          onClick={handleToggleFilterVisibility}
          className={styles['toggle-button']}
          data-testid="toggle-button"
          role="button"
        >
          <span className={styles['toggle-icon']}></span>
        </button>
        <div className={styles['view-options__group']}>
          <div className={styles['view-options__title']}>
            <label htmlFor="sort-select" data-testid="sort-label">Ordenar por:</label>
          </div>
          <div className={styles['sort-filter']}>
            <div className={styles['sort-filter__dropdown']}>
              <button onClick={handleDropdownClick} className={styles['dropdown__trigger']} type="button" aria-expanded="true" role="button">
                <span>{selectedOptionName}</span>
                <div className={styles['trigger__arrow']} aria-hidden="true">
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="rgba(0, 0, 0, 0.9)">
                    <title>Seta para baixo</title>
                    <path d={isSortListVisible ? "M2.64771 8.29553L6 4.94328L9.35225 8.29553L10.1477 7.5L6 3.35225L1.85225 7.5L2.64771 8.29553Z" : "M9.35229 3.70447L6.00004 7.05672L2.64779 3.70447L1.85229 4.49996L6.00004 8.64771L10.1478 4.49996L9.35229 3.70447Z"} fill="rgba(0, 0, 0, 0.9)"></path>
                  </svg>
                </div>
              </button>
            </div>
            {isSortListVisible && (
              <div className={`${styles['popper']} active`}>
                <div className={styles['popper__content']}>
                  <ul id="sort-select" data-testid="sort-select">
                    {availableSorts.map(option => (
                      <li
                        key={option.id}
                        onClick={() => handleOnClick(option.id)}
                        className={option.id === selectedOption ? 'selected' : ''}
                        role="option"
                      >
                        {option.id === selectedOption && <div className={styles['before']} />}
                        <div className={styles['item-first-column']}>
                          <div className={styles['item-text']}>
                          <span style={option.id === selectedOption ? {color: '#3483fa'} : {}} className={styles['item-primary']}>{option.name}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSort;
