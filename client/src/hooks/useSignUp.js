import axios from 'axios';

function useSignUp() {
    axios.defaults.withCredentials = true;
    const signUp = async(name, email, password, chefCode) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + 'api/users/signUp', {
                name,
                email,
                password,
                chefCode
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

    return { signUp };
}

export default useSignUp;