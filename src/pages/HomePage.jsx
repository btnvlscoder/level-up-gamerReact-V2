import React from 'react';
// importacion de iconos
import { 
  Crosshair, 
  Eye 
} from 'react-bootstrap-icons';

/**
 * pagina de inicio (home).
 * muestra el banner de bienvenida, "quienes somos", mision y vision.
 * nota: esta pagina usa clases globales definidas en style.css.
 */
export default function HomePage() { 
  return (
    <section id="nosotros" className="nosotros-section">
      {/* 'container' es una clase de bootstrap */}
      <div className="container">
        {/* 'titulo-principal' es una clase global de style.css */}
        <h2 className="titulo-principal">¡Bienvenido a level-up gamer!</h2>
        
        {/* seccion del banner principal de bienvenida */}
        <div className="mensaje-principal">
          <div className="caja-info2">
            <h3>🎮¡Desafia tus limites con level-up gamer!👾</h3>
            <p className="small-mensaje-principal-up">Conviertete en el heroe de tu propia historia y unete a nuestra comunidad de jugadores.</p>
            <img 
              className="logo-mensaje-principal" 
              src="/img/logo.jpg" 
              width="150px"
              alt="logo tienda level-up"
            /> 
            <p className="small-mensaje-principal-down">¡Explora, juega y gana con nosotros!</p>
          </div>
        </div>
        
        {/* seccion "quienes somos" */}
        <div className="enunciado-lvl-up-gamer">
          <h3>¿Quienes somos?</h3>
          <p>Level-up gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en chile. lanzada hace dos anos como respuesta a la creciente demanda durante la pandemia, leves-up gamer ofrece una amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas especializadas. aunque no cuenta con una ubicacion fisica, realiza despachos a todo el pais.</p>
        </div>
        
        {/* 'row' es una clase de bootstrap para el sistema de grid */}
        <div className="row">
          {/* 'col-lg-6' (bootstrap) crea una columna de 50% en pantallas grandes */}
          <div className="col-lg-6">
            <div className="caja-info">
              <h3><Crosshair /> Nuestra Mision</h3>
              <p className="small-text-mision">Proporcionar productos de alta calidad para gamers en todo chile, ofreciendo una experiencia de compra unica y personalizada, con un enfoque en la satisfaccion del cliente y el crecimiento de la comunidad gamer.</p>
            </div>
          </div>
          {/* 'col-lg-6' (bootstrap) crea la segunda columna de 50% */}
          <div className="col-lg-6">
            <div className="caja-info">
              <h3><Eye /> Nuestra Vision</h3>
              <p className="small-text-vision">Ser la tienda online lider en productos para gamers en chile, reconocida por su innovacion, servicio al cliente excepcional, y un programa de fidelizacion basado en gamificacion que recompense a nuestros clientes mas fieles.</p>
            </div>
          </div>
          
          {/* contenedor de la imagen de la tienda */}
          <div className="imagen-tienda-box">
            <img 
              className="tiendajpg" /* esta clase esta definida en style.css */
              src="/img/tienda.png" 
              alt="tienda level-up gamer"
            /> 
          </div>
        </div>
      </div>
    </section>
  );
}