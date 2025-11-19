import React from 'react';
import { PriceFormat } from '../utils/formatter';
import styles from './VoucherModal.module.css';

export default function VoucherTotalSummary({ subtotal, discount, cartTotal }) {
  return (
    <div className={styles.voucherTotalSummary}>
      <p className={styles.voucherLine}>
        <strong>subtotal:</strong> <span>{PriceFormat(subtotal)}</span>
      </p>
      {discount > 0 && (
        <p className={`${styles.voucherLine} ${styles.descuento}`}>
          <strong>descuento duoc (10%):</strong> <span>- {PriceFormat(discount)}</span>
        </p>
      )}
      <p className={styles.voucherTotal}>
        <strong>total:</strong> <span>{PriceFormat(cartTotal)}</span>
      </p>
    </div>
  );
}