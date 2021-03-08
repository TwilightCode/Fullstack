
export const setmessage = (message) => {
  console.log('this is message')
  return {
    type: 'SET_MESSAGE',
    data: message
  }
}

export const notificationReducer = (states = '', action) => {
  console.log('Reducer active!!!!!!')
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
  }
  return states
}

export default notificationReducer