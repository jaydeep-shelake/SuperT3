import React from 'react'
import O from './functional/icons/O'
import X from './functional/icons/X'

const WinnerModal = ({winner,startNewGame,clearGame,clearState,setShowModal,message,PlayAgain}) => {
  const resetGame=()=>{
    clearGame(clearState)
    setShowModal(false)
  }
  const playAgainGame=()=>{
    PlayAgain()
    setShowModal()
  }
  return (
    <div className='black-screen'>
        <div className="modal">
          
            <div className="square" style={{background:'rgb(18, 18, 18)',border:'none',borderRadius:'6px'}}>
            {winner==='X'?<X/>:<O/>}
          </div>
           <h2>Is Winner !</h2>
      
           

            <button onClick={clearState?resetGame:()=>startNewGame()}>Restart</button>
        </div>
    </div>
  )
}

export default WinnerModal