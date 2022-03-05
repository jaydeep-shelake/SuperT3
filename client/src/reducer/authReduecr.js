import {AUTH_ERROR, LOGOUT, SIGNIN, SIGNIN_REQUEST,SIGNUP,SIGNUP_REQUEST,} from '../actions/type'

export const signInReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {loading:true}
        case SIGNIN:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
      
        case LOGOUT:
            return{};
        default:
            return state
    }
}
export const signUpReducer=(state={loading:false},action)=>{
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {loading:true}
        case SIGNUP:
        return{loading:false,user:action.payload}
        case AUTH_ERROR:
            return{loading:false,error:action.payload}
        case LOGOUT:
            return{};
        default:
            return state
    }
}