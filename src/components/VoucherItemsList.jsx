import React from 'react';
import { PriceFormat } from '../utils/formatter';
import styles from './VoucherModal.module.css';

export default function VoucherItemsList({ cart }) {
  return (
    <div className={styles.voucherItemsList}>
      {cart.map(item => (
        <div className={styles.voucherItem} key={item.code}>
          <span>{item.name} (x{item.quantity})</span>
          <span>{PriceFormat(item.price * item.quantity)}</span>
        </div>
      ))}
    </div>
  );
}