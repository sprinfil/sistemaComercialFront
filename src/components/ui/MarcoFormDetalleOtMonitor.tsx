import React from 'react'

const MarcoFormDetalleOtMonitor = ({ children, title }) => {
    return (
        <div className="relative bg-white rounded-lg border border-gray-300 shadow-md p-6 mb-6">
        {/* Título */}
        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700 z-10">
            {title}
        </div>
        {/* Contenedor del contenido */}
        <div className="space-y-4">
            {children}
        </div>
    </div>
    )
}

export default MarcoFormDetalleOtMonitor