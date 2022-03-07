import {combineReducers} from 'redux'
import {signInReducer,signUpReducer} from './authReduecr'
import { gamelogReducer,userNameReducer } from './gamelogReducer'
export default combineReducers({
    user:signInReducer,
    userRegister:signUpReducer,
    gameLogs:gamelogReducer,
    currentUser:userNameReducer
})