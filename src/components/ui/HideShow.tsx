import React from 'react'

const HideShow = ({ children }) => {
    return (
        <>
            <div className='flex w-[35%] '>
                <div className='w-full'>
                    {children}
                </div>
                <div className='h-full w-[20px] bg-red-500'>

                </div>
            </div>
        </>

    )
}

export default HideShow