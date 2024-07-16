const express = require('express');
const cors = require('cors');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Para manejar JSON en el cuerpo de las solicitudes

app.post('/print', async (req, res) => {
  const { text } = req.body;

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.100', // Reemplaza con la IP de tu impresora
  });

  try {
    printer.alignCenter();
    printer.println(text);
    printer.cut();
    await printer.execute();
    res.send('Printed successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


