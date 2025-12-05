import React from 'react';

// Importamos hooks de React Router para obtener parámetros de la URL y navegar
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { Cart, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';
import { useCart } from '../context/CartContext';
import { notifyAddToCart } from '../utils/notifications.js';

// Importamos los estilos específicos de esta página
import styles from './ProductDetailPage.module.css';
import useImageSlider from '../hooks/useImageSlider';
import BackToCatalogLink from '../components/BackToCatalogLink';

export default function ProductDetailPage() {
  // Obtenemos el código del producto desde la URL (ej: /product/JM001)
  const { code } = useParams();
  // Buscamos el producto que coincida con el código en la URL
  const product = products.find(p => p.code === code);

  // Obtenemos la fn para agregar productos al carrito
  const { addItem } = useCart();

  // Si no encontramos el producto
  if (!product) {
    return (
      <div className={styles.productoDetalleContainer}>
        <h2>producto no encontrado</h2>
        {/* Enlace para volver al catálogo */}
        <BackToCatalogLink />
      </div>
    );
  }

  // Extraemos las propiedades del producto para usarlas más fácilmente
  const { name, signature, category, description, price, img } = product;

  const { currentIndex, currentImage, prevSlide, nextSlide, jumpToSlide } = useImageSlider(img);

  // fn para agregar el producto al carrito
  const handleAddToCart = () => {
    addItem(product);
    notifyAddToCart(name);
  }

  return (
    <div className={styles.productoDetalleContainer}>
      <div className={styles.productoDetalle}>
        
        {/* Slider de imgs */}
        <div className={styles.productoSlider}>
          {/* btn para imagen anterior */}
          <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prevSlide}>
            <ChevronLeft />
          </button>
          
          {/* Contenedor de la img main */}
          <div className={styles.sliderContainer}>
            <img
              src={currentImage}
              alt={`${name} - imagen ${currentIndex + 1}`}
              className={styles.sliderImg}
            />
          </div>
          
          {/* Botón para imagen next */}
          <button className={`${styles.sliderBtn} ${styles.next}`} onClick={nextSlide}>
            <ChevronRight />
          </button>

          {/* Miniaturas - solo se muestran si hay + de 1 img */}
          {img.length > 1 && (
            <div className={styles.miniaturasContainer}>
              {/* Mapeamos todas las imgs para crear las miniaturas */}
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

        {/* info producto */}
        <div className={styles.productoInfo}>
          <h2 className={styles.productoTituloDetalle}>{name}</h2>
          <p className={styles.productoMarcaDetalle}>{signature}</p>
          <p className={styles.productoCodigo}>codigo: {code}</p>
          <p className={styles.productoCategoria}>categoria: {category}</p>
          <p className={styles.productoDescripcion}>{description}</p>
          <p className={styles.productoPrecio}>{PriceFormat(price)}</p>

          {/* container de btns action */}
          <div className={styles.accionesBotones}>
            <button className={styles.productoAgregar} id="agregar-detalle" onClick={handleAddToCart}>
              <Cart /> agregar al carrito
            </button>
            <BackToCatalogLink />
          </div>
        </div>
        
      </div>
    </div>
  );
}
