import './Home.css'

import Navbar from '../requires/navbar';
import { dish } from '../../assets/images'

function Home() {
    return (
        <div className="home-body">
            <Navbar />
            <div className='home-main'>
                <div>
                    <p className='home-main-tag'>Eat fresh <br /> <span>Food</span></p>
                    <button>
                        Vote here
                    </button>
                </div>

                <img src={dish} alt="Dish" />
            </div>
        </div>
    );
}

export default Home;