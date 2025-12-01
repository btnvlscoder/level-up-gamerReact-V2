import React, { useState } from 'react';
import { Envelope, Telephone } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './ContactPage.module.css';
import FormField from '../components/FormField';

export default function ContactPage() {
  // Estados para guardar los datos del formulario de contacto
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // fn que se ejecuta cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos que el formulario recargue la página
    
    // Por ahora solo mostramos en consola (en un proyecto real se enviaría a un backend)
    console.log("Formulario enviado:", { nombre, correo, asunto, mensaje });

    // Mostramos notificación de éxito
    toast.success('Mensaje enviado con exito! Te contactaremos pronto.', { duration: 3000 });

    // Limpiamos el formulario después de enviar
    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <>
      {/* Título de la página */}
      <h2 className="titulo-principal">Contactanos</h2>

      {/* Contenedor principal con formulario e información */}
      <div className={styles.contactoSimple}>
        
        {/* Formulario de contacto */}
        <form className={styles.contactoFormSimple} onSubmit={handleSubmit}>
          <FormField
            id="nombre"
            label="Nombre Completo"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            containerClass={styles.txtFormulario}
          />

          <FormField
            id="correo"
            label="Correo electronico"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            containerClass={styles.txtFormulario}
          />

          <FormField
            id="asunto"
            label="Asunto"
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
            containerClass={styles.txtFormulario}
          />

          <FormField
            id="mensaje"
            label="Mensaje"
            type="textarea"
            rows={5}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            containerClass={styles.txtFormulario}
          />

          {/* Botón para enviar el formulario */}
          <button type="submit" className={styles.btnEnviar}>Enviar mensaje</button>
        </form>
        
        {/* Información de contacto de la tienda */}
        <div className={styles.contactoInfo}>
          <h3>Informacion de contacto</h3>
          <p><Envelope /> contacto@levelupgamer.cl</p>
          <p><Telephone /> +56 9 4129 5631</p>
        </div>
      </div>
    </>
  );
}
