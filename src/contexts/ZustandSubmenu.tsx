import create from 'zustand';

export const subMenuZustand = create((set) => ({
    titulo: "",
    set_titulo: (titulo) => set({ titulo }),

    icono: () => <div>Componente personalizado</div>,
    set_icono: (Component) => set({ icono: Component })
  }));

export default subMenuZustand;