import { combineReducers } from 'redux'
import { csvReducer } from './csvReducer'

const rootReducer = combineReducers({
  csv: csvReducer,
})

export default rootReducer