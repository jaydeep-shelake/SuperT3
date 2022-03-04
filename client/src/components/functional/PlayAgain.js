import React from 'react'

export default function PlayAgain({end, onClick,message}) {
    return (
        <div className='again-container' style={{visibility: end?'visible':'hidden', opacity: end?'1':'0'}}>
            <div className="modal" >
            <div className='text-msg'>
                 {message} ⚡
             </div>
            <button className='again-button' onClick={onClick} >Play Again</button>
            </div>
        </div>
    )
}
