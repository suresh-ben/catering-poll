import { useState } from "react";
import axios from 'axios';

function useRecipes() {

    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/reciepes');
            setRecipes(res.data);
        } catch (err) {
            setRecipes([]);
        }
    }

    return { recipes, setRecipes, fetchRecipes }
}

export default useRecipes;