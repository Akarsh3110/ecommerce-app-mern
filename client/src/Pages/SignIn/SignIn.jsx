import React, { useState } from 'react'
import '../SignIn/SignIn.css'
import EyeIcon from '../../assets/SimpleIcons/eye.svg'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/auth-slice'
import { toast } from "react-toastify";
import { Link,  } from 'react-router-dom'

function SignIn() {
  const dispatch=useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email:'',
    password:''
  })
  console.log(values);

  const handleInputs=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(loginUser(values)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        toast.success(data?.payload?.message,toastOptions)
        const user=data.payload.user;
        // user.role==='admin'?navigate('/admin/dashboard'):navigate('/user/home')
        // console.log(user.role);
        
        // navigate('/signin')
      }else{
        toast.error(data?.payload?.message,toastOptions)
      }
      
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='SignIn'>
        <div className="signin-left">
            <h2>3legant.</h2>
        </div>
        <div className="signin-right">
            <div className="signin-form">
              <div className="signin-head">
                <h2>Sign In</h2>
                <p>Don’t have an accout yet? <Link to='/signup'>Sign Up</Link></p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input 
                    type="email"
                    required
                    placeholder='Email address'
                    name='email'
                    value={values.email}
                    onChange={handleInputs} />
                </div>
                <div className="input-box">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder='Password' 
                    name='password'
                    value={values.password}
                    onChange={handleInputs}/>
                    <img src={EyeIcon} alt="Showpassword" onClick={togglePasswordVisibility}/>
                </div>
                <div className="input-box checkbox-input">
                  <label>
                    <input type="checkbox"
                    required
                    name='checkbox'/>
                    Remember me
                  </label>
                  <span>Forgot Password?</span>
                </div>
                <button type='submit' className='signin-btn'>Sign In</button> 
              </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn