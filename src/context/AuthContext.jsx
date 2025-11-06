import React, { createContext, useContext, useState, useEffect } from 'react';

// --- STORAGE Y PERSISTENCIA ---
const USERS_DB_KEY = 'users-levelup-db';
const CURRENT_USER_KEY = 'currentUser-levelup';

const getUsersDatabase = () => {
  try {
    const users = localStorage.getItem(USERS_DB_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
};

const setUsersDatabase = (users) => {
  // ¡CORRECCIÓN CLAVE! USERS_DB_KEY en lugar de USERS_DB_DB_KEY
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users)); 
};

// --- CONTEXTO PRINCIPAL ---
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor
export function AuthProvider({ children }) {
  const [users, setUsers] = useState(getUsersDatabase());
  
  // Persistir la sesión en sessionStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = sessionStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  });

  // Guardar la DB de usuarios
  useEffect(() => {
    setUsersDatabase(users);
  }, [users]);

  // Guardar la sesión actual
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // --- LÓGICA DE REGISTRO ---

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // 1. Validar Contraseñas
      if (userData.password !== userData.confirmPassword) {
        return reject(new Error("Las contraseñas no coinciden."));
      }
      if (userData.password.length < 6) {
        return reject(new Error("La contraseña debe tener al menos 6 caracteres."));
      }

      // 2. Validar Email Único
      const emailExists = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        return reject(new Error("Este correo electrónico ya está registrado."));
      }

      // 3. Validar RUT Único
      const rutExists = users.find(user => user.rut.trim() === userData.rut.trim());
      if (rutExists) {
        return reject(new Error("Este RUT ya está registrado."));
      }

      // 4. Lógica de Descuento Duoc
      const tieneDescuentoDuoc = userData.email.toLowerCase().endsWith('@duocuc.cl');

      // 5. Crear el nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        rut: userData.rut,
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        email: userData.email,
        password: userData.password,
        tieneDescuentoDuoc: tieneDescuentoDuoc,
      };

      // 6. Guardar y establecer como usuario actual
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      resolve(newUser);
    });
  };

  // --- LÓGICA DE LOGIN ---

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

      if (user && user.password === password) {
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error("Correo o contraseña incorrectos."));
      }
    });
  };

  // --- LÓGICA DE LOGOUT ---

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}