import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    // Ruta principal usamos MainLayout 
    path: '/',
    element: <MainLayout />,
    // Rutas hijas
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

// Se conecta React con al #root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos 
root.render(
  <React.StrictMode>                              {/* estados */}
    <AuthProvider>                                {/* login, registro */}
      <CartProvider>                              {/* carrito de compras */}
        <RouterProvider router={router} />        {/* RouterProvider maneja la navegación entre páginas */}      
        {/* Toaster muestra notificaciones en toda la app */}
        <Toaster position="top-right" // Posición de las notificaciones
          toastOptions={{
            // todas las notf.
            style: {
              background: 'var(--clr-main-light)',
              color: 'var(--clr-accent-green)',
              border: '1px solid var(--clr-accent-green)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            },
            // notf. ok
            success: {
              iconTheme: {
                primary: 'var(--clr-accent-green)',
                secondary: 'var(--clr-main)',
              },
            },
            // notf. X
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