import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


import { useNavigate } from 'react-router';
import './Home.css';

const Reg = () => {

  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandle = async (event) => {
    event.preventDefault();

    const empData = { name, email, password };
    await axios.post("http://localhost:8080/register", empData);
      // Perform login logic here
      // setError('');
     
      alert('Register successful!');
      nav("/")
    
  };

  return (
  <div className="login-page">
    <div className='form'>
      <form className='login-form' onSubmit={submitHandle}>
        <h3>Register</h3>
        {/* <label className="lable">User Name :</label> */}
        <div>
          {/* <label className="label" required> Password </label> */}
          <input type="text" required onChange={nameChange} placeholder='Enter your Name'></input>
          </div>
{/* <label className="lable">Email :</label> */}
<div>
          {/* <label className="label">Email </label> */}
          <input type="email" required onChange={emailChange} placeholder='Enter your Email'></input>
          </div>
       {/* <label className="lable">Password :</label> */}
        
       <div>
          {/* <label className="label" required> Password </label> */}
          <input type="password" required onChange={passwordChange} placeholder='Enter your password'></input>
          </div>
          <div className="">
            <div>
              <button type="submit" className="btn btn-primary"> Register </button>
              </div>
              </div>
                   
    <p className="message"style={{ color: "White" }}>Already registered? <Link to="/" style={{ color: "White",fontWeight: "bold" }}>Login</Link></p>
      </form>
    </div>
   </div>
   
  );
};

export default Reg;