import axios from "axios";

function useComment() {
    axios.defaults.withCredentials = true;

    const makeComment = async(recipe_id, comment) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'api/comment', {
                comment: comment,
                recipe_id: recipe_id
            });

            return true;
        } catch (err) {
            return false;
        }
    }

    return { makeComment };
}

export default useComment;