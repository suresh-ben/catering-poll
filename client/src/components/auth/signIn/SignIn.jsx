import { useState } from "react";
import useSignIn from "../../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

function SignIn() {
    
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ error, setError ] = useState("");
    const { signIn } = useSignIn();
    const navigate = useNavigate();

    const UserSignIn = async (e) => {
        e.preventDefault();

        if(!email || !isEmailValid(email)) {
          setError("INValied Email");
          return;
        }

        if(!password || password.length < 8) {
          setError("password length shold be greater than 8 characters");
          return;
        }

        const response = await signIn(email, password);
        if(response.success) {
          console.log("Success");
          navigate('/');
        } else {
          setError("Unable to Login! Please check credentials");
        }
    }

    function isEmailValid(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    return (
        <div className="sign-area">
            <h1 className="sign-head">Sign In</h1>
            <form onSubmit={UserSignIn}>
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

              <button className="sign-button" type="submit">Sign In</button>
              <p style={{textAlign: 'center', color: 'red', fontSize: 'small'}}>{error}</p>
            </form>
          </div>
    )
}

export default SignIn;