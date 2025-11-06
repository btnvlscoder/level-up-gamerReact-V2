// Contenido de: src/pages/ContactPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';
import { Envelope, Telephone } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

// 1. Importar los estilos del módulo
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Formulario enviado:", { nombre, correo, asunto, mensaje });
    toast.success('Mensaje enviado con éxito! Te contactaremos pronto.', { duration: 3000 });

    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <>
      {/* 2. Título global */ }
      <h2 className="titulo-principal">Contáctanos</h2>

      {/* 3. Usar el objeto 'styles' */ }
      <div className={styles.contactoSimple}>
        
        <form className={styles.contactoFormSimple} onSubmit={handleSubmit}>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="nombre">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              required 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
            />
          </div>
          
          <div className={styles.txtFormulario}>
            <label htmlFor="correo">Correo electrónico</label>
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
        
        <div className={styles.contactoInfo}>
          <h3>Información de contacto</h3>
          <p><Envelope /> contacto@levelupgamer.cl</p>
          <p><Telephone /> +56 9 4129 5631</p>
        </div>
      </div>
    </>
  );
}