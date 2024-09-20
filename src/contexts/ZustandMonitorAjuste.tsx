import create from 'zustand';

export const ZustandMonitorAjuste = create((set) => ({
    ajustes: [],
    set_ajustes: (ajustes_temp: any) => set({ ajustes: ajustes_temp }),
}));

export default ZustandMonitorAjuste;