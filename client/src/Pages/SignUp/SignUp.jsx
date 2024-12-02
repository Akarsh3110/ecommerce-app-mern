import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import EyeIcon from '../../assets/SimpleIcons/eye.svg'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/auth-slice'
import { useNavigate,Link } from 'react-router-dom'
import { toast  } from "react-toastify";


function SignUp() {

  const dispatch=useDispatch();
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    name:'',
    name:'',
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
    dispatch(registerUser(values)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        toast.success(data?.payload?.message,toastOptions)
        navigate('/signin')
      }else{
        toast.error(data?.payload?.message,toastOptions)
      }
      
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className='SignUp'>
        <div className="signup-left">
          <h2>3legant.</h2>
        </div>
        <div className="signup-right">
            <div className="signup-form">
              <div className="signup-head">
                <h2>Sign up</h2>
                <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input 
                    type="text"
                    placeholder='Your name'
                    name='name'
                    value={values.name}
                    onChange={handleInputs} />
                </div>
                <div className="input-box">
                  <input 
                    type="text"
                    placeholder='Username' 
                    name='name'
                    value={values.name}
                    onChange={handleInputs}/>
                </div>
                <div className="input-box">
                  <input 
                    type="email"
                    placeholder='Email address'
                    name='email'
                    value={values.email}
                    onChange={handleInputs} />
                </div>
                <div className="input-box">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    name='password' 
                    value={values.password}
                    onChange={handleInputs}/>
                    <img src={EyeIcon} alt="Showpassword" onClick={togglePasswordVisibility}/>
                </div>
                <div className="input-box">
                  <label>
                    <input 
                    type="checkbox"
                    name='checkbox'
                    required
                    />
                    I agree with <span>Privacy Policy</span> and <span>Terms</span>  of Use
                  </label>
                </div>
                <button type='submit' className='signup-btn' >Sign Up</button>
              </form>
               
            </div>
        </div>
    </div>
  )
}

export default SignUp