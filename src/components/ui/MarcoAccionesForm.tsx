import React from 'react'

const MarcoAccionesForm = ({children, title}) => {
    return (
        <div className="p-10 rounded-md border border-border  relative mt-10">
            <span className="absolute -top-3 left-2 bg-background px-2  text-xs">{title}</span>
            {children}
        </div>
    )
}

export default MarcoAccionesForm