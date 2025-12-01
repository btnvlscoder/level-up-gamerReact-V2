// s:\PROGRAM\DUOC\4th Semester\P2\level-up-gamerReact-V2\src\components\ProductsToolbar.jsx
import React from 'react';
import { Search } from 'react-bootstrap-icons';
import styles from '../pages/ProductsPage.module.css';

function ProductsToolbar({ categorias, categoria, setCategoria, terminoBusqueda, setTerminoBusqueda }) {
  return (
    <div className={styles.productosToolbar}>
      <select
        className={styles.filtroCategoria}
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>
            {cat === 'todos' ? 'Todas las categorías' : cat}
          </option>
        ))}
      </select>

      <input
        className={styles.buscador}
        type="search"
        placeholder="Buscar producto..."
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
      />
      <button className="btn btn-primary">
        <Search />
      </button>
    </div>
  );
}

export default React.memo(ProductsToolbar);
