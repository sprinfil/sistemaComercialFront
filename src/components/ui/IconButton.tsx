import React, { Children } from 'react'

const IconButton = ({children}) => {
    return (
        <div className='flex items-center justify-center px-2 py-2 rounded-md hover:bg-accent cursor-pointer ease-in duration-100'>
            {children}
        </div>
    )
}

export default IconButton