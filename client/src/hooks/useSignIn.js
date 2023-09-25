import axios from 'axios';

function useSignIn() {
    axios.defaults.withCredentials = true;

    const signIn = async(email, password) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'api/users/signIn', {
                email,
                password
            });

            return {
                success: true,
                data: res.data
            }
        } catch (err) {
            return {
                err: err.response.data.errors.map(item => {
                    return item.message
                }),
                success: false
            }
        }
    }

    return { signIn };
}

export default useSignIn;