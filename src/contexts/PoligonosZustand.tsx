import create from 'zustand';

const PoligonosZustand = create((set) => ({
    libro_visibility: [],
    set_libro_visibility: (newItems) => set({ libro_visibility: newItems }),

    ruta_visibility: [],
    set_ruta_visibility: (newItems) => set({ ruta_visibility: newItems }),
  }));

export default PoligonosZustand;