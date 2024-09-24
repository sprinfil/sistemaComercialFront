import create from 'zustand';

export const ZustandMonitorPagos = create((set) => ({
    pagos: [],
    set_pagos: (pagos_temp: any) => set({ pagos: pagos_temp }),
}));

export default ZustandMonitorPagos;