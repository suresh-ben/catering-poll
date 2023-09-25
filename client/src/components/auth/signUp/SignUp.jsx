import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useSignUp from "../../../hooks/useSignUp";

function SignUp() {
    
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ isChef, setIsChef ] = useState(false);
    const [ chefCode, setChefCode ] = useState("");
    const [ error, setError ] = useState("");
    const { signUp } = useSignUp();
    const navigate = useNavigate();

    const UserSignUp = async (e) => {
        e.preventDefault();

        if(!name || name.length <= 0) {
          setError("Please provide name");
          return;
        }

        if(!email || !isEmailValid(email)) {
          setError("INValied Email");
          return;
        }

        if(!password || password.length < 8) {
          setError("password length shold be greater than 8 characters");
          return;
        }

        const response = await signUp(name, email, password, chefCode);
        if(response.success) {
          console.log("Success");
          navigate('/');
        } else {
          setError(response.err);
        }
    }

    function isEmailValid(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    return (
        <div className="sign-area">
          <h1 className="sign-head">Sign Up</h1>

          <form onSubmit={UserSignUp}>
              <input
                className="sign-input"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
              />

              <input
                className="sign-input"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />

              <input
                className="sign-input"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />

              <div style={{fontSize: '.75rem', display: 'flex', alignItems: 'center'}}>
                <input type="checkbox" 
                  style={{marginRight: '10px'}}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setIsChef(e.target.checked);
                  }}
                  /> 
                Are you a Chef?
              </div>

              {
                isChef && 
                <input
                className="sign-input"
                type="text"
                onChange={(e) => {
                  setChefCode(e.target.value);
                }}
                placeholder="Please Enter Chef CODE"
              />
              }

              <button className="sign-button" type="submit">Sign Up</button>
              <p style={{textAlign: 'center', color: 'red', fontSize: 'small'}}>{error}</p>
            </form>
          </div>
    )
}

export default SignUp;