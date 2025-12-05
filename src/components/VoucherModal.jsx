import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PriceFormat } from '../utils/formatter';
import { Receipt } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './VoucherModal.module.css';

// Importamos los sub-componentes (Composicion)
import VoucherItemsList from './VoucherItemsList';
import VoucherTotalSummary from './VoucherTotalSummary';
import VoucherEmailForm from './VoucherEmailForm';
import BackToCatalogLink from './BackToCatalogLink';

export default function VoucherModal({ cart, subtotal, discount, cartTotal, onClose }) {
  // UX: Pre-llenamos el correo si el usuario ya esta logueado
  const { currentUser } = useAuth();
  const [email, setEmail] = useState(currentUser?.email || '');
  
  // Estado para feedback visual de envío
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  // Fecha formateada para Chile (es-CL)
  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Simulamos el backend de envio de correos
  const handleSimulateEmailSend = (e) => {
    e.preventDefault();
    
    if (email.trim() === '') {
      toast.error("Por favor, ingresa un correo.");
      return;
    }
    
    // Feedback inmediato al usuario
    console.log(`Simulando envio a: ${email}`);
    setIsEmailSent(true);
    toast.success("Comprobante enviado (Simulado)!");
  };

  const handleCloseAndNavigate = () => {
    onClose(); 
    navigate('/products'); // Redireccion final
  };

  return (
    <div className={styles.voucherSimple}>
      <div className={styles.voucherContent}>
        <h3><Receipt /> compra realizada</h3>
        
        <div className={styles.voucherDetails}>
          <p><strong>fecha:</strong> <span>{fecha}</span></p>
          
          {/* COMPOSICIoN: Delegamos la lista y el resumen a componentes hijos */}
          <VoucherItemsList cart={cart} />
          <VoucherTotalSummary subtotal={subtotal} discount={discount} cartTotal={cartTotal} />
        </div>

        {/* Componente aislado para el formulario de email */}
        <VoucherEmailForm
          isEmailSent={isEmailSent}
          email={email}
          setEmail={setEmail}
          onSubmit={handleSimulateEmailSend}
        />

        <div className={styles.voucherActions}>
          <BackToCatalogLink onClick={handleCloseAndNavigate} />
        </div>
      </div>
    </div>
  );
}