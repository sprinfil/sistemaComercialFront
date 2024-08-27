import React from 'react'

const TicketPagoEnCaja = (
    nombre_caja:string,
    consecutivo:string,
    nombre_cajero:string,
    folio:string,
    fecha_pago:string,
    original:boolean,
    usuario:string,
    cuenta:string,
    calle:string, 
    codigo_postal:string, 
    colonia:string, 
    rfc:string, 
    conceptos:Array,
    
) => {
    let estructura_ticket = []
    estructura_ticket.push([`FELIX ORTEGA 2330, CENTRO, LA PAZ .C.S`, `CT`, `B`])
    estructura_ticket.push([`(612) 123 8600`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Caja: Caja 10`, `LT`])
    estructura_ticket.push([`Consecutivo: 101`, `LT`])
    estructura_ticket.push([`Cajero: MIGUEL ANGEL MURILLO JAIMES`, `LT`])
    estructura_ticket.push([`Recibo: 42353546023450`, `LT`])
    estructura_ticket.push([`Fecha de Pago: 15/08/2024 13:19`, `LT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`***COPIA***`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Usuario: PUBLICO EN GENERAL`, `LT`, `B`])
    estructura_ticket.push([`Cuenta: 00002026`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Direccion`, `CT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Calle: BAHIA DE LA PAZ #120`, `LT`])
    estructura_ticket.push([`Codigo Postal: 23080`, `LT`])
    estructura_ticket.push([`COLONIA: FOVISSTE`, `LT`])
    estructura_ticket.push([`RFC: XAXXX010101010010`, `LT`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`CONCEPTO(S)`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([formatLine(`CONSTANCIA DE NO SERVICIO`, `$329`), `LT`, `B`])
    estructura_ticket.push([formatLine(`IVA`, `$20`), `LT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`Detalle del pago`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([formatLine(`SALDO ANTERIOR`, `$329`), `LT`])
    estructura_ticket.push([`TARJETA`, `LT`, `B`])
    estructura_ticket.push([formatLine(`RECIBIDIO`, `$329`), `LT`])
    estructura_ticket.push([formatLine(`CAMBIO`, `$329`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([formatLine(`PAGO NETO`, `$329`), `LT`])
    estructura_ticket.push([formatLine(`SALDO PENDIENTE`, `$0`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`pruebas.sapalapaz.gob.mx`, `CT`])
}

export default TicketPagoEnCaja