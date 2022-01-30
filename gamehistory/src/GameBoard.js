import React, { useEffect, useState } from "react";
import "./GameBoard.css";

function GameBoard() {
  //Declaration of all needed states
  const [playerChoice, setPlayerChoice] = useState(0);
  const [houseChoice, setHouseChoice] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [winCheck, setWinCheck] = useState("");
  const [points, setPoints] = useState([0, 0]);
  const [pointsHistory, setPointsHistory] = useState([]);

  const displayChoice = ["paper", "rock", "scissors"];

  //Random for house
  function getRandomIntiger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Check who won
  function checkWin() {
    let tempPoints = points;
    if (
      (playerChoice == 1 && houseChoice == 2) ||
      (playerChoice == 2 && houseChoice == 3) ||
      (playerChoice == 3 && houseChoice == 1)
    ) {
      tempPoints[0]++;
      setPoints([tempPoints[0], tempPoints[1]]);
      return (
        "You win, u chose " +
        displayChoice[playerChoice - 1] +
        ", and your oponent chose " +
        displayChoice[houseChoice - 1]
      );
    } else if (playerChoice == houseChoice) {
      return (
        "Remis, u chose " +
        displayChoice[playerChoice - 1] +
        ", and your oponent chose " +
        displayChoice[houseChoice - 1]
      );
    } else {
      tempPoints[1]++;
      setPoints([tempPoints[0], tempPoints[1]]);
      return (
        "You lose, u chose " +
        displayChoice[playerChoice - 1] +
        ", and your oponent chose " +
        displayChoice[houseChoice - 1]
      );
    }
  }

  //return to choose screen
  function goBackToGame() {
    setPlayerChoice((currPlayerChoice) => (currPlayerChoice = 0));
    setHouseChoice((currHouseChoice) => (currHouseChoice = 0));
    setShouldRender((currShouldRender) => (currShouldRender = true));
  }

  //
  function handleClick(e) {
    setPlayerChoice(
      (currPlayerChoice) => (currPlayerChoice = e.target.getAttribute("custom"))
    );
    setHouseChoice(
      (currHouseChoice) => (currHouseChoice = getRandomIntiger(1, 3))
    );
    setShouldRender((currShouldRender) => (currShouldRender = false));
  }

  function rewindClick(e) {
    let index=e.target.getAttribute("index");
    index=parseInt(index,10);
    let tempHistory=pointsHistory;
    const tempToChange=pointsHistory[index]; 
    setPoints(tempToChange);
    const newHistory=tempHistory.slice(0,index);
    setPointsHistory(newHistory);
  }

  function mapMovesHistory() {
    let tempPointsHistory1 = pointsHistory;
    let tempPointsHistory=tempPointsHistory1.slice(0,tempPointsHistory1.length);
    const returnedHistory = tempPointsHistory.map((value, index) => {
      
      return (
        <li key={index} >
          <button onClick={rewindClick} index={index} >
            rewind to move: {index}
          </button>
        </li>
      );
    });
    return returnedHistory;
  }

  useEffect(() => {
    console.log(playerChoice + " " + houseChoice);
    setWinCheck((currWinCheck) => (currWinCheck = checkWin()));
  }, [playerChoice, houseChoice]);

  useEffect(() => {
    let tempPointsHistory = pointsHistory;
    console.log(tempPointsHistory);
    console.log("Siea")
    tempPointsHistory.push(points)
    console.log(tempPointsHistory);
    setPointsHistory(tempPointsHistory);
    console.log(pointsHistory)
    // console.log(pointsHistory);
  }, [points]);

  return (
    <div className="GameBoard">
      <h2>Twoje punkty: </h2>
      {points[0]}
      <h2>Punkty komputera: </h2>
      {points[1]}
      <form>
        {shouldRender ? (
          <input type="button" custom={1} value="paper" onClick={handleClick} />
        ) : null}
        {shouldRender ? (
          <input type="button" custom={2} value="rock" onClick={handleClick} />
        ) : null}
        {shouldRender ? (
          <input
            type="button"
            custom={3}
            value="scissors"
            onClick={handleClick}
          />
        ) : null}
        {!shouldRender ? (
          <div>
            <input type="button" value="Play again" onClick={goBackToGame} />
            <br></br>
            <h1>{winCheck}</h1>
          </div>
        ) : null}
      </form>
      <ul>{mapMovesHistory()}</ul>
    </div>
  );
}

export default GameBoard;
