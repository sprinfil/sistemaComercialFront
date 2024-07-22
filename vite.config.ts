import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mkcert from 'vite-plugin-mkcert'
 
export default defineConfig({
  plugins: [react(),
    //mkcert() // Añadir el plugin mkcert
  ],

  server: {
    //https: true // Activar https
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },


})