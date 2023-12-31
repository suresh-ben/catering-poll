import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import useCurrentUser from '../../../hooks/useCurrentUser';
import AuthContext from '../../../contexts/AuthContext';

import { employee, chef } from '../../../assets/images';

function Navbar() {

    const { user } = useCurrentUser();
    const { setCurrentUser } = useContext(AuthContext);

    useEffect(()=>{
        setCurrentUser(user);
        console.log(user)
    }, [user]);

    const SignOut = async () => {

        //clear cookies
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName] = cookie.split('=');
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        //reload
        window.location.reload();
    }

    return (
        <nav className="nav-bar">
            <a className="nav-brand" href='/' style={{textDecoration: 'none'}}>Catering Poll</a>
            <div className="nav-user">
                {user && user.success && user.type === 'chef' &&
                    <img className='user-image' src={chef} alt="C" />
                }
                {user && user.success && user.type === 'employee' &&
                    <img className='user-image' src={employee} alt="E" />
                }

                {user && user.success && <p className="nav-user-name">{user.name}</p>}
                {
                    user && user.success ?
                    <button onClick={SignOut} className='nav-button'>SignOut</button> :
                    <Link className='nav-button' to="/auth">SignIn</Link>
                }
            </div>
        </nav>
    );
}

export default Navbar;