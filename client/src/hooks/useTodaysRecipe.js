import { useEffect, useState } from 'react';
import axios from 'axios';

function useTodaysRecipe() {
    axios.defaults.withCredentials = true;

    const [topRecipe, setTopRecipe] = useState(null);
    useEffect(() => {
        todaysRecipe();
    }, []);

    const todaysRecipe = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/today-recipe');
            if (res.data.length > 0)
                setTopRecipe(res.data[0]);
        } catch (err) {
            setTopRecipe(null);
        }
    }

    return { topRecipe };
}

export default useTodaysRecipe;