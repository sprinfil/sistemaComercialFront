import React from 'react'

const MarcoFormFiltrosOT = ({ children, title }) => {
    return (
        <div className='relative'>
            <span className="absolute -top-3 left-2 bg-background px-2  text-xs z-10">{title}</span>
            <div className="py-[10px] px-[20px] grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-5 rounded-md border border-border relative overflow-auto">
                {children}
            </div>

        </div>
    )
}

export default MarcoFormFiltrosOT