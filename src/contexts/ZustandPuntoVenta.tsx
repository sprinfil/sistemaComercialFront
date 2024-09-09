import create from 'zustand';

export const ZustandPuntoVenta = create((set) => ({
    session_caja: {} ,
    set_session_caja: (session:any) => set({ session_caja: session }),

    session_caja_completo: {} ,
    set_session_caja_completo: (session:any) => set({ session_caja_completo: session }),
  }));

export default ZustandPuntoVenta;