import React from 'react'
import ReactDOM from 'react-dom/client'
import "./globals.css";
import { ContextProvider } from './contexts/ContextProvider.tsx';
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { Toaster } from "@/components/ui/toaster"
import "./css/background.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
