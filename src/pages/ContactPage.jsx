import React, { useState } from 'react';
import { Envelope, Telephone } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

// importamos los estilos modulares (ContactPage.module.css)
import styles from './ContactPage.module.css';

/**
 * pagina de contacto.
 * renderiza un formulario de contacto controlado y la informacion de la tienda.
 */
export default function ContactPage() {
  // estados para los campos del formulario (formulario controlado)
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  /**
   * manejador para el envio (submit) del formulario.
   * @param {object} e - el evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // previene la recarga de la pagina
    
    // por ahora, solo simulamos el envio mostrando en consola
    console.log("Formulario enviado:", { nombre, correo, asunto, mensaje });

    // muestra notificacion de exito
    toast.success('Mensaje enviado con exito! Te contactaremos pronto.', { duration: 3000 });

    // limpia el formulario reseteando los estados
    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <>
      {/* '.titulo-principal' es una clase global de style.css */}
      <h2 className="titulo-principal">Contactanos</h2>

      {/* usamos la clase del modulo para el grid principal */}
      <div className={styles.contactoSimple}>
        
        {/* formulario (columna izquierda) */}
        <form className={styles.contactoFormSimple} onSubmit={handleSubmit}>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              required 
              value={nombre} // controlado por el estado
              onChange={(e) => setNombre(e.target.value)} // actualiza el estado
            />
          </div>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="correo">Correo electronico</label>
            <input 
              type="email" 
              id="correo" 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="asunto">Asunto</label>
            <input 
              type="text" 
              id="asunto" 
              required 
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />
          </div>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="mensaje">Mensaje</label>
            <textarea 
              id="mensaje" 
              rows="5" 
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
          
          <button type="submit" className={styles.btnEnviar}>Enviar mensaje</button>
        </form>
        
        {/* informacion (columna derecha) */}
        <div className={styles.contactoInfo}>
          <h3>Informacion de contacto</h3>
          <p><Envelope /> contacto@levelupgamer.cl</p>
          <p><Telephone /> +56 9 4129 5631</p>
        </div>
      </div>
    </>
  );
}