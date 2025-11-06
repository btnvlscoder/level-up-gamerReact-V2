// Contenido de: src/components/VoucherModal.jsx (Refactorizado Híbrido)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PriceFormat } from '../utils/formatter';
import { Receipt, Send, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

// 1. Importar los estilos del módulo
import styles from './VoucherModal.module.css';

export default function VoucherModal({ cart, subtotal, discount, cartTotal, onClose }) {
  const { currentUser } = useAuth();
  
  const [email, setEmail] = useState(currentUser?.email || ''); 
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleSimulateEmailSend = (e) => {
    e.preventDefault(); 
    
    if (email.trim() === '') {
      toast.error("Por favor, ingresa un correo.");
      return;
    }
    
    console.log(`Simulando envío de boleta a: ${email}`);
    setIsEmailSent(true);
    toast.success("Comprobante enviado (simulado)!");
  };

  const handleCloseAndNavigate = () => {
    onClose(); 
    navigate('/products');
  };

  return (
    // 2. Usar el objeto 'styles' para las clases locales
    <div className={styles.voucherSimple}>
      <div className={styles.voucherContent}>
        <h3><Receipt /> Compra Realizada</h3>
        <div className={styles.voucherDetails}>
          <p><strong>Fecha:</strong> <span>{fecha}</span></p>
          
          <div className={styles.voucherItemsList}>
            {cart.map(item => (
              <div className={styles.voucherItem} key={item.code}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{PriceFormat(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.voucherTotalSummary}>
            <p className={styles.voucherLine}>
              <strong>Subtotal:</strong> <span>{PriceFormat(subtotal)}</span>
            </p>
            {discount > 0 && (
              <p className={`${styles.voucherLine} ${styles.descuento}`}>
                <strong>Descuento Duoc (10%):</strong> <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className={styles.voucherTotal}>
              <strong>Total:</strong> <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>
        </div>

        <form className={styles.voucherEmailForm} onSubmit={handleSimulateEmailSend}>

          {!isEmailSent ? (
            <>
              <p>Ingresa tu correo para enviar una copia:</p>
              <input 
                type="email" 
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* 3. Usar la CLASE GLOBAL 'btn-imprimir' */ }
              <button 
                type="submit" 
                className="btn-imprimir"
              >
                <Send /> Enviar Copia
              </button>
            </>

          ) : (
            <div className={styles.emailSuccessMessage}>
              <CheckCircleFill />
              <p>¡Se ha enviado el comprobante al correo <strong>{email}</strong>!</p>
            </div>
          )}
        </form>

        <div className={styles.voucherActions}>
          {/* 3. Usar la CLASE GLOBAL 'btn-volver' */ }
          <button className="btn-volver" onClick={handleCloseAndNavigate}>
            <ArrowLeft /> Volver al Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}