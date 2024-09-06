const TICKET_WIDTH = 40; // Ancho del ticket en caracteres

function formatLine(name, amount) {
    // Convertir los textos a espacios en blanco de ancho fijo
    const nameWidth = TICKET_WIDTH - amount.length - 2; // 2 espacios entre nombre y monto
    const paddedName = name.padEnd(nameWidth, ' ');
    const paddedAmount = amount.padStart(amount.length + 2, ' '); // Añadir espacio extra para separación

    return `${paddedName}${paddedAmount}`;
}

function format_metodo_pago(pago: string): string {
    if (pago == "efectivo") {
        return "Efectivo";
    }
    if (pago == "tarjeta_credito") {
        return "T. Credito";
    }
    if (pago == "tarjeta_debito") {
        return "T. Debito";
    }
    if (pago == "cheque") {
        return "Cheque";
    }
    if (pago == "transferencia") {
        return "Transferencia";
    }
    return pago;
}


const removeAccentsAndSpecialCharacters = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
        .replace(/[ñÑ]/g, "n")            // Reemplazar ñ y Ñ con n
        .replace(/[^a-zA-Z0-9 ]/g, "");   // Eliminar caracteres especiales, excepto letras, números y espacios
};

export default function estructura_ticket(data) {

    let estructura_ticket = []
    estructura_ticket.push([`CORTE CAJA`, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`Caja: ${data?.nombre_caja}`, `LT`])
    estructura_ticket.push([`Operador: ${removeAccentsAndSpecialCharacters( data?.nombre_cajero)}`, `LT`])
    estructura_ticket.push([`Fecha apertura: ${data?.apertura}`, `LT`])
    estructura_ticket.push([`Fecha Cierre: ${data?.cierre}`, `LT`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`DINERO EN CAJA`, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])

    estructura_ticket.push([["Fondo inicial", " ", `+ $ ${data?.fondo_inicial}`], `LT`, ``, "TABLE"])
    estructura_ticket.push([["Retirado", " ", `- $ ${data?.retirado}`], `LT`, ``, "TABLE"])
    estructura_ticket.push([["Efectivo", " ", `+ $ ${data?.total_ingreso_efectivo.toFixed(2)}`], `LT`, ``, "TABLE"])
    estructura_ticket.push([["------------"], `RT`, ``])
    estructura_ticket.push([["Esperado", " ", `$ ${data?.total_esperado.toFixed(2)}`], `LT`, ``, "TABLE"])
    estructura_ticket.push([["Real", " ", `$ ${data?.total_real}`], `LT`, ``, "TABLE"])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`PAGOS DEL DIA`, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([["FOLIO", "METODO PAGO", "ABONADO"], `LT`, `B`, "TABLE"])
    estructura_ticket.push([``, `CT`, `B`])
    data.pagos.map((pago) => {
        estructura_ticket.push([[pago.folio, `${format_metodo_pago(pago.forma_pago)}`, `$ ${parseFloat(pago.total_abonado).toFixed(2)}`], `LT`, ``, "TABLE"])
    })
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`TOTALES`, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([formatLine(`Efectivo`, `$ ${data?.total_efectivo.toFixed(2)}`), `LT`])
    estructura_ticket.push([formatLine(`Tarjeta Credito`, `$ ${data?.total_tarjeta_credito.toFixed(2)}`), `LT`])
    estructura_ticket.push([formatLine(`Tarjeta Debito`, `$ ${data?.total_tarjeta_debito.toFixed(2)}`), `LT`])
    estructura_ticket.push([formatLine(`Cheques`, `$ ${data?.total_cheques.toFixed(2)}`), `LT`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([``, `CT`, `B`])
    estructura_ticket.push([`____________________________`, `CT`, `B`])
    estructura_ticket.push([`FIRMA DEL CAJERO`, `CT`, `B`])
    return estructura_ticket;
}


