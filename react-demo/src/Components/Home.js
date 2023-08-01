import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router';
import './Home.css';

const Home = () => {

  const nav = useNavigate();
  const [email, emailchange] = useState('');
  const [password, passwordchange] = useState('');
  const [error, setError] = useState('');

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const submitHandle = async (event) => {
    event.preventDefault();

    const res = await axios.get(
      `http://localhost:8080/login/${email}/${password}`
    );

    // Perform validation
    if (res.data === "wrong mail") {
      alert('Please enter your username.');
    } else if (res.data === "wrong pass") {
      alert('Please enter your password.');
    } else {
      // Perform login logic here
      setError('');
    
      alert('Login successful!');
      nav("/user")
    }
  };

  return (
    
  <div className="login-page">
    <div className='form'>
      <form className='login-form' onSubmit={submitHandle} >
        <h3>Login</h3>

          {/* <input type="email" placeholder="Example@gmail.com" value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                            if (e.target.value === '' || !e.target.value.includes('@gmail.com')) {

                              e.target.style.border = "2px solid red"
                          }
                          else {
                              e.target.style.border = "2px solid green"
                               }
                         }} />

          <input type="password" placeholder=" Enter Password " onChange={e => {
                        setPassword(e.target.value)

                        if (e.target.value === '' || e.target.value.length < 6) {

                            e.target.style.border = "2px solid red"
                        }
                        else {
                            e.target.style.border = "2px solid green"
                        }

                    }} /> */}
                    <div>
          {/* <label className="label">Email </label> */}
          <input type="email" required onChange={emailChange} placeholder='Enter your Email'></input>
        </div>

       
          <div>
          {/* <label className="label" required> Password </label> */}
          <input type="password" required onChange={passwordChange} placeholder='Enter your password'></input>
          </div>
          <div className="">
            <div>
              <button type="submit" className="btn btn-primary"> Login </button>
              </div>
              </div>
              <p className="message"style={{ color: "White" }}>Not registered? <Link to="/signup" style={{ color: "White",fontWeight: "bold" }}>Sign Up</Link></p>
              </form>
              </div>
            </div>
   
  );
};

export default Home;