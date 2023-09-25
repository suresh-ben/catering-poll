import { useEffect, useState, useContext, useRef } from 'react';
import './Poll.css';

import Navbar from '../requires/navbar';

import AuthContext from '../../contexts/AuthContext';

import useCurrentPoll from '../../hooks/useCurrentPoll';
import useRecipes from '../../hooks/useRecipes';
import useVote from '../../hooks/useVote';
import useCanVote from '../../hooks/useCanVote';
import useCreateRecipe from '../../hooks/useCreateRecipe';
import useComment from '../../hooks/useComment';

function Poll() {

    const { poll } = useCurrentPoll();
    const { fetchRecipes, recipes, setRecipes } = useRecipes();
    const { makeVote } = useVote();
    const { canVote, setCanVote } = useCanVote();
    const { createNewRecipe } = useCreateRecipe();
    const [ selectedRecipe, setSelectedRecipe ] = useState(null);
    const [ error, setError] = useState("");
    const [ newRecipe, setNewRecipe ] = useState("");
    const [ newRecipeActive, setNewRecipeActive ] = useState(false);
    const [ newRecipeError, setNewRecipeError ] = useState(false);

    useEffect(()=>{
        if(!poll || !poll.success) return;
        fetchRecipes();
    }, [poll]);

    if(!poll || !poll.success) {
        return (
            <div className='poll-body'>
            <Navbar />
                Pole Not Started yet... Please Wait!!!
            </div>
        );
    }

    if(poll && poll.success && poll.expired) {
        return (
            <div className='poll-body'>
            <Navbar />
                Poll has expired... 
            </div>
        );
    }

    return (
        <div className='poll-body'>
            <Navbar />
            <div className='poll-main'>
                <div className='poll-create-search'>
                    <button className='poll-create'
                        onClick={() => {
                            setNewRecipeActive(true);
                        }}
                    >
                        Create New
                    </button>
                    {/* A fixed div */}
                    <div style={newRecipeActive? {display: 'flex'}: {display: 'none'}} className='poll-create-new' >
                        <h2 style={{position: 'fixed', right: '1rem', top: '.75rem'}}
                            onClick={()=>{
                                setNewRecipeActive(false);
                            }}
                        >X</h2>
                        <h1>Create A New Dish</h1>
                        <br />
                        <input type="text" 
                            style={{width: '75%', padding: '.25rem .5rem', color: 'black'}}
                            onChange={(e)=>{
                                setNewRecipe(e.target.value);
                            }}
                        />
                        <br />
                        <button className='poll-create'
                            onClick={async () => {
                                //Todo 
                                const res = await createNewRecipe(newRecipe);
                                if(!res.success) setNewRecipeError("Unable to create a new recipe!!");
                                else {
                                    // window.location.reload();
                                    setRecipes([...recipes, res.recipe])
                                    setNewRecipeActive(false);
                                    setNewRecipeError("");
                                }
                            }}
                        >
                            Create New
                        </button>
                        <p style={{color: 'red', fontSize: '.9rem'}}>{newRecipeError}</p>
                    </div>

                    <input className='poll-search' type="text" />
                </div>

                <div className='poll-recipes'>
                        {
                            recipes && recipes.length > 0 && recipes.map((item, i) => {
                                return (
                                    <Recipe key={i} item={item} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}/>
                                )   
                            })
                        }
                </div>

                <button className='poll-create' style={!selectedRecipe || !canVote? {marginTop: '1rem', padding: '.5rem 5rem', backgroundColor: 'grey'}: {marginTop: '1rem', padding: '.5rem 5rem'}}
                    disabled={!selectedRecipe || !canVote}

                    onClick={async ()=>{
                        const res = await makeVote(selectedRecipe?._id);
                        if(!res)
                            setError("Error with voting! Please try again.");
                        else {
                            // window.location.reload();
                            let tempRecipes = recipes;

                            for(let i = 0; i < tempRecipes.length; i++) {
                                let recipe = tempRecipes[i];
                                if(recipe._id === selectedRecipe._id)
                                    recipe.votes++;
                            }
                            setRecipes(tempRecipes);
                            setCanVote(false);
                        }
                    }}
                >
                    Vote
                </button>

                <p style={{color: 'red', fontSize: '.9rem'}}>{error}</p>
            </div>
        </div>
    );
}

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
                                    style={{color: 'black', padding: '0 .25rem' }}
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

export default Poll;