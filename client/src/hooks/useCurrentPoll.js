import { useState, useEffect } from "react";
import axios from 'axios';

function useCurrentPoll() {
    axios.defaults.withCredentials = true;
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        currentPoll();
    }, []);

    const currentPoll = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/poll');
            setPoll({
                success: true,
                id: res.data.id,
                expired: res.data.expired
            });
        } catch (err) {
            setPoll({
                success: false
            })
        }
    }

    return { poll };
}

export default useCurrentPoll;