import { useEffect, useState, useContext, useRef } from 'react';
import './Poll.css';

import Navbar from '../requires/navbar';
import Recipe from './Recipe';

import useCurrentPoll from '../../hooks/useCurrentPoll';
import useRecipes from '../../hooks/useRecipes';
import useVote from '../../hooks/useVote';
import useCanVote from '../../hooks/useCanVote';
import useCreateRecipe from '../../hooks/useCreateRecipe';
import useTodaysRecipe from '../../hooks/useTodaysRecipe';

import { cultry } from '../../assets/images'

function Poll() {

    const { poll } = useCurrentPoll();
    const { fetchRecipes, recipes, setRecipes } = useRecipes();
    const { makeVote } = useVote();
    const { canVote, setCanVote } = useCanVote();
    const { createNewRecipe } = useCreateRecipe();
    const { topRecipe } = useTodaysRecipe();
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
            <div className='poll-expired'>
                <div className='poll-expired-container'>
                    <div style={{backgroundColor: 'black', zIndex: '100', width: '100%', display: 'flex', padding: '.5rem 0', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <p style={{zIndex: '50', fontWeight: 'bold', fontSize: 'xx-large'}} >Poll not started Yet!!</p>
                    </div>
                    <img style={{position: 'absolute', height: '25rem', top: 0, left: 0}} src={cultry} alt="" />
                    </div>
                </div>
            </div>
        );
    }

    if(poll && poll.success && poll.expired) {
        return (
            <div className='poll-body'>
            <Navbar />
                <div className='poll-expired'>
                <p style={{zIndex: '50', fontWeight: 'bold', fontSize: 'xx-large', margin: '3rem 0'}} >Poll has expired... </p>


                    <div style={{position: 'relative', height: '25rem', width: '25rem', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{backgroundColor: 'black', zIndex: '100', width: '100%', display: 'flex', padding: '.5rem 0', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            topRecipe && 
                            <>
                                <p style={{zIndex: '50', fontWeight: 'bold', fontSize: 'xx-large'}} >Top dish</p>
                                <p style={{ zIndex: '50', fontWeight: 'bold', fontSize: 'x-large'}}>{topRecipe.name}</p>
                            </>
                        }
                        </div>
                        <img style={{position: 'absolute', height: '25rem', top: 0, left: 0}} src={cultry} alt="" />
                    </div>
                </div>
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

                    {/* <input className='poll-search' type="text" /> */}
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



export default Poll;