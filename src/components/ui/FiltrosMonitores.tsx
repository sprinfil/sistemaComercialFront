import React from 'react'

export const FiltrosMonitores = ({children}) => {
  return (
    <div className="flex space-x-10 border border-border shadow-md rounded-lg p-6 w-full h-[15vh] justify-center mb-[3vh]">
        <div className=''>

        {React.Children.map(children, (child) => (
          <div>{child}</div> 
        ))}

        </div>
    </div>
  )
}
