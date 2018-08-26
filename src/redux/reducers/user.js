const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {
  console.log(action.type, action.payload)
  if (action.type === 'USER_LOGGED_IN') {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default userReducer
