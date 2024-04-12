import ProductSearch from '../ProductSearch/ProductSearch';
import styles from '@/components/Header/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles['nav-header']}>
      <div className={styles['nav-bounds']}>
        <div className={styles['nav-logo']}>
          <a href="//www.mercadolivre.com.ar">Mercado Libre Argentina - Donde comprar y vender de todo</a>
        </div>
        <ProductSearch/>
      </div>
    </header>
  );
};

export default Header;
