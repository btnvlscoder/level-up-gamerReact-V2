import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PriceFormat } from '../utils/formatter';
import { Receipt, ArrowLeft } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './VoucherModal.module.css';
import VoucherItemsList from './VoucherItemsList';
import VoucherTotalSummary from './VoucherTotalSummary';
import VoucherEmailForm from './VoucherEmailForm';

export default function VoucherModal({ cart, subtotal, discount, cartTotal, onClose }) {
  // Obtenemos el usuario actual para pre-llenar el email
  const { currentUser } = useAuth();
  
  // Estado para el email donde enviar el comprobante
  const [email, setEmail] = useState(currentUser?.email || '');
  // Estado para controlar si ya se "envió" el email
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  // Generamos la fecha actual formateada en español de Chile
  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Función para simular el envío del comprobante por email
  const handleSimulateEmailSend = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    
    // Validamos que el email no esté vacío
    if (email.trim() === '') {
      toast.error("Por favor, ingresa un correo.");
      return; // Cortamos la ejecución si no hay email
    }
    
    // Simulamos el envío (en un proyecto real aquí iría la llamada a una API)
    console.log(`Simulando envio de boleta a: ${email}`);
    setIsEmailSent(true); // Cambiamos el estado para mostrar el mensaje de éxito
    toast.success("Comprobante enviado (Simulado)!");
  };

  // Función para cerrar el modal y volver al catálogo
  const handleCloseAndNavigate = () => {
    onClose(); // Cerramos el modal (llamando a la función del padre)
    navigate('/products'); // Navegamos al catálogo de productos
  };

  return (
    // Overlay oscuro que cubre toda la pantalla
    <div className={styles.voucherSimple}>
      {/* Contenedor principal del modal */}
      <div className={styles.voucherContent}>
        <h3><Receipt /> compra realizada</h3>
        
        {/* Detalles de la compra */}
        <div className={styles.voucherDetails}>
          <p><strong>fecha:</strong> <span>{fecha}</span></p>
          
          {/* Lista de productos comprados */}
          <VoucherItemsList cart={cart} />
          
          {/* Resumen de totales */}
          <VoucherTotalSummary subtotal={subtotal} discount={discount} cartTotal={cartTotal} />
        </div>

        {/* Formulario para "enviar" el comprobante por email */}
        <VoucherEmailForm
          isEmailSent={isEmailSent}
          email={email}
          setEmail={setEmail}
          onSubmit={handleSimulateEmailSend}
        />

        {/* Botones de acción del modal */}
        <div className={styles.voucherActions}>
          {/* Botón para volver al catálogo */}
          <button className="btn-volver" onClick={handleCloseAndNavigate}>
            <ArrowLeft /> volver al catalogo
          </button>
        </div>
      </div>
    </div>
  );
}