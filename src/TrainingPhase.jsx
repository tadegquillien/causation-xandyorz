//manages the page during the Training phase

import React, { useState, useEffect } from 'react';
import Image from './Image';
import './TrainingPhase.css';
import Data from './Data';

import { buttonStyle } from './dimensions';
import { circle_ids, color_palette, mode, urn_ids, PROBS, colors, actualWorld, 
threshold } from './gameParameters';
import { importantcolor, othercolor } from './randomizedParameters';


  
const TrainingPhase = (props) => {

    //the current trial number
    const trial = props.trial;
    //keep track of the score
    const [ score, setScore ] = useState(0);

    //keep track of how many balls of the rare color have been drawn
    const [ importantCounter, setImportantCounter ] = useState(0);
    //keep track of how many balls of the frequent color have been drawn
    const [ otherCounter, setOtherCounter ] = useState(0);

    //keep track of how many urns we have already drawn from
    const [ urnCounter, setUrnCounter ] = useState(0);

    //the color of the counters displaying how many balls of each color we have drawn
    const [ scoreImportantColor, setScoreImportantColor ] = useState("black");
    const [ scoreOtherColor, setScoreOtherColor ] = useState("black")

    

    const scoreSetter = (a) => {
      setImportantCounter(a);
    }

  
    //increments the score
    const scoreSetterImportant = (a) => {
      setImportantCounter(a);
    };
    
    const scoreSetterOther = (a) => {
      setOtherCounter(a);
    };

    //when the participant has drawn from all urns, determines if they win or lose
    const outcome = urnCounter > (urn_ids.length - 1) ? 
    (importantCounter * otherCounter > 0 ? 
    <span>you <span style={{color: "green"}}>win!</span></span> :
    <span>you <span style={{color: "black"}}>lose</span></span>) : null;
    //the button to go to the next round. Only appears after all urns have been drawn from
    const buttonText = trial < props.trial_ids.length ? "click to go to the next round" :
     "click to go to the next phase";
    const nextTrialButton = urnCounter > (urn_ids.length - 1) ? <button style={{...buttonStyle, marginLeft:"0"}} onClick={() => handleClick()}>
        {buttonText}</button> : null;

    //to be able to skip this phase in development mode, comment 
    //the following line and uncomment the one after
    const devSkip = null;
    //const devSkip = <button onClick={()=>props.setCurrentPhase("transition")}>Dev:Skip</button>;

    //when we click on the "next round" button, increment the 'trial' variable and record the score in the Data
    const handleClick = ()=>{
        props.increment(trial);
        Data.scoresImportant.push(importantCounter);
        Data.scoresOther.push(otherCounter);
    }
    
    useEffect(()=>{
      if(importantCounter > 0){setScoreImportantColor("#03D310")};
    }, [importantCounter]);

   useEffect(()=>{
      if(otherCounter > 0){setScoreOtherColor("#03D310")};
   }, [otherCounter]);

    
    //display the urns and the scoreboard
    return(
      <span className = "superContainer">
      <span className="container">

        <div className="currentScore">
          <h1>{importantcolor} balls
           : <span style={{color:scoreImportantColor}}>{importantCounter}</span>
            .  {othercolor} balls: <span style={{color:scoreOtherColor}}>{otherCounter}</span>.
        <br></br></h1>
        </div>


        {/*the urns*/}
        <div className="urns"><Image ids={circle_ids} colors={colors} prob={PROBS} 
       scoreImportantColor={scoreImportantColor} scoreOtherColor={scoreOtherColor}
       scoreSetterImportant={scoreSetterImportant} scoreSetterOther={scoreSetterOther}
        setUrnCounter={setUrnCounter} mode={mode}
        scoreSetter={scoreSetter}
       phase={props.phase} shuffledUrnIds={props.shuffledUrnIds}
       ballColorsList={props.ballColorsList} trial={trial} 
       setImportantCounter={setImportantCounter}
       setScoreImportantColor = {setScoreImportantColor}
       setScoreOtherColor = {setScoreOtherColor}
       /></div>

        {/*the scoreboard*/}
        <div className="requiredScore">
        <h1>Required to win: 1 {importantcolor} ball and 1 {othercolor} ball.</h1><br></br>
        </div>
        
        
        
       
        
      </span>
      <div className="side">
        <h1>this is round #{trial}</h1>
        <h1>{outcome}</h1>
        {nextTrialButton}
        {devSkip}
      </div>
      </span>
    )
    
  }
  

  export default TrainingPhase;

  