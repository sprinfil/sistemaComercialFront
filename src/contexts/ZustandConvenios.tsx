import create from 'zustand';

export const ZustandConvenios = create((set) => ({
    convenio_conceptos: [] as any[],
    set_convenio_conceptos: (conceptos_temp: any) => set({ convenio_conceptos: conceptos_temp }),
}));

export default ZustandConvenios;