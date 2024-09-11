import React from 'react'

const MarcoFormModalContratoMonitor = ({ children, title }) => {
    return (
        <div className="relative p-6 bg-white dark:bg-black shadow-xl transition-colors duration-300">
        <span className="absolute -top-4 left-4 bg-gray-200 dark:bg-gray-800 px-4 py-1 text-sm rounded-md shadow-md z-10 text-gray-700 dark:text-gray-300">
            {title}
        </span>
        <div className="py-6 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full rounded-lg border border-gray-300 dark:border-gray-700 overflow-auto">
            {children}
        </div>
    </div>
    )
}

export default MarcoFormModalContratoMonitor