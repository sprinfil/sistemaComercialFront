import React from 'react'

const Error = ({ errors }) => {
    return (
        <div className='text-destructive'>
            {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
            ))}
        </div>
    )
}

export default Error