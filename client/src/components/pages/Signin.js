import React,{useState,useEffect} from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { Link,useHistory} from 'react-router-dom';
import logo from '../../assets/spidermanlogo.png'
import '../../styles/auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { siginUser } from '../../actions';
import Spinner from '../Spinner';
const Signin = () => {
    const [isLoading,setLoading]=useState(false)
    const dispatch =useDispatch()
    const history =useHistory()
    const user = useSelector(state=>state.user)
    const userInfo  = user?.user
    let schema = yup.object().shape({
        email:yup.string().required("Please Enter your Email").email(),
        password:yup.string().required("Please Enter your password")
        .test(
            "regex",
            "Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
          val => {
            let regExp = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
            )
            return regExp.test(val);
       })   

    })
  

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })
// console.log(errors)
 
    const submitHandler=(data)=>{
        dispatch(siginUser(data.email,data.password))
        console.log(data.email,data.password)
        setLoading(true)
    }

    useEffect(()=>{
        if(userInfo){
            history.push('/')
        }
    },[userInfo])
  return (
    <div className='auth'>
    <div className="form">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        {user?.error&&(<div className="err">
         {user?.error}
        </div>)}
        <form onSubmit={handleSubmit(submitHandler)}>
            <input type="email" name='email' placeholder='Email' {...register('email', { required: true })} />
            {errors?.email?.message&&<p className="err">{errors?.email?.message}</p>}
            <input type="password" name="password" id="" placeholder='Password' {...register('password', { required: true })} />
            {errors?.password?.message&&<p className="err">{errors?.password?.message}</p>}
            <div className="text">
              <Link to="/updatepassword">  <p>Forget Password?</p></Link>
            </div>
            <button type="submit">{user?.loading? <Spinner/>:'Login'}</button>
        </form>
        <div className="forget">
         <p>New user?</p> <Link to="/signup">Register</Link>
        </div>
    </div>
</div>
  )
}

export default Signin