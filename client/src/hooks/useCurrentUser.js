import { useEffect, useState } from "react";
import axios from 'axios';

function useCurrentUser() {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState(null);

    useEffect(() => {
        currentUSer();
    }, []);

    const currentUSer = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/users/current-user');
            console.log(res);
            setUser({
                success: true,
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                type: res.data.type
            });
        } catch (err) {
            console.log(err);
            setUser({
                success: false
            })
        }
    }

    return { user };
}

export default useCurrentUser;