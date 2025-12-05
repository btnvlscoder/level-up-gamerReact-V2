import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { Cart, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';
import { useCart } from '../context/CartContext';
import { notifyAddToCart } from '../utils/notifications.js';
import styles from './ProductDetailPage.module.css';
import useImageSlider from '../hooks/useImageSlider';
import BackToCatalogLink from '../components/BackToCatalogLink';


export default function ProductDetailPage() {
  // obtenemos el code del prod en la url
  const { code } = useParams();
  // Buscamos el producto en la data que ya esta en memoria
  const product = products.find(p => p.code === code);

  const { addItem } = useCart();

  // Si no encontramos el producto
  if (!product) {
    return (
      <div className={styles.productoDetalleContainer}>
        <h2>producto no encontrado</h2>
        <BackToCatalogLink />
      </div>
    );
  }

  // props  
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
          
          {/* btn para imagen next */}
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
