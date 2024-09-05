import create from 'zustand';

export const ZustandPuntoVenta = create((set) => ({
    session_caja: {} ,
    set_session_caja: (session:any) => set({ session_caja: session }),
  }));

export default ZustandPuntoVenta;