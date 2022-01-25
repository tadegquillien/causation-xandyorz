//this component displays instructions

import { useState } from 'react';
import GenerateUrn from './GenerateUrn';
import GenerateDeterministicUrn from './GenerateDeterministicUrn';
import { shuffle } from './convenienceFunctions';
import {
    circle_ids, mode, urn_ids, urn_letters, PROBS, colors, actualWorld,
    threshold
} from './gameParameters';

import { color_palette } from './randomizedParameters';

import { r } from './dimensions';
import './Instructions.css'
import { textStyle, buttonStyle } from './dimensions';
import Data from './Data';





const Instructions = (props) => {
    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    
    const importantcolor = props.importantcolor;
    const othercolor = props.othercolor;
    const democolor = Math.random() > .5 ? props.importantcolor : props.othercolor;
    //the dimensions for some of the text
    const localTextStyle = {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        //minHeight: "100vh",
        marginLeft: "20vw",
        marginRight: "20vw",
        fontSize: "20px",
        }

    //the props we will pass on to each page
    const tutorialProps = {
        importantcolor : importantcolor,
        othercolor : othercolor,
        democolor : democolor,
        test_ids: props.test_ids,
        shuffleUrnIds: props.shuffleUrnIds,
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        localTextStyle: localTextStyle
    };

    

    //the list of pages
    const instructionTrials = [<Intro {...tutorialProps} />,
    //<TaskTutorial {...tutorialProps} />,
    <TaskTutorialTwo {...tutorialProps} />,
    //<TaskTutorialThree {...tutorialProps} />,
    <TaskTutorialFour {...tutorialProps} />,
    <TaskTutorialFive {...tutorialProps} />]

    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

//the first page
const Intro = (props) => {
    const importantcolor = props.importantcolor;
    const othercolor = props.othercolor;
    return (
        <span style={textStyle}>
            <p style={{color:"red"}}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
            <br></br>
            <p >In this study you will play a simple game of chance.</p>
            <br></br>
            <p>
                There will be boxes in front of you. Some boxes contain a mix of <b>black</b> balls and <span style={{ color: importantcolor }}><b>{importantcolor}</b></span> balls.
                 Other boxes contain a mix of <b>black</b> balls and <span style={{ color: othercolor }}><b>{othercolor}</b></span> balls.
            </p>
            <br></br>
            <p>You will randomly draw one ball from each box.</p>
                <p>In order to win the game, you need to draw at least one <span style={{ color: importantcolor }}><b>{importantcolor}</b></span> ball and one <span style={{ color: othercolor }}><b>{othercolor}</b></span> ball.
                </p>
            <br></br>
            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}

/* //the second page
const TaskTutorial = (props) => {
    //keeps track of the score
    const [score, setScore] = useState(0);
    //keeps track of whether the participant clicked on "draw"
    const [urnCounter, setUrnCounter] = useState(0);

    

    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton = (urnCounter > 0) ?
        <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button> :
        null;

    //after the participant clicks on 'draw', display this text
    const afterDrawText = (urnCounter > 0) ?
        <span style={props.localTextStyle}>
            <p>You have just drawn a <b>black</b> ball. Therefore you get <b>zero</b> points.</p>
        </span> :
        null;

   

    //display the page
    return (

        <div className = "page" 
        //style={textStyle}
        >
            <div className="text" style={props.localTextStyle}>
            <p>Here is an example. When you click on "draw" next to a box, one ball will be randomly drawn from the box. Each ball is equally likely to be selected.</p>
            <p>Click on "draw" next to each box to draw a ball.</p>
            </div>
            
            {/*generate one urn. It is set up so that the participant will draw a black ball*/
            //}
            //
            //{
                /* <div className="containerInst">
                <span className="urnInst"><GenerateUrn ids={circle_ids} urnColorID={4} urnLetter={"A"}
                    drawn={0}
                    ballColors={[0, "#F77B25", 0, "#F77B25", 0, 0, 0, 0, "#F77B25", 0]}
                    phase={"instructions"}
                    testNumber={1}
                    test_ids={props.test_ids}
                    shuffledUrnIds={props.shuffledUrnIds}
                    scoreSetter={setScore}
                    setUrnCounter={setUrnCounter}
                /></span>
                {/*a scoreboard*/
                //}
               /*  <div className="scoreboardInst">
                    <h2>Score: {score}</h2>
                </div>
                </div>
        <div className="afterClick">
        {afterDrawText}
            {nextPageButton}
        </div>
            
            <br></br>
        </div>




    )

} */

//the third page
const TaskTutorialTwo = (props) => {
    //keeps track of the score
    const [score, setScore] = useState(0);
    //keeps track of whether the participant has clicked on "draw"
    const [urnCounter, setUrnCounter] = useState(0);

    const democolor = props.democolor;
    //after the participant clicks on "draw", a button appears that goes to the next page
    const nextPageButton = (urnCounter > 0) ?
        <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button> :
        null;

    //after the participant clicks on "draw", a text appears below the urn
    const afterDrawText = (urnCounter > 0) ?
        <span>
            <p>You have just drawn a <span style={{ color: democolor }}><b>{democolor}</b></span> ball!</p>
        </span> :
        null;

    //display the page
    return (

        <div className="page">
            <div className = "text" style={props.localTextStyle}>
            <p>The more colored balls there are in a box, the more likely you are to
draw a colored ball. The box below has 12 colored balls out of 20 balls,
so you have a 60% chance of drawing a colored ball. </p>
            <p>Click on "draw" next to the box to draw a ball.</p></div>
            
            <div className="containerInst">
                {/*generate one urn. It is set up so that the participant will draw a red ball*/}
                <div className="urnInst"><GenerateUrn ids={circle_ids} urnColorID={1} urnLetter={"A"}
                    drawn={1}
                    ballColors={[0, democolor, 0, democolor, democolor, 0, democolor, 0, democolor, democolor,
                    0, democolor, 0, democolor, democolor, 0, democolor, 0, democolor, democolor]}
                    phase={"instructions"}
                    testNumber={1}
                    test_ids={props.test_ids}
                    shuffledUrnIds={props.shuffledUrnIds}
                    scoreSetter={setScore}
                    setUrnCounter={setUrnCounter}
                /></div>
                {/*a scoreboard*/}
                <span className="scoreboardInst">
                    {/*<h2>Score: {score}</h2>*/}
                </span></div>
            <div className="afterClick" style={props.localTextStyle}>
            {afterDrawText}
            {nextPageButton}
            </div>
            
        </div>

    )

}


//the fourth page
const TaskTutorialThree = (props) => {
    //draw five balls, each of different color,
    //along with the points associated with that color
    const circles = [0, 1, 2, 3, 4].map((i) => {
        let s = i === 1 ? null : "s";
        let fill = i === 0 ? "black" : color_palette[i - 1]
        return (
            <svg height="75px">
                <circle
                    cx={120} cy={50} r={r} fill={fill} stroke="black"
                />
                <text x={140} y={55}> : {i} point{s}</text>
            </svg>
        )
    });

    //display the page
    return (
        <div style={textStyle}>
            <p>The redder the ball, the more points it gives:</p>
            {circles}
            <br></br>
            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
        </div>
    )
}

//the fifth page
const TaskTutorialFour = (props) => {
    const importantcolor = props.importantcolor;
    const othercolor = props.othercolor;
    return (
        <div style={textStyle}>
            <p>You will now play the game 10 times in a row.</p>
            <p>The game consists in drawing a ball from each of three boxes.</p>
            <p>In order to win the game, you need to draw at least one <span style={{ color: importantcolor }}><b>{importantcolor}</b></span> ball
             and one <span style={{ color: othercolor }}><b>{othercolor}</b></span> ball.
             Drawing <b>black</b> balls does not help you win.
           </p>
            <p>You will need to draw a ball from each of the three boxes before moving on to the next round.</p>
            <p><i>Please pay close attention to the balls you have drawn, and whether you win or lose.</i></p>
            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
        </div>
    )

}

//the sixth page: two comprehension questions
const TaskTutorialFive = (props) => {
    //keep track the participants' answers
    const [ black, setBlack ] = useState("NA");
    const [ goal, setGoal ] = useState("NA");

    //update the participants' answer

    const handleBlack = (e) => {
        setBlack(e.target.value);
    };

    const handleGoal = (e) => {
        setGoal(e.target.value);
    };

    //when the participant submits the form, record the data 
    //and start the training phase
    const handleClick = ()=>{
        Data.comprehension.push({
            "questionBlack": black,
            "questionGoal": goal
        });
        Data.rareColor.push(props.importantcolor);
        props.setCurrentPhase("training");
    }
    //display the questions
    return(
        <div style={textStyle}>
            <h3>Before starting, please take a moment to answer the following questions:</h3>
        <form>
        <label for="blackQuestion">Does drawing a black ball make you more likely to win the game?</label>
        <br></br>
        <br></br>
        <select name="blackQuestion"
        onChange={(e)=>handleBlack(e)}>
            {["NA","Yes","No","Impossible to tell"].map((i)=>{return(
                <option name={i} value={i}>{i==='NA' ? '' :i}</option>
            )})}
        </select>
        <br></br>
        <br></br>
        <label for="goalQuestion">What is the condition for winning the game?</label>
        <br></br>
        <br></br>
        <select name="goalQuestion"
        onChange={(e)=>handleGoal(e)}>
            <option name="NA" value="NA"> </option>
            <option name="sameColor" value="sameColor">every ball you draw must be of the same color</option>
            <option name="onlyColor" value="onlyColor">you must draw exactly zero black balls</option>
            <option name="threshold" value="threshold">you must get at least one {props.importantcolor} ball and one {props.othercolor} ball</option>
            <option name="even" value ="even">you must draw an even number of black balls</option>
        </select>
        </form>
                <br></br>
        <button style={buttonStyle} onClick={()=>handleClick()}>click here to start playing the game</button>
        </div>
        
    )
}



export default Instructions;