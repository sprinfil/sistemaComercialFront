import React from 'react';

const Impresora = () => {

  async function connectPrinter() {
    try {
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x04b8 }] });
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);
      
      const text = "Hello, Printer!";
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      await device.transferOut(1, data);
      console.log('Printed successfully');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Impresora</h2>
      <button onClick={connectPrinter}>Conectar e Imprimir</button>
    </div>
  );
}

export default Impresora;

  