import React, { useState } from 'react';

// Importamos hooks de React Router para obtener parámetros de la URL y navegar
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { Cart, ArrowLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  // Obtenemos el código del producto desde la URL (ej: /product/JM001)
  const { code } = useParams();
  // Buscamos el producto que coincida con el código en la URL
  const product = products.find(p => p.code === code);

  // Estado para controlar qué imagen se muestra en el slider (empieza en la primera)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Obtenemos la fn para agregar productos al carrito
  const { addItem } = useCart();

  // Si no encontramos el producto, mostramos mensaje de error
  if (!product) {
    return (
      <div className={styles.productoDetalleContainer}>
        <h2>producto no encontrado</h2>
        {/* Enlace para volver al catálogo */}
        <Link to="/products" className="btn-volver">
          <ArrowLeft /> volver al catalogo
        </Link>
      </div>
    );
  }

  // Extraemos las propiedades del producto para usarlas más fácilmente
  const { name, signature, category, description, price, img } = product;

  // fn para ir a la imagen anterior en el slider
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    // Si estamos en la primera imagen, vamos a la última. Sino, retrocedemos una.
    const newIndex = isFirstSlide ? img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // fn para ir a la siguiente imagen en el slider
  const nextSlide = () => {
    const isLastSlide = currentIndex === img.length - 1;
    // Si estamos en la última imagen, vamos a la primera. Sino, avanzamos una.
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // fn para saltar directamente a una imagen específica
  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };

  // fn para agregar el producto al carrito
  const handleAddToCart = () => {
    addItem(product); // Agregamos el producto al carrito
    toast.success(`"${name}" agregado al carrito!`); // Mostramos notificación
  }

  return (
    <div className={styles.productoDetalleContainer}>
      <div className={styles.productoDetalle}>
        
        {/* Sección del slider de imágenes */}
        <div className={styles.productoSlider}>
          {/* Botón para imagen anterior */}
          <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prevSlide}>
            <ChevronLeft />
          </button>
          
          {/* Contenedor de la imagen principal */}
          <div className={styles.sliderContainer}>
            <img
              src={img[currentIndex]} // Mostramos la imagen según el índice actual
              alt={`${name} - imagen ${currentIndex + 1}`}
              className={styles.sliderImg}
            />
          </div>
          
          {/* Botón para imagen siguiente */}
          <button className={`${styles.sliderBtn} ${styles.next}`} onClick={nextSlide}>
            <ChevronRight />
          </button>

          {/* Miniaturas - solo se muestran si hay más de 1 imagen */}
          {img.length > 1 && (
            <div className={styles.miniaturasContainer}>
              {/* Mapeamos todas las imágenes para crear las miniaturas */}
              {img.map((imagenSrc, index) => (
                <img
                  key={index}
                  src={imagenSrc}
                  alt={`miniatura ${index + 1}`}
                  // La miniatura activa tiene una clase adicional para resaltarla
                  className={`${styles.miniatura} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => jumpToSlide(index)} // Al hacer clic, cambiamos a esa imagen
                />
              ))}
            </div>
          )}
        </div>

        {/* Sección de información del producto */}
        <div className={styles.productoInfo}>
          <h2 className={styles.productoTituloDetalle}>{name}</h2>
          <p className={styles.productoMarcaDetalle}>{signature}</p>
          <p className={styles.productoCodigo}>codigo: {code}</p>
          <p className={styles.productoCategoria}>categoria: {category}</p>
          <p className={styles.productoDescripcion}>{description}</p>
          <p className={styles.productoPrecio}>{PriceFormat(price)}</p>

          {/* Contenedor de botones de acción */}
          <div className={styles.accionesBotones}>
            {/* Botón para agregar al carrito */}
            <button className={styles.productoAgregar} id="agregar-detalle" onClick={handleAddToCart}>
              <Cart /> agregar al carrito
            </button>

            {/* Enlace para volver al catálogo */}
            <Link to="/products" className="btn-volver">
              <ArrowLeft /> volver al catalogo
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}