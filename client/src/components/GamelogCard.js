import React from 'react'

const GamelogCard = ({game,user}) => {
  const getGameState=()=>{
    if(game?.currenPlayer?.winner&&!game.draw){
    return 'You Won!'
    }
    if(!game?.currenPlayer?.winner&&game.draw){
    return 'Draw!'
    }
    else{
      return 'You Lose!'
    }
  }
  return (
    <div className='game-log-card'>
      <div className="game-pro-icon">
         <p>{game?.currenPlayer?.name?.charAt(0)}</p>  
      </div>
      <div className="game-pro-icon">
      <p>{game?.opponent?.name?.charAt(0)}</p>  
         
      </div>
      <p> {getGameState()}</p>
      <span>12 Apr</span>
    </div>
  )
}

export default GamelogCard