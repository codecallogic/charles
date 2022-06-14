const initialState = {
  email: ''
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SEARCH':
     return {
        ...state,
        [action.name]: action.value
      }
      break;

    case 'RESET_SEARCH':
      return initialState
      break;

    

    default:
     return state
    }
}