// Contenido de: src/main.jsx (Esta es la solución)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// =============================================
// ESTAS LÍNEAS SON LA SOLUCIÓN
// =============================================
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // <-- ESTA ES LA LÍNEA QUE ARREGLA TODO

// Proveedores de Contexto
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 

// Layout y Páginas
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Definición de Rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'product/:code', element: <ProductDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'profile', element: <ProfilePage /> }, 
    ],
  },
]);

// Montaje de la Aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Jerarquía de Proveedores: AuthProvider envuelve a CartProvider */}
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        
        {/* Componente Toaster para Notificaciones Globales */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--clr-main-light)',
              color: 'var(--clr-accent-green)',
              border: '1px solid var(--clr-accent-green)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            },
            success: {
              iconTheme: {
                primary: 'var(--clr-accent-green)',
                secondary: 'var(--clr-main)',
              },
            },
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