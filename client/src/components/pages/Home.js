import React from 'react'
import '../../styles/home.css'
import { Link } from 'react-router-dom'
import spiderman from '../../assets/spiderman.png'
import {AiFillPlayCircle} from 'react-icons/ai'
import {FaUsersCog} from 'react-icons/fa'
import {AiFillSetting,AiFillRobot,AiFillHome} from 'react-icons/ai'
const Home = () => {
  return (
    <div className='home'>
     <div className="sidebar">
           <div className="links">
             <div className="link active">
               <AiFillHome/>
             </div>
             <div className="link">
               <AiFillPlayCircle/>
             </div>
             <div className="link">
               <FaUsersCog/>
             </div>
             <div className="link">
               <AiFillRobot/>
             </div>
             <div className="link">
               <AiFillSetting/>
             </div>
           </div>
     </div>
     <div className="main-area">
     <img className='spider' src={spiderman} alt="" />
        <div className="banner">
          <div className="text">
          <h1>Welocome To </h1>
          <h1>Super Tic Tac Toe</h1>
          <button>Start</button>
          </div>
          
        
        </div>
        <div className="all-game">
           
           <Link to="/new-game"> <div className="game-card">
              <div className="icon">
                 <AiFillPlayCircle/>
              </div>
              <div className="text">
                <h2>New Game</h2>
              </div>
            </div></Link>


            <Link to="/start"><div className="game-card">
              <div className="icon">
                <FaUsersCog/>
              </div>
              <div className="text">
                <h2>Multiplayer</h2>
              </div>
            </div></Link>

            <div className="game-card">
              <div className="icon">
                <AiFillRobot/>
              </div>
              <div className="text">
                <h2>Local Player</h2>
              </div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Home