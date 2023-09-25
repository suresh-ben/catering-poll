import axios from "axios";

function useCreateRecipe() {
    axios.defaults.withCredentials = true;

    const createNewRecipe = async(name) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'api/reciepes/create', {
                name: name
            });

            return {
                success: true,
                recipe: res.data
            };
        } catch (err) {
            return {
                success: false
            };
        }
    }

    return { createNewRecipe };
}

export default useCreateRecipe;