import create from 'zustand';

const PoligonosZustand = create((set) => ({
    libro_visibility: [],
    set_libro_visibility: (newItems) => set({ libro_visibility: newItems }),

    ruta_visibility: [],
    set_ruta_visibility: (newItems) => set({ ruta_visibility: newItems }),

    loading_import: false,  // Nueva variable booleana
    set_loading_import: (isLoading) => set({ loading_import: isLoading }),

    loading_rutas: false,  // Nueva variable booleana
    set_loading_rutas: (isLoading) => set({ loading_rutas: isLoading }),
  }));

export default PoligonosZustand;