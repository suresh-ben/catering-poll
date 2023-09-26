import { useState, useEffect, useContext, useRef } from 'react';

import useComment from '../../../hooks/useComment';
import AuthContext from '../../../contexts/AuthContext';

function Recipe({item, selectedRecipe, setSelectedRecipe}) {

    const [ hideComments, SetHideComments] = useState(true);
    const [ comment, setComment ] = useState("");
    const [ comments, setComments ] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { makeComment } = useComment();
    const inputRef = useRef();

    useEffect(()=>{
        if(item)
            setComments(item.comments);
    }, [item]);


    return (
        <div className='poll-recipe' 
            style={selectedRecipe?._id === item._id ? {borderColor: 'white', borderWidth: '1px', borderStyle: 'solid'} : {}}
            onClick={() =>{
                setSelectedRecipe(item);
            }}
        >
            <div className='poll-recipe-name-votes'>
                <p>{item.name}</p>
                <p>Votes: {item.votes}</p>
            </div>
                <button style={{color: 'blue', backgroundColor: 'transparent', border: 0, marginLeft: '1rem', cursor: 'pointer'}}
                    onClick={()=>{
                        SetHideComments(!hideComments)
                    }}
                >Comments {`(${item.comments.length})`}</button>
                {
                    !hideComments && 
                    <div>
                        <ul style={{marginLeft: '2rem'}}>
                        {
                            comments.map((comment, k) => {
                                return <li className='poll-recipe-comment' key={k}>{comment}</li>
                            })
                        }
                        </ul>
                        {
                            currentUser && currentUser.type === 'chef' && 
                            <>
                                <input type="text" style={{color: 'black', fontSize: '.8rem', padding: '0 .25rem', margin: '0 .5rem'}} 
                                    ref={inputRef}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                /> 
                                <button
                                    style={{color: 'black', padding: '0 .25rem', margin: '0 .5rem'}}
                                    onClick={async () => {
                                        const res = await makeComment(item._id, comment);
                                        if(res) {
                                            setComments([...comments, comment]);
                                            inputRef.current.value = "";
                                        }
                                    }}
                                >Comment</button>
                            </>
                        }
                    </div>
                }
        </div>
    );
}

export default Recipe;