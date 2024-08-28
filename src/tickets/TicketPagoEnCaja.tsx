    function formatLine(concept, amount, totalWidth = 40) {
        const conceptLength = concept.length;
        const amountLength = amount.length;
        const spacesNeeded = totalWidth - (conceptLength + amountLength);
        const paddedConcept = concept + ' '.repeat(spacesNeeded > 0 ? spacesNeeded : 0);
        return paddedConcept + amount;
    }

    export default function estructura_ticket(data){
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
        estructura_ticket.push([`Usuario: ${data?.usuario_nombre}`, `LT`, `B`])
        estructura_ticket.push([`Numero de Toma: ${data?.numero_cuenta}`, `LT`, `B`])
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
        estructura_ticket.push([`_________________________________________`, `LT`, `B`])
        estructura_ticket.push([` `, `CT`])
        // data.conceptos.map((concepto) => {
        //     estructura_ticket.push([formatLine(`${concepto.nombre}`, `${concepto.monto}`), `LT`, `B`])
        //  })
        estructura_ticket.push([`_________________________________________`, `LT`, `B`])
        estructura_ticket.push([` `, `LT`])
        estructura_ticket.push([`Detalle del pago`, `CT`, `B`])
        estructura_ticket.push([`_________________________________________`, `LT`, `B`])
        estructura_ticket.push([formatLine(`SALDO ANTERIOR`, `$ ${data?.saldo_anterior}`), `LT`])
        estructura_ticket.push([`${data?.metodo_pago}`, `LT`, `B`])
        estructura_ticket.push([formatLine(`PAGO NETO`, `$ ${data?.pago_neto}`), `LT`])
        estructura_ticket.push([formatLine(`RECIBIDO`, `$ ${data?.recibido}`), `LT`])
        estructura_ticket.push([formatLine(`CAMBIO`, `$ ${data?.cambio}`), `LT`])
        estructura_ticket.push([` `, `LT`])
        estructura_ticket.push([formatLine(`SALDO PENDIENTE`, `$ ${data?.saldo_pendiente}`), `LT`])
        estructura_ticket.push([` `, `LT`])
        estructura_ticket.push([` `, `LT`])
        estructura_ticket.push([`pruebas.sapalapaz.gob.mx`, `CT`])
        return estructura_ticket;
    }
  

