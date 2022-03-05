import {combineReducers} from 'redux'
import {signInReducer,signUpReducer} from './authReduecr'
export default combineReducers({
    user:signInReducer,
    userRegister:signUpReducer,
})