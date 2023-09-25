import { useEffect, useState } from "react";
import axios from "axios";

function useCanVote() {
    axios.defaults.withCredentials = true;
    const [canVote, setCanVote] = useState(false);

    useEffect(() => {
        fetchCanVote();
    }, []);

    const fetchCanVote = async() => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + 'api/vote');
            setCanVote(res.data.canVote);
        } catch {
            setCanVote(false);
        }
    }

    return { canVote, setCanVote };
}

export default useCanVote;