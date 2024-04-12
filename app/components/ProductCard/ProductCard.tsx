import Image from 'next/image';
import { Product } from '@/types/types';
import styles from '@/components/ProductCard/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles['product-card__item']}>
      <div className={styles['product-card__picture']}>
        <Image src={product.thumbnail} alt={product.title} width={90} height={90} />
      </div>
      <div className={styles['product-card__content']}>
        <h2 className={styles['product-card__title']}><a href="#">{product.title}</a></h2>
        <span className={styles['product-card__price']}>
          <span className={styles['product-card__part']}>
            <span>$</span>
            <span>{product.price}</span>
          </span>
          {product.shipping.free_shipping ? (
            <span className={styles['product-card__shipping']} title='Envío gratis'>Envío gratis</span>
          ) : (
            ""
          )}
        </span>
        {product.installments && (
          <span className={styles['product-card__installments']}>
            En {product.installments.quantity} cuotas de <span className={styles['old-price-amount__fraction']}>${product.installments.amount}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
