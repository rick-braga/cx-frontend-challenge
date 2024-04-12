import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/reducers/productsSlice';
import { FaSearch } from 'react-icons/fa';
import styles from '@/components/ProductSearch/ProductSearch.module.css';


const ProductSearch: React.FC = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const query = inputRef.current?.value || '';
        dispatch(setSearchQuery(query));
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [dispatch]);

  const handleSearchClick = () => {
    const query = inputRef.current?.value || '';
    dispatch(setSearchQuery(query));
  };

  console.log(handleSearchClick)

  return (
    <div className={styles['nav-search']}>
      <label className={styles['nav-header-visually-hidden']}>Buscar productos, marcas y más…</label>
      <input
        ref={inputRef}
        type="text"
        className={styles['nav-search-input']}
        placeholder="Buscar productos, marcas y más…"
        maxLength={120}
      />
      <button onClick={handleSearchClick} type="button" className={styles['nav-search-btn']}>
        <div role="img" aria-label="Buscar" className={styles['nav-icon-search']}>
          <FaSearch />
        </div>
      </button>
    </div>
  );
};

export default ProductSearch;
