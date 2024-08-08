import React, { useEffect, useState } from 'react';

interface Printer {
    name: string;
}

const ConfigurarCaja: React.FC = () => {
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [selectedPrinter, setSelectedPrinter] = useState<string>('');

    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const response = await fetch('http://localhost:8001/printers');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const printerList: Printer[] = await response.json();
                setPrinters(printerList);
            } catch (error) {
                console.error('Error fetching printers:', error);
            }
        };

        fetchPrinters();
    }, []);

    const handlePrint = async () => {
        try {
            if (selectedPrinter) {
                // Verifica que ConectorPlugin esté disponible
                if (!window.ConectorPlugin) {
                    console.error('ConectorPlugin is not available on window');
                    return;
                }
    
                // Crea una instancia de ConectorPlugin
                const conector = new (window as any).ConectorPlugin("http://localhost:8001");
                console.log('ConectorPlugin instance created:', conector);
    
                // Llama al método imprimir
                const response = await conector.imprimir('Hello, world!', selectedPrinter);
                console.log('Printed successfully!', response);
            } else {
                console.error('No printer selected');
            }
        } catch (error) {
            console.error('Error printing text:', error);
        }
    };
    
    
    

    return (
        <div>
            <h1>Configuración de Caja</h1>
            <select onChange={(e) => setSelectedPrinter(e.target.value)} value={selectedPrinter}>
                <option value="">Seleccione una impresora</option>
                {printers.map((printer) => (
                    <option key={printer.name} value={printer.name}>
                        {printer.name}
                    </option>
                ))}
            </select>
            <button onClick={handlePrint}>Print</button>
        </div>
    );
};

export default ConfigurarCaja;
