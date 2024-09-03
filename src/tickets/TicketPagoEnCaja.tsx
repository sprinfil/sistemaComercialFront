const TICKET_WIDTH = 40; // Ancho del ticket en caracteres

function formatLine(name, amount) {
    // Convertir los textos a espacios en blanco de ancho fijo
    const nameWidth = TICKET_WIDTH - amount.length - 2; // 2 espacios entre nombre y monto
    const paddedName = name.padEnd(nameWidth, ' ');
    const paddedAmount = amount.padStart(amount.length + 2, ' '); // Añadir espacio extra para separación

    return `${paddedName}${paddedAmount}`;
}

function format_metodo_pago(pago: string): string{
    if(pago == "efectivo"){
        return "Efectivo";
    }
    if(pago == "tarjeta_credito"){
        return "Tarjeta Credito";
    }
    if(pago == "tarjeta_debito"){
        return "Tarjeta Debito";
    }
    if(pago == "cheque"){
        return "Cheque";
    }
    if(pago == "transferencia"){
        return "Transferencia";
    }
    return pago;
}


const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function estructura_ticket(data) {

    let estructura_ticket = []
    estructura_ticket.push([`FELIX ORTEGA 2330, CENTRO, LA PAZ .C.S`, `CT`, `B`])
    estructura_ticket.push([`(612) 123 8600`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Caja: ${data?.nombre_caja}`, `LT`])
    estructura_ticket.push([`Consecutivo: ${data?.consecutivo}`, `LT`])
    estructura_ticket.push([`Cajero: ${data?.nombre_cajero}`, `LT`])
    estructura_ticket.push([`Recibo: ${data?.pago_folio}`, `LT`])
    estructura_ticket.push([`Fecha de Pago: ${data?.fecha_pago}`, `LT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    if (data?.copia == true) {
        estructura_ticket.push([` `, `CT`])
        estructura_ticket.push([`***COPIA***`, `CT`, `B`])
        estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    }
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Informacion de usuario`, `CT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Usuario: ${data?.usuario_nombre}`, `LT`])
    estructura_ticket.push([`Numero de Toma: ${data?.numero_cuenta}`, `LT`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Direccion`, `CT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Calle: ${data?.calle} ${data?.numero}`, `LT`])
    estructura_ticket.push([`Codigo Postal: ${data?.codigo_postal}`, `LT`])
    estructura_ticket.push([`COLONIA: ${data?.colonia}`, `LT`])
    estructura_ticket.push([`RFC: ${data?.rfc}`, `LT`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`Concepto(s)`, `CT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([["CONCEPTO", "ABONADO", "RESTANTE"], `LT`, `B`, "TABLE"])
    estructura_ticket.push([` `, `CT`])
    data.conceptos.map((concepto) => {
        estructura_ticket.push([[removeAccents(concepto.nombre), `$ ${concepto.monto_abonado}`, `$ ${concepto.monto_pendiente.toFixed(2)}`], `LT`, ``, "TABLE"])
        estructura_ticket.push([` `, `CT`])
    })
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`Detalle del pago`, `CT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([formatLine(`SALDO ANTERIOR`, `$ ${data?.saldo_anterior}`), `LT`])
    estructura_ticket.push([`${format_metodo_pago(data?.metodo_pago)}`, `LT`, `B`])
    if(data?.recibido != "0"){
        estructura_ticket.push([formatLine(`RECIBIDO`, `$ ${data?.recibido}`), `LT`])
    }
    estructura_ticket.push([formatLine(`PAGO NETO`, `$ ${data?.pago_neto}`), `LT`])
    estructura_ticket.push([formatLine(`CAMBIO`, `$ ${data?.cambio}`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([formatLine(`SALDO PENDIENTE`, `$ ${data?.saldo_pendiente}`), `LT`])
    estructura_ticket.push([formatLine(`SALDO A FAVOR`, `$ ${data?.saldo_a_favor}`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`pruebas.sapalapaz.gob.mx`, `CT`])
    return estructura_ticket;
}


