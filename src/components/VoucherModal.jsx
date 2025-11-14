import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PriceFormat } from '../utils/formatter';
import { Receipt, Send, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './VoucherModal.module.css';

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
          <div className={styles.voucherItemsList}>
            {cart.map(item => (
              <div className={styles.voucherItem} key={item.code}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{PriceFormat(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          {/* Resumen de totales */}
          <div className={styles.voucherTotalSummary}>
            <p className={styles.voucherLine}>
              <strong>subtotal:</strong> <span>{PriceFormat(subtotal)}</span>
            </p>
            {/* Mostramos descuento solo si es mayor a 0 */}
            {discount > 0 && (
              <p className={`${styles.voucherLine} ${styles.descuento}`}>
                <strong>descuento duoc (10%):</strong> <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className={styles.voucherTotal}>
              <strong>total:</strong> <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>
        </div>

        {/* Formulario para "enviar" el comprobante por email */}
        <form className={styles.voucherEmailForm} onSubmit={handleSimulateEmailSend}>
          
          {/* Mostramos el formulario o el mensaje de éxito según el estado */}
          {!isEmailSent ? (
            <>
              <p>ingresa tu correo para enviar una copia:</p>
              <input
                type="email"
                placeholder="tu.correo@ejemplo.com"
                value={email} // Controlado por el estado
                onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado
                required
              />
              {/* Botón para enviar el comprobante */}
              <button
                type="submit"
                className="btn-imprimir"
              >
                <Send /> enviar copia
              </button>
            </>
          ) : (
            // Mensaje de éxito después del "envío"
            <div className={styles.emailSuccessMessage}>
              <CheckCircleFill />
              <p>¡se ha enviado el comprobante al correo <strong>{email}</strong>!</p>
            </div>
          )}
        </form>

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