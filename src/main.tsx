import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx'; // Asegúrate de que esta ruta sea correcta
import { ContextProvider } from './contexts/ContextProvider';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
