// Contenido de: src/pages/ProductDetailPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products'; 
import { Cart, ArrowLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; 

// 1. Importar los estilos del módulo
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { code } = useParams();
  const product = products.find(p => p.code === code);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCart(); 

  // Manejo de Producto No Encontrado
  if (!product) {
    return (
      // 2. Usar el objeto 'styles'
      <div className={styles.productoDetalleContainer}>
        <h2>Producto no encontrado</h2>
        {/* 3. El .btn-volver es global, lo dejamos como está */}
        <Link to="/products" className="btn-volver">
          <ArrowLeft /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const { name, signature, category, description, price, img } = product;

  // Lógica del Slider (sin cambios)
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === img.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`"${name}" agregado al carrito!`); 
  }

  return (
    // 2. Usar el objeto 'styles' para todas las clases
    <div className={styles.productoDetalleContainer}>
      <div className={styles.productoDetalle}>
        
        {/* Slider e Imágenes */}
        <div className={styles.productoSlider}>
          <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <div className={styles.sliderContainer}>
            <img 
              src={img[currentIndex]} 
              alt={`${name} - imagen ${currentIndex + 1}`} 
              className={styles.sliderImg} // 'active' ya no es necesario, el src cambia
            />
          </div>
          <button className={`${styles.sliderBtn} ${styles.next}`} onClick={nextSlide}>
            <ChevronRight />
          </button>

          {/* Miniaturas */}
          {img.length > 1 && (
            <div className={styles.miniaturasContainer}>
              {img.map((imagenSrc, index) => (
                <img
                  key={index}
                  src={imagenSrc}
                  alt={`miniatura ${index + 1}`}
                  className={`${styles.miniatura} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => jumpToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Información y Botones */}
        <div className={styles.productoInfo}>
          <h2 className={styles.productoTituloDetalle}>{name}</h2>
          <p className={styles.productoMarcaDetalle}>{signature}</p>
          <p className={styles.productoCodigo}>Código: {code}</p>
          <p className={styles.productoCategoria}>Categoría: {category}</p>
          <p className={styles.productoDescripcion}>{description}</p>
          <p className={styles.productoPrecio}>{PriceFormat(price)}</p>
          
          <div className={styles.accionesBotones}> 
            {/* 4. Aplicamos el nuevo estilo .productoAgregar */ }
            <button className={styles.productoAgregar} id="agregar-detalle" onClick={handleAddToCart}>
              <Cart /> Agregar al carrito
            </button>
            
            {/* 3. El .btn-volver es global, lo dejamos como está */}
            <Link to="/products" className="btn-volver">
              <ArrowLeft /> Volver al catálogo
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}