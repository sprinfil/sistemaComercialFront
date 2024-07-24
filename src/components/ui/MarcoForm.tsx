import React from 'react'

const MarcoForm = ({children, title}) => {
    return (
        <div className="py-[40px] px-[10px] grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-5 rounded-md border border-border  relative">
            <span className="absolute -top-3 left-2 bg-background px-2 text-gray-500 text-xs">{title}</span>
            {children}
        </div>
    )
}

export default MarcoForm