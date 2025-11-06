import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// funcion de utilidad para formatear precios (formatter.js)
import { PriceFormat } from '../utils/formatter';
import { Receipt, Send, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
// hook para acceder al contexto de autenticacion (AuthContext.jsx)
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

// importamos los estilos modulares (VoucherModal.module.css)
import styles from './VoucherModal.module.css';

/**
 * componente 'vouchermodal'.
 * es el modal (pop-up) que aparece despues de finalizar una compra.
 * muestra el resumen y simula el envio de un correo.
 * @param {object} props
 * @param {array} props.cart - el array de productos (el snapshot) de la compra.
 * @param {number} props.subtotal - el subtotal de la compra.
 * @param {number} props.discount - el descuento aplicado.
 * @param {number} props.cartTotal - el total final.
 * @param {function} props.onClose - la funcion para cerrar el modal (viene de CartPage.jsx).
 */
export default function VoucherModal({ cart, subtotal, discount, cartTotal, onClose }) {
  // obtenemos el 'currentuser' para pre-rellenar el campo de email
  const { currentUser } = useAuth();
  
  // 'email' es el estado para el input de correo (controlado)
  // se inicializa con el email del usuario si existe, o vacio.
  const [email, setEmail] = useState(currentUser?.email || ''); 
  // 'isemailsent' controla si mostramos el formulario de email o el mensaje de exito
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  // genera la fecha actual formateada para mostrar en el voucher
  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  /**
   * manejador para el formulario de envio de correo (simulado).
   * @param {object} e - el evento del formulario
   */
  const handleSimulateEmailSend = (e) => {
    e.preventDefault(); // previene recarga de pagina
    
    // validacion simple
    if (email.trim() === '') {
      toast.error("Por favor, ingresa un correo.");
      return; // corta la ejecucion
    }
    
    // simulacion de envio
    console.log(`Simulando envio de boleta a: ${email}`);
    setIsEmailSent(true); // cambia la vista al mensaje de exito
    toast.success("Comprobante enviado (Simulado)!");
  };

  /**
   * manejador para el boton "volver al catalogo".
   */
  const handleCloseAndNavigate = () => {
    onClose(); // cierra el modal (llamando a la funcion del padre, CartPage.jsx)
    navigate('/products'); // redirige al catalogo
  };

  return (
    // '.vouchersimple' es el overlay oscuro que cubre toda la pantalla
    <div className={styles.voucherSimple}>
      {/* '.vouchercontent' es la caja blanca del modal */}
      <div className={styles.voucherContent}>
        <h3><Receipt /> compra realizada</h3>
        <div className={styles.voucherDetails}>
          <p><strong>fecha:</strong> <span>{fecha}</span></p>
          
          {/* lista de items comprados */}
          <div className={styles.voucherItemsList}>
            {cart.map(item => (
              <div className={styles.voucherItem} key={item.code}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{PriceFormat(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          {/* resumen de totales */}
          <div className={styles.voucherTotalSummary}>
            <p className={styles.voucherLine}>
              <strong>subtotal:</strong> <span>{PriceFormat(subtotal)}</span>
            </p>
            {/* renderizado condicional del descuento */}
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

        {/* formulario de envio de correo */}
        <form className={styles.voucherEmailForm} onSubmit={handleSimulateEmailSend}>

          {/* renderizado condicional: muestra el input o el mensaje de exito */}
          {!isEmailSent ? (
            <>
              <p>ingresa tu correo para enviar una copia:</p>
              <input 
                type="email" 
                placeholder="tu.correo@ejemplo.com"
                value={email} // controlado
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* '.btn-imprimir' es una clase global de style.css */}
              <button 
                type="submit" 
                className="btn-imprimir"
              >
                <Send /> enviar copia
              </button>
            </>

          ) : (
            // vista de exito
            <div className={styles.emailSuccessMessage}>
              <CheckCircleFill />
              <p>¡se ha enviado el comprobante al correo <strong>{email}</strong>!</p>
            </div>
          )}
        </form>

      {/* botones de accion del modal */}
        <div className={styles.voucherActions}>
          {/* '.btn-volver' es una clase global de style.css */}
          <button className="btn-volver" onClick={handleCloseAndNavigate}>
            <ArrowLeft /> volver al catalogo
          </button>
        </div>
      </div>
    </div>
  );
}