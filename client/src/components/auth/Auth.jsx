import { useState } from 'react';
import './Auth.css'

import SignUp from './signUp';
import SignIn from './signIn';

function Auth() {
    const [signUp, setSignUp] = useState(false);

    return (
        <div className="auth-body">
            <a href="./" style={{position: 'fixed', top: 0, left: 0, textDecoration: 'none', margin: '1rem 2rem' }} className="nav-brand" >Catering Poll</a>

            <div className='user-sign'>
                <p style={{textAlign: 'center', margin: '.5rem', fontWeight: 'bold', fontSize: 'xx-large'}}>Catering Poll</p>
                <div className='sign-alt'>
                    <button
                        style={signUp? {} : {backgroundColor: '#557917'}}
                        onClick={()=>{
                            setSignUp(false);
                        }}
                    >SignIn</button>
                    <button
                        style={signUp? {backgroundColor: '#557917'} : {}}
                        onClick={()=>{
                            setSignUp(true);
                        }}
                    >SignUp</button>
                </div>
                {
                    signUp ? <SignUp /> : <SignIn />
                }
            </div>
        </div>
    );
}

export default Auth;