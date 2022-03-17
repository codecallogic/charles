const initialState = {
  name: false,
  followers: false,
  tracks: false,
  popularity: false,
  ownerName: false,
  links: false,
  socials: false,
  email: false,
  url: false,
  description: false,
  spotifyURI: false,
}

export const csvReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CSV':
     return {
        ...state,
        [action.name]: action.value
      }
      break;

    case 'RESET_CSV':
      return initialState
      break;

    

    default:
     return state
    }
}