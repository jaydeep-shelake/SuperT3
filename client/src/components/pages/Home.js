import React,{useEffect} from 'react'
import '../../styles/home.css'
import { Link } from 'react-router-dom'
import spiderman from '../../assets/spiderman.png'
import {AiFillPlayCircle} from 'react-icons/ai'
import {FaUsersCog} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {AiFillSetting,AiFillRobot,AiFillHome} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import{BsFillArrowRightCircleFill} from 'react-icons/bs'
import logo from '../../assets/spidermanlogo.png'
import { getGameLogs, logout } from '../../actions'
import GamelogCard from '../GamelogCard'
const Home = () => {
  const user = useSelector(state=>state.user?.user)
  const gameLogs = useSelector(state=>state.gameLogs.logs)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(user)
    {
      dispatch(getGameLogs(user?._id))
    }
  },[])
  return (
    <div className='home'>
     <div className="sidebar">
           <div className="links">
           <Link to="/"><div className="logo">
             <img src={logo} alt="logo" />
             </div></Link>
             <Link to="/"><div className="link active">
               <AiFillHome/>
             </div></Link>
             <Link to="/new-game"><div className="link">
               <AiFillPlayCircle/>
             </div></Link>
             <Link to="/start"><div className="link">
               <FaUsersCog/>
             </div></Link>
             <Link to="/local"><div className="link">
               <AiFillRobot/>
             </div></Link>
             <div className="link">
               <AiFillSetting/>
             </div>
           </div>
           <div className="links">
           <div className="link" onClick={()=>dispatch(logout())}>
               <FiLogOut/>
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

           <Link to="/local"> <div className="game-card">
              <div className="icon">
                <AiFillRobot/>
              </div>
              <div className="text">
                <h2>Local Player</h2>
              </div>
            </div></Link>

        </div>
     </div>
     <div className="game-log">
       <div className="header">
         {user?<div className='profile-log'>{user?.name.charAt(0)}</div>:<Link to="/signin"><button>Login</button></Link>}
        </div>
        <div className="log-title">
        <h2>Past Game Logs</h2>
          
          </div>
        <div className="all-log">
          { user&&(
            gameLogs?.map((game)=>(
              <GamelogCard
              game={game}
              user={user}
              key={user?._id}
              />

            ))
          )
          }
          </div>
          <div className="game-button">
        <button>View All <BsFillArrowRightCircleFill/> </button>
        </div>
      </div>
      
    </div>
  )
}

export default Home