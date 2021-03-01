import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'error') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='confirm' >
        { message}
      </div >
    )
  }
}


export default Notification

