import axios from 'axios';

function useVote() {
    axios.defaults.withCredentials = true;
    const makeVote = async(recipe_id) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'api/vote', {
                recipe_id
            });

            return true;
        } catch (err) {
            return false;
        }
    }

    return { makeVote };
}

export default useVote;