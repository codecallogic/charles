import { combineReducers } from 'redux'
import { csvReducer } from './csvReducer'
import { searchReducer } from './searchReducer'

const rootReducer = combineReducers({
  csv: csvReducer,
  search: searchReducer
})

export default rootReducer