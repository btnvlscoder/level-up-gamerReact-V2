import React from 'react';
import ReactDOM from 'react-dom/client';

// Importamos React Router para la navegación entre páginas
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importamos Toaster para mostrar notificaciones
import { Toaster } from 'react-hot-toast';

// Importamos Bootstrap para los estilos base
import 'bootstrap/dist/css/bootstrap.min.css';
// Importamos nuestros estilos personalizados
import './style.css';

// Importamos los proveedores de estado global (carrito y autenticación)
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Importamos el layout principal y todas las páginas
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Configuramos las rutas de la aplicación
const router = createBrowserRouter([
  {
    // Ruta principal que usa MainLayout como plantilla
    path: '/',
    element: <MainLayout />,
    // Rutas hijas que se mostrarán dentro del MainLayout
    children: [
      { index: true, element: <HomePage /> }, // Página de inicio
      { path: 'products', element: <ProductsPage /> }, // Catálogo de productos
      { path: 'product/:code', element: <ProductDetailPage /> }, // Detalle de producto
      { path: 'contact', element: <ContactPage /> }, // Formulario de contacto
      { path: 'cart', element: <CartPage /> }, // Carrito de compras
      { path: 'login', element: <LoginPage /> }, // Inicio de sesión
      { path: 'register', element: <RegisterPage /> }, // Registro de usuario
      { path: 'profile', element: <ProfilePage /> }, // Perfil de usuario
    ],
  },
]);

// Creamos el punto de entrada de React en el div con id "root"
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos toda la aplicación
root.render(
  <React.StrictMode>
    {/* AuthProvider maneja el estado de autenticación (login, registro) */}
    <AuthProvider>
      {/* CartProvider maneja el estado del carrito de compras */}
      <CartProvider>
        {/* RouterProvider maneja la navegación entre páginas */}
        <RouterProvider router={router} />
        
        {/* Toaster muestra notificaciones en toda la app */}
        <Toaster
          position="top-right" // Posición de las notificaciones
          toastOptions={{
            // Estilo base para todas las notificaciones
            style: {
              background: 'var(--clr-main-light)',
              color: 'var(--clr-accent-green)',
              border: '1px solid var(--clr-accent-green)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            },
            // Estilo específico para notificaciones de éxito
            success: {
              iconTheme: {
                primary: 'var(--clr-accent-green)',
                secondary: 'var(--clr-main)',
              },
            },
            // Estilo específico para notificaciones de error
            error: {
              style: {
                background: '#ff33332a',
                color: 'var(--clr-accent-red)',
                border: '1px solid var(--clr-accent-red)',
              },
              iconTheme: {
                primary: 'var(--clr-accent-red)',
                secondary: 'var(--clr-main-light)',
              },
            }
          }}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);