import React, {useEffect, useState} from 'react';

import SquareComponent from "./modules/SquareComponent";
import './index.css';
import WinnerModal from '../WinnerModal';
const clearState = ["", "", "", "", "", "", "", "", "", ""];

function NewGame() {
    const [gameState, updateGameState] = useState(clearState)
    const [isXChance, updateIsXChance] = useState(false)
   const [getWinner ,setWinner]=useState(null)
   const [showModal,setShowModal]=useState(false)
    const onUserClicked = (index) => {
        let strings = Array.from(gameState);
        if (strings[index])
            return;
        strings[index] = isXChance ? 'X' :'O';
        updateIsXChance(!isXChance)
        updateGameState(strings)
    }

    const clearGame = () => {
        updateGameState(clearState)
        setShowModal(false)
    }
    useEffect(() => {
        let winner = checkWinner();
        if (winner) {
          setWinner(winner)
          setShowModal(true)
            // clearGame();
        }
    }, [gameState])

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    return (
        <div className="app-header">
            {(getWinner&&showModal)&&<WinnerModal winner={getWinner} clearGame={clearGame} clearState={clearState}
            setShowModal={setShowModal}/>}
            <div className="row jc-center">
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(0)} state={gameState[0]}/>
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(1)} state={gameState[1]}/>
                <SquareComponent className="b-bottom" onClick={() => onUserClicked(2)} state={gameState[2]}/>
            </div>
            <div className="row jc-center">
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(3)} state={gameState[3]}/>
                <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(4)} state={gameState[4]}/>
                <SquareComponent className="b-bottom" onClick={() => onUserClicked(5)} state={gameState[5]}/>
            </div>
            <div className="row jc-center">
                <SquareComponent className="b-right" onClick={() => onUserClicked(6)} state={gameState[6]}/>
                <SquareComponent className="b-right" onClick={() => onUserClicked(7)} state={gameState[7]}/>
                <SquareComponent onClick={() => onUserClicked(8)} state={gameState[8]}/>
            </div>
            <button className="clear-button" onClick={clearGame}>Clear Game</button>
          
        </div>
    );
}

export default NewGame;
