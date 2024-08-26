class ConectorPlugin {
    static URL_PLUGIN_POR_DEFECTO = "http://localhost:8001";

    constructor(ruta) {
        this.ruta = ruta || ConectorPlugin.URL_PLUGIN_POR_DEFECTO;
        this.operaciones = [];
    }

    agregarOperacion(nombre, ...argumentos) {
        this.operaciones.push({ nombre, argumentos });
        return this;
    }

    async enviarOperaciones() {
        const payload = {
            operaciones: this.operaciones,
        };

        const response = await fetch(`${this.ruta}/operaciones`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    async imprimir(texto, printerId) {
        const payload = {
            text: texto,
            printerId: printerId,
        };

        const response = await fetch(`${this.ruta}/print`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
}

// Exponer ConectorPlugin en el contexto global
window.ConectorPlugin = ConectorPlugin;
