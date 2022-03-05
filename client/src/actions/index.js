import api from "../apis/api";
import {SIGNIN,SIGNIN_REQUEST,SIGNUP,SIGNUP_REQUEST,AUTH_ERROR,LOGOUT} from './type'
export const siginUser = (email,password)=>async(dispatch,getState)=>{
    dispatch({type:SIGNIN_REQUEST})
   try {
       const {data}=await api.post('/api/users/signin',{email,password})
       console.log(data)
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   }
}

export const signupUser =(name,email,password)=>async dispatch =>{
    dispatch({type:SIGNUP_REQUEST})
   try {
       const {data}=await api.post('/api/users/signup',{name,email,password})
       dispatch({type:SIGNUP,payload:data})
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   } 
}

export const logout=()=>async dispatch=>{
    localStorage.removeItem('User')
    dispatch({type:LOGOUT})
}