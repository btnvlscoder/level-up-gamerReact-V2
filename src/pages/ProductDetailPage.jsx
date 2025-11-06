import React, { useState } from 'react';
// 'useparams' hook para leer parametros de la url (ej. el :code)
// 'link' para navegacion declarativa
import { useParams, Link } from 'react-router-dom';
// importa la "base de datos" local de productos
import products from '../data/products'; 
// iconos
import { Cart, ArrowLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
// funcion de utilidad para formatear el precio (formatter.js)
import { PriceFormat } from '../utils/formatter.js';
// hook para acceder al contexto del carrito (CartContext.jsx)
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; 

// importa los estilos modulares (ProductDetailPage.module.css)
import styles from './ProductDetailPage.module.css';

/**
 * pagina de detalle de un producto especifico.
 * muestra una galeria de imagenes, descripcion, precio y boton de compra.
 */
export default function ProductDetailPage() {
  // 'code' viene del parametro :code en la url (definido en main.jsx)
  const { code } = useParams();
  // buscamos el producto en nuestro array 'products' que coincida con el codigo de la url
  const product = products.find(p => p.code === code);
  
  // 'currentindex' es el estado que controla cual imagen se esta mostrando en el slider
  const [currentIndex, setCurrentIndex] = useState(0);
  // extraemos la funcion 'additem' del contexto del carrito
  const { addItem } = useCart(); 

  // 'if' de guarda: si el producto no se encuentra (ej. url invalida),
  // renderizamos un mensaje de error y un boton para volver.
  if (!product) {
    return (
      <div className={styles.productoDetalleContainer}>
        <h2>producto no encontrado</h2>
        {/* '.btn-volver' es una clase global de style.css */}
        <Link to="/products" className="btn-volver">
          <ArrowLeft /> volver al catalogo
        </Link>
      </div>
    );
  }

  // desestructuramos las propiedades del producto para usarlas facilmente
  const { name, signature, category, description, price, img } = product;

  /*
     logica del slider
  */
  
  /** funcion para ir a la imagen anterior */
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    // si es la primera imagen, vamos a la ultima (img.length - 1). si no, retrocedemos 1.
    const newIndex = isFirstSlide ? img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  /** funcion para ir a la imagen siguiente */
  const nextSlide = () => {
    const isLastSlide = currentIndex === img.length - 1;
    // si es la ultima imagen, vamos a la primera (0). si no, avanzamos 1.
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  /** funcion para saltar a una imagen especifica (usada por las miniaturas) */
  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  /** manejador para el boton "agregar al carrito" */
  const handleAddToCart = () => {
    addItem(product); // llama a la funcion del contexto
    toast.success(`"${name}" agregado al carrito!`); 
  }

  return (
    <div className={styles.productoDetalleContainer}>
      <div className={styles.productoDetalle}>
        
        {/* slider e imagenes */}
        <div className={styles.productoSlider}>
          {/* boton de slider (anterior) */}
          <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prevSlide}>
            <ChevronLeft />
          </button>
          
          {/* contenedor de la imagen principal */}
          <div className={styles.sliderContainer}>
            <img 
              src={img[currentIndex]} // la imagen se actualiza segun el estado 'currentindex'
              alt={`${name} - imagen ${currentIndex + 1}`} 
              className={styles.sliderImg} 
            />
          </div>
          
          {/* boton de slider (siguiente) */}
          <button className={`${styles.sliderBtn} ${styles.next}`} onClick={nextSlide}>
            <ChevronRight />
          </button>

          {/* miniaturas (solo se renderizan si hay mas de 1 imagen) */}
          {img.length > 1 && (
            <div className={styles.miniaturasContainer}>
              {/* mapeamos el array de imagenes del producto */}
              {img.map((imagenSrc, index) => (
                <img
                  key={index}
                  src={imagenSrc}
                  alt={`miniatura ${index + 1}`}
                  // aplicamos la clase 'active' si el 'index' coincide con el 'currentindex'
                  className={`${styles.miniatura} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => jumpToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* informacion y botones */}
        <div className={styles.productoInfo}>
          <h2 className={styles.productoTituloDetalle}>{name}</h2>
          <p className={styles.productoMarcaDetalle}>{signature}</p>
          <p className={styles.productoCodigo}>codigo: {code}</p>
          <p className={styles.productoCategoria}>categoria: {category}</p>
          <p className={styles.productoDescripcion}>{description}</p>
          <p className={styles.productoPrecio}>{PriceFormat(price)}</p>
          
          <div className={styles.accionesBotones}> 
            {/* boton local "agregar" */}
            <button className={styles.productoAgregar} id="agregar-detalle" onClick={handleAddToCart}>
              <Cart /> agregar al carrito
            </button>
            
            {/* boton global "volver" */}
            <Link to="/products" className="btn-volver">
              <ArrowLeft /> volver al catalogo
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}