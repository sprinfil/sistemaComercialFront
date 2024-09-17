import React from 'react'

const MarcoFormServiciosAContratar = ({ children, title }) => {
    return (
        <div className="py-[20px] px-[20px] grid grid-cols-1 xl:grid-cols-3 gap-8 w-full max-w-[1000px] mb-5 rounded-md border border-border relative mt-5">
            <span className="absolute -top-3 left-2 bg-background px-2 text-lg">{title}</span>
            {children}
        </div>
    )
}

export default MarcoFormServiciosAContratar;
