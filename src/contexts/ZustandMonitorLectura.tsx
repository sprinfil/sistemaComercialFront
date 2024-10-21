import create from 'zustand';

export const ZustandMonitorLectura = create((set) => ({
    lecturas: [],
    set_lecturas: (lecturas_temp: any) => set({ lecturas: lecturas_temp }),
}));

export default ZustandMonitorLectura;