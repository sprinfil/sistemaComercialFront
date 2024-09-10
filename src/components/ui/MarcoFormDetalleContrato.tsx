import React from 'react'

const MarcoFormDetalleContrato = ({ children, title }) => {
    return (
        <div className='relative'>
            <span className="absolute -top-3 left-2 bg-background px-2  text-xl z-10">{title}</span>
            <div className="py-[40px] px-[10px] grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-5 rounded-md border border-border relative overflow-auto">
                {children}
            </div>

        </div>
    )
}

export default MarcoFormDetalleContrato