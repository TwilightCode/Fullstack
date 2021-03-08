const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  var newstate = {
    good: state.good,
    ok: state.ok,
    bad: state.bad
  }
  switch (action.type) {
    case 'GOOD':
     newstate.good += 1 
      return newstate
    case 'OK':
      newstate.ok+= 1
      return newstate
    case 'BAD':
      newstate.bad+= 1
      return newstate
    case 'ZERO':
      return initialState
    default: return newstate
  }

}

export default counterReducer