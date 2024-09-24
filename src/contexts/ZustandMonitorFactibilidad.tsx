import create from 'zustand';

export const ZustandMonitorFactibilidad = create((set) => ({
    factibilidades: [],
    set_factibilidades: (factibilidades_temp: any) => set({ factibilidades: factibilidades_temp }),
}));

export default ZustandMonitorFactibilidad;